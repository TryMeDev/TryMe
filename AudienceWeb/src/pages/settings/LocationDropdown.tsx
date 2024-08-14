import React from "react";
import { useTranslation } from "react-i18next";
import { regions } from "../../assets/regions";
import { useSelector } from "react-redux";
import { setLocation } from "../../slices/preferenceSlice";
import { useAppDispatch } from "../../app/store";
import { Dropdown } from "primereact/dropdown";

const LocationDropdown: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const preference = useSelector((state: any) => state.preference);

  return (
    <div className="mt-1">
      <label>{t("location")}</label>
      <Dropdown
        className="w-full"
        value={regions.find((region) => region.code === preference.location)}
        onChange={(e) => {
          if (e.value?.code) {
            dispatch(setLocation({ location: e.value.code }));
          }
        }}
        options={regions}
        optionLabel={`display.${preference.lang}`}
      />
    </div>
  );
};

export default LocationDropdown;
