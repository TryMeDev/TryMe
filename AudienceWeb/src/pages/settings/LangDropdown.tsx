import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { setLang } from "../../slices/preferenceSlice";
import { Dropdown } from "primereact/dropdown";
import { langs } from "../../assets/langs";
import { useAppDispatch } from "../../app/store";

const LangDropdown: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const preference = useSelector((state: any) => state.preference);

  const langList = Object.keys(langs).map((code) => ({
    code,
    ...langs[code as keyof typeof langs],
  }));

  return (
    <div>
      <label>{t("language")}</label>
      <Dropdown
        value={langList?.find((lang) => lang.code === preference.lang) || ""}
        onChange={(e) => {
          dispatch(setLang({ lang: e.value.code }));
        }}
        options={langList}
        optionLabel="nativeName"
        className="w-full"
      />
    </div>
  );
};

export default LangDropdown;
