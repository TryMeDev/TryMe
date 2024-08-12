import { Button } from "primereact/button";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC<{ reGetById: () => void }> = ({ reGetById }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex items-center border-b border-gray-200">
        <Button
          icon="pi pi-home"
          className="bg-opacity-10 bg-black"
          text
          rounded
          onClick={() => {
            navigate("/");
          }}
        />
        <Button text className="p-0" label="TryMe" />
      </div>

      <div className="flex flex-grow justify-center items-center p-2">
        <h3 className="text-center">{t("share.notFound")}</h3>
        <Button icon="pi pi-refresh" text onClick={reGetById} />
      </div>
    </div>
  );
};

export default NotFound;
