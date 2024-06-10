import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../app/store";
import { useGetCatsQuery } from "../../slices/catSlice";
import { Button } from "primereact/button";
import { ad, status, useUpdateAdMutation } from "../../slices/adsSlice";
import { useTranslation } from "react-i18next";
import {
  AutoComplete,
  AutoCompleteChangeEvent,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import LoadingImage from "../../components/LoadingImage";
import { regions } from "../../assets/regions";
import { Chips, ChipsChangeEvent } from "primereact/chips";
import { InputTextarea } from "primereact/inputtextarea";
import { InputSwitch } from "primereact/inputswitch";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { statusMatrix } from "../../assets/utils";
import { Toast } from "primereact/toast";

type formattedCat = { _id: string; label: string };

const AdDetail: React.FC<{ ad: ad }> = ({ ad }) => {
  const toast = useRef<Toast>(null);
  const { data: cats } = useGetCatsQuery({});
  const [
    updateAd,
    {
      isError: isUpdateAdError,
      error: updateAdError,
      isSuccess: isUpdateAdSuccess,
    },
  ] = useUpdateAdMutation();
  const lang = useAppSelector((state) => state.preference.lang);
  const { t } = useTranslation();

  const [imgN, setImgN] = useState<number>(0);
  const [selectedCats, setSelectedCats] = useState<formattedCat[]>([]);
  const [filteredCats, setFilteredCats] = useState<formattedCat[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [statusDescription, setStatusDescription] = useState<string>("");
  const [is18, setIs18] = useState<boolean>(false);
  const [status, setStatus] = useState<status>("unpaid");

  const formattedCats: formattedCat[] =
    cats?.map((cat) => ({ _id: cat._id, label: cat.display[lang] })) || [];

  useEffect(() => {
    if (ad?.catIds && cats) {
      setSelectedCats(
        ad.catIds
          .map((catId) => {
            const cat = cats?.find((cat) => cat._id === catId);
            return cat ? { _id: cat._id, label: cat.display[lang] } : undefined;
          })
          .filter((cat) => cat !== undefined) as formattedCat[]
      );
    }
  }, [ad, cats]);

  useEffect(() => {
    if (ad) {
      setImgN(0);
      setStatus(statusMatrix(ad.status)[0]);
      setTags(ad.tags);
      setStatusDescription(ad.statusDescription);
      setIs18(ad.is18);
    }
  }, [ad]);

  useEffect(() => {
    if (isUpdateAdError) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: JSON.stringify(updateAdError),
      });
    }
  }, [isUpdateAdError]);

  useEffect(() => {
    if (isUpdateAdSuccess) {
      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "",
      });
    }
  }, [isUpdateAdSuccess]);

  return (
    <div className="flex gap-5 flex-wrap w-full justify-around pt-5">
      <Toast ref={toast} />
      <ConfirmDialog />
      <LoadingImage
        src={ad?.imgs[imgN]}
        className="w-[20dvw] h-auto cursor-pointer"
        onClick={() => {
          if (ad?.imgs?.length) {
            setImgN((prev) => (prev + 1) % ad?.imgs.length);
          }
        }}
        height="calc(20dvw * 16 / 9)"
        width="20dvw"
      />
      <div className="flex flex-col max-w-full">
        <div className="text-lg overflow-clip w-full">
          {t("adId", { adId: ad?._id })}
        </div>

        <div className="text-lg overflow-clip w-full">
          {t("postingDate", {
            startDate: new Date(ad?.startDate).toLocaleDateString(),
            endDate: new Date(ad?.endDate).toLocaleDateString(),
          })}
        </div>
        {ad?.links.map((link, idx) => (
          <a href={link} className="text-lg overflow-clip w-full" key={idx}>
            {link && `${t("link")}${idx + 1}: ${link}`}
          </a>
        ))}

        <div className="text-lg overflow-clip w-full">
          {`${t("locations")}${ad?.locations
            .map(
              (locationCode) =>
                regions[locationCode.split("-")[0]].divisions[locationCode]
            )
            .join(", ")}
          `}
        </div>

        <div className="text-lg overflow-clip w-full">
          {t("status", { status: ad?.status })}
        </div>

        <div className="w-full">
          <label>{t("category")}</label>
          <AutoComplete
            field="label"
            value={selectedCats}
            suggestions={filteredCats}
            completeMethod={(e: AutoCompleteCompleteEvent) => {
              setFilteredCats(
                formattedCats?.filter((cat) => cat.label.includes(e.query)) ||
                  []
              );
            }}
            onChange={(e: AutoCompleteChangeEvent) => setSelectedCats(e.value)}
            dropdown
            multiple
          />
        </div>

        <div className="w-full pt-1">
          <label>{t("tags")}</label>
          <Chips
            value={tags}
            onChange={(e: ChipsChangeEvent) => {
              console.log(e.value);
              setTags(e.value || []);
            }}
            separator=","
          />
        </div>

        <div className="w-full pt-1 flex items-center">
          <label>{t("statusDescription")}</label>
          <InputTextarea
            value={statusDescription}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setStatusDescription(e.target.value)
            }
          />
        </div>

        <div className="w-full p-1 flex items-center">
          <label>{t("is18")}</label>
          <InputSwitch checked={is18} onChange={(e) => setIs18(e.value)} />
        </div>

        <Dropdown
          value={status}
          onChange={(e: DropdownChangeEvent) => setStatus(e.value)}
          options={statusMatrix(ad.status)}
        />

        <Button
          className="mt-2"
          label={t("submit")}
          onClick={() => {
            confirmDialog({
              message: t("confirm"),
              header: t("confirmHeader"),
              icon: "pi pi-exclamation-triangle",
              defaultFocus: "accept",
              accept: () =>
                updateAd({
                  adId: ad?._id,
                  catIds: selectedCats.map((cat) => cat._id),
                  tags,
                  status,
                  statusDescription,
                  is18,
                }),
              reject: () => {},
            });
          }}
        />
      </div>
    </div>
  );
};

export default AdDetail;
