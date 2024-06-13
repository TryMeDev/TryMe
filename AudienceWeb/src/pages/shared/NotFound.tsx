import { Button } from "primereact/button";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC<{ reGetById: () => void }> = ({ reGetById }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="w-full h-full flex flex-col">
      <div
        className="w-full py-3 px-1 flex items-center"
        style={{
          backgroundColor: "var(--primary-color)",
        }}
      >
        <Button
          icon="pi pi-home"
          className="bg-opacity-10 bg-black"
          text
          rounded
          onClick={() => {
            navigate("/");
          }}
        />
      </div>

      <div className="flex flex-grow justify-center items-center p-2">
        <h3 className="text-center">{t("shared.notFound")}</h3>
        <Button icon="pi pi-refresh" text onClick={reGetById} />
      </div>
    </div>
  );
};

export default NotFound;
