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
              <div className="flex items-center gap-3 flex-grow">
                <span>{`${formatedValue} / ${formatedMaxValue}`}</span>
                <ProgressBar
                  value={value}
                  showValue={false}
                  style={{
                    flexGrow: 1,
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
            <div className="w-full flex gap-4">
              <Image
                alt={file.name}
                src={file.objectURL}
                className="w-[15vw] aspect-[9/16] overflow-hidden"
                imageClassName="w-full h-full object-cover"
              />
              <div className="flex flex-col items-start">
                <span>{file.name}</span>
                <Tag value={props.formatSize} severity="warning" />
              </div>
              <Button
                icon="pi pi-times"
                className="p-button-outlined p-button-rounded p-button-danger ml-auto"
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
        }}
        uploadOptions={{
          icon: "pi pi-caret-right",
          label: t("create.uploadImages.next"),
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
