import React, { useState, useEffect, useRef } from "react";
import useProfile from "../../hooks/useProfile";
import LoadingScreen from "../../components/LoadingScreen";
import AppBar from "../../components/AppBar";
import { Steps } from "primereact/steps";
import UploadImages, { File2 } from "./UploadImages";
import SetLinks from "./SetLinks";
import SetInfo from "./SetInfo";
import { addDays, endOfDate } from "../../assets/utils";
import { useCreateAdMutation } from "../../slices/adsSlice";
import { useTranslation } from "react-i18next";
import { Toast } from "primereact/toast";
import { cat, useGetCatsQuery } from "../../slices/catSlice";
import { region } from "../../assets/regions";

export type division = {
  label: string;
  value: string;
};

const Create: React.FC = () => {
  const { t } = useTranslation();
  const steps = [
    {
      label: t("create.steps.uploadImages"),
    },
    {
      label: t("create.steps.setLinks"),
    },
    {
      label: t("create.steps.setInformation"),
    },
  ];

  const { isSuccess: isProfileSuccess } = useProfile();
  const [
    createAd,
    { isLoading: isCreateCatLoading, isError: isCreateCatError },
  ] = useCreateAdMutation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [imgs, setImgs] = useState<File2[]>([]);
  const [cat, setCat] = useState<cat | undefined>();
  const [tags, setTags] = useState<string[]>([]);
  const [links, setLinks] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<region[]>([]);
  const [startDate, setStartDate] = useState<Date>(addDays(3));
  const [endDate, setEndDate] = useState<Date>(endOfDate(addDays(7)));

  const {
    data: cats,
    isLoading: isCatsLoading,
    isError: isCatsError,
    error: catsError,
  } = useGetCatsQuery({});

  const toast = useRef<Toast>(null);

  useEffect(() => {
    if (isCreateCatError) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: t("create.payError"),
      });
    }
  }, [isCreateCatError]);

  useEffect(() => {
    if (isCatsError) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: JSON.stringify(catsError),
      });
    }
  }, [isCatsError]);

  return (
    <div className="w-full h-full flex flex-col overflow-auto">
      <AppBar />
      <LoadingScreen
        isLoading={!isProfileSuccess || isCreateCatLoading || isCatsLoading}
      />
      <Toast ref={toast} />

      <div className="flex flex-col flex-grow p-4 gap-4">
        <Steps model={steps} activeIndex={activeIndex} />
        <div className="flex-grow flex flex-col">
          <div className={activeIndex === 0 ? "" : "hidden"}>
            <UploadImages
              handleConfirmed={(_imgs: File2[]) => {
                setImgs(_imgs);
                setLinks((prev) =>
                  prev.length !== _imgs.length ? _imgs.map((_) => "") : prev
                );
                setActiveIndex(1);
              }}
            />
          </div>
          {activeIndex === 1 && (
            <SetLinks
              imgs={imgs}
              links={links}
              setLinks={setLinks}
              handleBack={() => {
                setActiveIndex(0);
              }}
              handleNext={() => {
                setActiveIndex(2);
              }}
            />
          )}
          {activeIndex === 2 && (
            <SetInfo
              cats={cats ?? []}
              cat={cat}
              setCat={setCat}
              tags={tags}
              setTags={setTags}
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              selectedRegions={selectedRegions}
              setSelectedRegions={setSelectedRegions}
              handleBack={() => {
                setActiveIndex(1);
              }}
              handleNext={() => {
                if (cat?._id) {
                  createAd({
                    imgs,
                    links,
                    catId: cat._id,
                    tags,
                    startDate,
                    endDate,
                    locations: selectedRegions.map(
                      (region: region) => region.code
                    ),
                  });
                }
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Create;
