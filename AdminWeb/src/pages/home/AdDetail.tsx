import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../app/store";
import { cat, useGetCatsQuery } from "../../slices/catSlice";
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
import { InputText } from "primereact/inputtext";

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
  const [selectedCat, setSelectedCat] = useState<cat>();
  const [tags, setTags] = useState<string[]>([]);
  const [statusDescription, setStatusDescription] = useState<string>("");
  const [is18, setIs18] = useState<boolean>(false);
  const [status, setStatus] = useState<status>("unpaid");
  const [links, setLinks] = useState<string[]>([]);

  useEffect(() => {
    if (ad?.catId && cats) {
      setSelectedCat(cats?.find((cat) => cat._id === ad.catId));
    }
  }, [ad, cats]);

  useEffect(() => {
    if (ad) {
      setImgN(0);
      setStatus(statusMatrix(ad.status)[0]);
      setTags(ad.tags);
      setStatusDescription(ad.statusDescription);
      setIs18(ad.is18);
      setLinks(ad.links);
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
        {ad?.links?.map((link, idx) => (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg overflow-clip w-full"
            key={idx}
          >
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
          {links?.map((link, idx) => (
            <InputText
              value={link}
              onChange={(e) => {
                setLinks((prev) => [
                  ...prev.slice(0, idx),
                  e.target.value,
                  ...prev.slice(idx + 1),
                ]);
              }}
              key={idx}
            />
          ))}
        </div>

        <div className="w-full mt-2">
          <label>{t("category")}</label>
          <Dropdown
            optionLabel={`display.${lang}`}
            options={cats}
            value={selectedCat}
            onChange={(e: AutoCompleteChangeEvent) => setSelectedCat(e.value)}
          />
        </div>

        <div className="w-full pt-1">
          <label>{t("tags")}</label>
          <Chips
            value={tags}
            onChange={(e: ChipsChangeEvent) => {
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
              accept: () => {
                if (selectedCat?._id) {
                  updateAd({
                    links,
                    adId: ad._id,
                    catId: selectedCat?._id,
                    tags,
                    status,
                    statusDescription,
                    is18,
                  });
                }
              },
              reject: () => {},
            });
          }}
        />
      </div>
    </div>
  );
};

export default AdDetail;
