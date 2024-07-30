import { Button } from "primereact/button";
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/TryMe.png";
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
    <div
      className="w-full p-3 flex items-center"
      style={{
        backgroundColor: "var(--primary-color)",
        color: "var(--primary-color-text)",
      }}
    >
      <img
        className="h-12 w-auto cursor-pointer"
        src={logo}
        onClick={() => {
          navigate("/");
        }}
      />
      <Button
        className="py-0 px-1"
        label={t("aboutUs.aboutUs")}
        onClick={() => {
          navigate("/aboutus");
        }}
      />
      <Button
        className="py-0 px-1"
        label={t("faq.faq")}
        onClick={() => {
          navigate("/faq");
        }}
      />
      <div className="flex-1">{children}</div>

      <Dropdown
        pt={{
          trigger: { className: "w-auto pr-1 h-auto" },
          input: { className: "px-1 py-2" },
        }}
        value={langList?.find((lang) => lang.code === preference.lang) || ""}
        onChange={(e) => {
          dispatch(setLang({ lang: e.value.code }));
        }}
        options={langList}
        optionLabel="nativeName"
      />
      {canLogout && (
        <Button
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
