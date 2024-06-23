import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

type File2 = File & { objectURL: string };

const SetLinks: React.FC<{
  imgs: File2[];
  links: string[];
  setLinks: React.Dispatch<React.SetStateAction<string[]>>;
  handleBack: () => void;
  handleNext: () => void;
}> = ({ imgs, links, setLinks, handleBack, handleNext }) => {
  const { t } = useTranslation();

  return (
    <>
      <h2>{t("create.setLinks.title")}</h2>
      {imgs.map((img, idx) => (
        <div className="w-full flex items-center gap-2 mt-1" key={idx}>
          <Image
            preview
            alt={img.name}
            src={img.objectURL}
            imageClassName="w-[15vw] h-[calc(15vw*16/9)]"
          />
          <InputText
            className="flex-grow"
            value={links[idx]}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLinks((prev) => [
                ...prev.slice(0, idx),
                e.target.value,
                ...prev.slice(idx + 1),
              ])
            }
            placeholder={t("create.setLinks.placeholder")}
          />
        </div>
      ))}
      <div className="w-full flex justify-between mt-2">
        <Button
          label={t("create.setLinks.back")}
          onClick={() => {
            handleBack();
          }}
        />
        <Button
          label={t("create.setLinks.next")}
          onClick={() => {
            handleNext();
          }}
        />
      </div>
    </>
  );
};

export default SetLinks;
