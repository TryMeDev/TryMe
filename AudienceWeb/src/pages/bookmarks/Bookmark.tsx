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
    <div className="h-[100svh] w-[100svw] bg-black overflow-hidden">
      <LoadingScreen isLoading={false} />
      <Toast ref={toast} />
      <div className="h-full w-full flex flex-col bg-black">
        {bookmark && <ImageSlider bookmark={bookmark} />}

        <div className="w-full flex justify-between p-1 absolute">
          <Button
            icon="pi pi-chevron-left"
            text
            pt={{ icon: { className: "text-gray-100" } }}
            onClick={(e) => {
              e.stopPropagation();
              onBack();
            }}
          />

          {bookmark?._id && (
            <div>
              <Button
                icon="pi pi-share-alt"
                className="!bg-opacity-30 !bg-black"
                text
                pt={{ icon: { className: "text-gray-100" } }}
                rounded
                onClick={(e) => {
                  e.stopPropagation();
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
                pt={{ icon: { className: "text-gray-100" } }}
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookmark;
