import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "primereact/button";
import { saveLocalStorage } from "../../slices/preferenceSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/store";

const TopBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="w-full flex items-center justify-between pr-1">
      <Button
        text
        label={t("settings.settings")}
        pt={{ label: { className: "text-xl" } }}
      />
      <Button
        text
        className="p-0"
        icon="pi pi-check"
        onClick={() => {
          dispatch(saveLocalStorage());
          navigate("/");
        }}
      />
    </div>
  );
};

export default TopBar;
