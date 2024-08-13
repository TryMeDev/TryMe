import { Button } from "primereact/button";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Dropdown } from "primereact/dropdown";
import { langs } from "../assets/langs";
import { useAppDispatch, useAppSelector } from "../app/store";
import { setLang } from "../slices/preferenceSlice";

const AppBar: React.FC<{ children?: React.ReactNode; canLogout?: boolean }> = ({
  children,
  canLogout = true,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const preference = useAppSelector((state) => state.preference);

  const langList = Object.keys(langs).map((code) => ({
    code,
    ...langs[code as keyof typeof langs],
  }));

  return (
    <div className="w-full py-2 pr-2 flex items-center border-b border-gray-200">
      <Button
        text
        label="TryMe"
        pt={{ label: { className: "text-xl" } }}
        onClick={() => {
          navigate("/");
        }}
      />
      <div className="flex-1">{children}</div>

      <Dropdown
        pt={{
          trigger: { className: "w-auto pr-1 h-auto" },
          input: { className: "px-1 py-2" },
        }}
        value={langList?.find((lang) => lang.code === preference.lang) ?? ""}
        onChange={(e) => {
          dispatch(setLang({ lang: e.value.code }));
        }}
        options={langList}
        optionLabel="nativeName"
      />
      {canLogout && (
        <Button
          text
          className="py-0 px-1 ml-1"
          label={t("login.logout")}
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        />
      )}
    </div>
  );
};

export default AppBar;
