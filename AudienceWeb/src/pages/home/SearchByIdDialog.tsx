import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useTranslation } from "react-i18next";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";

export default function SearchByIdDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [id, setId] = useState<string>("");

  const footerContent = (
    <div>
      <Button
        label={t("home.search")}
        icon="pi pi-check"
        onClick={() => {
          navigate(`/${id}`);
        }}
        autoFocus
      />
      <Button
        label={t("home.cancel")}
        icon="pi pi-times"
        onClick={() => {
          setId("");
          setIsOpen(false);
        }}
        className="p-button-text"
      />
    </div>
  );

  return (
    <Dialog
      header={t("home.enterId")}
      className="max-w-[90%]"
      visible={isOpen}
      onHide={() => {
        setId("");
        setIsOpen(false);
      }}
      footer={footerContent}
    >
      <InputText
        value={id}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setId(e.target.value)
        }
        placeholder={t("home.id")}
      />
    </Dialog>
  );
}
