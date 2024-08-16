import { Button } from "primereact/button";
import {
  FileUpload,
  FileUploadErrorEvent,
  FileUploadHandlerEvent,
  FileUploadHeaderTemplateOptions,
  FileUploadSelectEvent,
  ItemTemplateOptions,
} from "primereact/fileupload";
import { Image } from "primereact/image";
import { ProgressBar } from "primereact/progressbar";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export type File2 = File & { objectURL: string };

const MAX_SIZE = 10 * 1024 * 1024;

const UploadImages: React.FC<{ handleConfirmed: (imgs: File2[]) => void }> = ({
  handleConfirmed,
}) => {
  const { t } = useTranslation();
  const toast = useRef<Toast>(null);
  const [totalSize, setTotalSize] = useState<number>(0);
  const fileUploadRef = useRef<FileUpload>(null);
  const isExceedTotalSize = totalSize > MAX_SIZE;

  return (
    <>
      <Toast ref={toast} />

      <FileUpload
        pt={{
          root: { className: "h-full flex flex-col" },
          uploadButton: { root: { disabled: isExceedTotalSize } },
        }}
        ref={fileUploadRef}
        multiple
        accept="image/*"
        maxFileSize={MAX_SIZE}
        onSelect={(e: FileUploadSelectEvent) => {
          setTotalSize(e.files.reduce((acc, cur) => acc + cur.size, 0));
        }}
        onError={(e: FileUploadErrorEvent) => {
          toast.current?.show({
            severity: "error",
            summary: t("create.uploadImages.uploadError"),
          });
        }}
        headerTemplate={({
          chooseButton,
          uploadButton,
        }: FileUploadHeaderTemplateOptions) => {
          const value = (totalSize / MAX_SIZE) * 100;
          const formatedValue =
            fileUploadRef && fileUploadRef.current
              ? fileUploadRef.current.formatSize(totalSize)
              : "0 B";
          const formatedMaxValue =
            fileUploadRef && fileUploadRef.current
              ? fileUploadRef.current.formatSize(MAX_SIZE)
              : "0 B";

          return (
            <div className="w-full flex items-center justify-between mb-2 gap-3">
              {chooseButton}
              <div className="flex flex-col items-center gap-1 flex-grow">
                <span className="md:text-sm text-xs">{`${formatedValue} / ${formatedMaxValue}`}</span>
                <ProgressBar
                  value={value}
                  showValue={false}
                  className="w-full"
                  style={{
                    height: "1rem",
                  }}
                  color={isExceedTotalSize ? "red" : ""}
                />
              </div>
              {uploadButton}
            </div>
          );
        }}
        itemTemplate={(inFile: object, props: ItemTemplateOptions) => {
          const file = inFile as File2;
          return (
            <div className="w-full flex !p-1 items-start">
              <Image
                alt={file.name}
                src={file.objectURL}
                className="md:w-[15%] w-[25%] aspect-[9/16] overflow-hidden"
                imageClassName="w-full h-full object-cover"
              />
              <div className="md:w-[calc(85%-20px)] w-[calc(75%-20px)] pl-4 flex flex-col items-start gap-2">
                <span className="w-full text-wrap break-words text-left">
                  {file.name}
                </span>
                <Tag value={props.formatSize} severity="warning" />
              </div>
              <Button
                icon="pi pi-times"
                className="p-button-danger !p-0 ml-auto !w-auto"
                text
                onClick={(e) => {
                  setTotalSize(totalSize - file.size);
                  props.onRemove(e);
                }}
              />
            </div>
          );
        }}
        emptyTemplate={
          <div className="p-4 flex flex-col items-center justify-center gap-2">
            <i className="pi pi-image text-8xl" />
            <div className="text-xl">
              {t("create.uploadImages.dragAndDrop")}
            </div>
            <div className="text-xl">
              {t("create.uploadImages.aspectratio")}
            </div>
          </div>
        }
        chooseOptions={{
          icon: "pi pi-fw pi-images",
          label: t("create.uploadImages.choose"),
          className: "!px-2",
        }}
        uploadOptions={{
          icon: "pi pi-caret-right",
          label: t("create.uploadImages.next"),
          className: "!px-2",
        }}
        customUpload
        uploadHandler={({ files }: FileUploadHandlerEvent) => {
          handleConfirmed(files as File2[]);
        }}
      />
    </>
  );
};

export default UploadImages;
