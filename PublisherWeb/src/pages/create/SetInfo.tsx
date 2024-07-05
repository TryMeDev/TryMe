import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import React, { useState } from "react";
import {
  addDays,
  endOfDate,
  getDaysDifference,
  isTimeConflict,
} from "../../assets/utils";
import { regions } from "../../assets/regions";
import {
  AutoComplete,
  AutoCompleteChangeEvent,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import { useTranslation } from "react-i18next";
import { division } from "./Create";
import useProfile from "../../hooks/useProfile";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import FAQContent from "../faq/FAQContent";
import InstructionsContent from "../instructions/InstructionsContent";

const MINIMUM_CHARGE = 5;

function hasIntersection(arr1: any[], arr2: any[]) {
  for (let item of arr1) {
    if (arr2.includes(item)) {
      return true;
    }
  }
  return false;
}

type region = {
  label: string;
  code: string;
  items: division[];
};
const regionDataList: region[] = Object.entries(regions).map(
  ([regionCode, region]) => ({
    label: region.name,
    code: regionCode,
    items: Object.entries(region.divisions).map(([divisionCode, division]) => ({
      label: division,
      value: divisionCode,
    })),
  })
);

const SetInfo: React.FC<{
  startDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  endDate: Date;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
  divisions: division[];
  setDivisions: React.Dispatch<React.SetStateAction<division[]>>;
  handleBack: () => void;
  handleNext: () => void;
}> = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  divisions,
  setDivisions,
  handleBack,
  handleNext,
}) => {
  const { profile, isSuccess } = useProfile();
  const { t } = useTranslation();
  const [isFAQVisible, setIsFAQVisible] = useState<boolean>(false);
  const [isInstructionsVisible, setIsInstructionsVisible] =
    useState<boolean>(false);

  const [isInstructionsAccepted, setIsInstructionsAccepted] =
    useState<boolean>(false);
  const [filteredDivisions, setFilteredDivisions] =
    useState<region[]>(regionDataList);

  const charge =
    startDate && endDate
      ? getDaysDifference(startDate, endDate) * divisions.length
      : 0;

  const search = (event: AutoCompleteCompleteEvent) => {
    let query = event.query;
    let _filteredCities = [];

    for (let country of regionDataList) {
      let filteredItems = country.items.filter(
        (item) => item.label.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );

      if (filteredItems && filteredItems.length) {
        _filteredCities.push({ ...country, ...{ items: filteredItems } });
      }
    }

    setFilteredDivisions(_filteredCities);
  };

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
                divisions.map((division) => division.value),
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
      <label htmlFor="locations">{t("create.setInfo.locations")}</label>
      <AutoComplete
        inputId="locations"
        pt={{ container: { className: "w-full" } }}
        value={divisions}
        onChange={(e: AutoCompleteChangeEvent) => {
          setDivisions(e.value);
        }}
        suggestions={filteredDivisions}
        completeMethod={search}
        field="label"
        optionGroupLabel="label"
        optionGroupChildren="items"
        dropdown
        multiple
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
