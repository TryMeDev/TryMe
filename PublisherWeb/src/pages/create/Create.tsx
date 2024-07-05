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

  const { isSuccess } = useProfile();
  const [createAd, { isLoading, isError }] = useCreateAdMutation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [imgs, setImgs] = useState<File2[]>([]);
  const [links, setLinks] = useState<string[]>([]);
  const [divisions, setDivisions] = useState<division[]>([]);
  const [startDate, setStartDate] = useState<Date>(addDays(3));
  const [endDate, setEndDate] = useState<Date>(endOfDate(addDays(7)));

  const toast = useRef<Toast>(null);

  useEffect(() => {
    if (isError) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: t("create.payError"),
      });
    }
  }, [isError]);

  return (
    <div className="w-full h-full flex flex-col overflow-auto">
      <AppBar />
      <LoadingScreen isLoading={!isSuccess || isLoading} />
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
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              divisions={divisions}
              setDivisions={setDivisions}
              handleBack={() => {
                setActiveIndex(1);
              }}
              handleNext={() => {
                createAd({
                  imgs,
                  links,
                  startDate,
                  endDate,
                  locations: divisions.map(
                    (division: division) => division.value
                  ),
                });
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Create;
