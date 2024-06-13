import React, { useRef } from "react";
import LoadingScreen from "../../components/LoadingScreen";
import { Button } from "primereact/button";
import { ad } from "../../slices/adsSlice";
import ImageSlider from "./ImageSlider";
import { LOCAL_URL } from "../../config";
import { Toast } from "primereact/toast";
import { t } from "i18next";

const Bookmark: React.FC<{
  bookmark: ad;
  onBack: () => void;
  onDelete: () => void;
}> = ({ bookmark, onBack, onDelete }) => {
  const toast = useRef<Toast>(null);

  return (
    <>
      <LoadingScreen isLoading={false} />
      <Toast ref={toast} />
      <div className="w-full h-full flex flex-col">
        <div className="w-full flex justify-between p-1 absolute">
          <Button icon="pi pi-chevron-left" text onClick={onBack} />

          {bookmark?._id && (
            <div>
              <Button
                icon="pi pi-clipboard"
                className="bg-opacity-10 bg-black"
                text
                rounded
                onClick={() => {
                  navigator.clipboard.writeText(`${LOCAL_URL}${bookmark?._id}`);
                  toast.current?.show({
                    severity: "success",
                    summary: t("success"),
                    detail: t("copiedToClipboard"),
                  });
                }}
              />
              <Button
                icon="pi pi-bookmark-fill"
                text
                onClick={() => {
                  onDelete();
                }}
              />
            </div>
          )}
        </div>

        {bookmark && <ImageSlider bookmark={bookmark} />}
      </div>
    </>
  );
};

export default Bookmark;
