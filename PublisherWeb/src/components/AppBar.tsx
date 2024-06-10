import { Button } from "primereact/button";
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/TryMe.png";
import { useTranslation } from "react-i18next";

const AppBar: React.FC<{ children?: React.ReactNode; canLogout?: boolean }> = ({
  children,
  canLogout = true,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
      <div className="flex-1">{children}</div>
      {canLogout && (
        <Button
          className="p-0"
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
