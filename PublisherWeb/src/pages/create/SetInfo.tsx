import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import React, { useState } from "react";
import {
  addDays,
  endOfDate,
  getDaysDifference,
  isTimeConflict,
} from "../../assets/utils";
import { region, regions } from "../../assets/regions";
import { useTranslation } from "react-i18next";
import useProfile from "../../hooks/useProfile";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import FAQContent from "../faq/FAQContent";
import InstructionsContent from "../instructions/InstructionsContent";
import { cat } from "../../slices/catSlice";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Chips } from "primereact/chips";
import { useAppSelector } from "../../app/store";
import { MultiSelect } from "primereact/multiselect";

const MINIMUM_CHARGE = 5;

function hasIntersection(arr1: any[], arr2: any[]) {
  for (let item of arr1) {
    if (arr2.includes(item)) {
      return true;
    }
  }
  return false;
}

const SetInfo: React.FC<{
  cats: cat[];
  cat: cat | undefined;
  setCat: React.Dispatch<React.SetStateAction<cat | undefined>>;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  startDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  endDate: Date;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
  selectedRegions: region[];
  setSelectedRegions: React.Dispatch<React.SetStateAction<region[]>>;
  handleBack: () => void;
  handleNext: () => void;
}> = ({
  cats,
  cat,
  setCat,
  tags,
  setTags,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  selectedRegions,
  setSelectedRegions,
  handleBack,
  handleNext,
}) => {
  const { profile, isSuccess } = useProfile();
  const lang = useAppSelector((state) => state.preference.lang);
  const { t } = useTranslation();
  const [isFAQVisible, setIsFAQVisible] = useState<boolean>(false);
  const [isInstructionsVisible, setIsInstructionsVisible] =
    useState<boolean>(false);

  const [isInstructionsAccepted, setIsInstructionsAccepted] =
    useState<boolean>(false);

  const charge =
    startDate && endDate && selectedRegions.length > 0
      ? getDaysDifference(startDate, endDate)
      : 0;

  const isConflict = isSuccess
    ? isTimeConflict(
        { startDate, endDate },
        profile
          ?.filter(
            (ad) =>
              (ad.status === "unpaid" ||
                ad.status === "paid" ||
                ad.status === "approved") &&
              hasIntersection(
                selectedRegions.map((region) => region.code),
                ad.locations
              )
          )
          .map((ad) => ({
            startDate: new Date(ad.startDate),
            endDate: new Date(ad.endDate),
          })) || []
      )
    : false;

  return (
    <>
      <label htmlFor="cat">{t("create.setInfo.cat")}</label>
      <Dropdown
        inputId="cat"
        className="w-full"
        value={cat}
        onChange={(e: DropdownChangeEvent) => {
          setCat(e.value);
        }}
        options={cats}
        optionLabel={lang === "" ? "display.en" : `display.${lang}`}
      />

      <label>{t("create.setInfo.tags")}</label>
      <Chips
        className="w-full"
        pt={{ container: { className: "w-full" } }}
        value={tags}
        onChange={(e) => {
          if (
            e.value?.length !== null &&
            e.value?.length !== undefined &&
            e.value.length < 10
          ) {
            setTags(e.value);
          }
        }}
        separator=","
      />

      <label htmlFor="locations">{t("create.setInfo.locations")}</label>
      <MultiSelect
        value={selectedRegions}
        onChange={(e) => {
          if (e.value) {
            setSelectedRegions(e.value);
          }
        }}
        filter
        options={regions}
        optionLabel={`display.${lang}`}
      />

      <label htmlFor="startDate">{t("create.setInfo.startDate")}</label>
      <Calendar
        inputId="startDate"
        value={startDate}
        onChange={(e) => {
          if (e.value) {
            setStartDate(e.value);
            if (!endDate || endDate <= e.value) {
              setEndDate(endOfDate(addDays(1, e.value)));
            }
          }
        }}
        inline
        minDate={addDays(2)}
        readOnlyInput
        invalid={isConflict}
      />

      {isConflict && (
        <label className="text-red-500">
          {t("create.setInfo.timeConflict")}
        </label>
      )}
      <label htmlFor="endDate">{t("create.setInfo.endDate")}</label>
      <Calendar
        inputId="endDate"
        value={endDate}
        onChange={(e) => {
          if (e.value) {
            setEndDate(endOfDate(e.value) || endOfDate(addDays(2)));
          }
        }}
        minDate={startDate ? addDays(1, startDate) : addDays(2)}
        readOnlyInput
        inline
        invalid={isConflict}
      />

      <div>
        <div>{`${t("create.setInfo.price")}: USD $${charge}`}</div>
        {charge < MINIMUM_CHARGE && (
          <div className="text-red-500">
            {t("create.setInfo.minimumCharge", {
              charge: `USD $${MINIMUM_CHARGE}`,
            })}
          </div>
        )}
        <Checkbox
          checked={isInstructionsAccepted}
          onChange={(e) => {
            if (e.checked !== undefined) {
              setIsInstructionsAccepted(e.checked);
            }
          }}
        />
        <label>{t("create.setInfo.read")}</label>
        <label
          className="underline cursor-pointer"
          onClick={() => {
            setIsInstructionsVisible(true);
          }}
        >
          {t("create.setInfo.instructions")}
        </label>
        <label>{t("create.setInfo.and")}</label>
        <label
          className="underline cursor-pointer"
          onClick={() => {
            setIsFAQVisible(true);
          }}
        >
          {t("create.setInfo.faq")}
        </label>
      </div>

      <div className="w-full flex justify-between mt-2">
        <Button
          label={t("create.setInfo.back")}
          onClick={() => {
            handleBack();
          }}
        />
        <Button
          label={t("create.setInfo.payment")}
          disabled={
            cat === undefined ||
            !startDate ||
            !endDate ||
            charge < MINIMUM_CHARGE ||
            isConflict ||
            !isInstructionsAccepted
          }
          onClick={() => {
            if (startDate && endDate) {
              handleNext();
            }
          }}
        />
      </div>

      <Dialog
        header={t("instructions.heading")}
        visible={isInstructionsVisible}
        onHide={() => {
          if (!isInstructionsVisible) return;
          setIsInstructionsVisible(false);
        }}
      >
        <div className="w-full h-full flex flex-col p-4">
          <InstructionsContent />
        </div>
      </Dialog>
      <Dialog
        header={t("faq.faq")}
        visible={isFAQVisible}
        onHide={() => {
          if (!isFAQVisible) return;
          setIsFAQVisible(false);
        }}
      >
        <div className="w-full h-full flex flex-col p-4">
          <FAQContent />
        </div>
      </Dialog>
    </>
  );
};

export default SetInfo;
