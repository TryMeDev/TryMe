import { Button } from "primereact/button";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/TryMe.png";
import { Dialog } from "primereact/dialog";
import Categories from "../pages/categories/Categories";
import { useTranslation } from "react-i18next";

const AppBar: React.FC<{ children?: React.ReactNode; canLogout?: boolean }> = ({
  children,
  canLogout = true,
}) => {
  const navigate = useNavigate();
  const [isCatDialogOpen, setIsCatDialogOpen] = useState<boolean>(false);
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
      <Button
        label={t("categories")}
        onClick={() => {
          setIsCatDialogOpen(true);
        }}
      />
      <div className="flex-1">{children}</div>
      {canLogout && (
        <Button
          className="p-0"
          label={t("logout")}
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        />
      )}

      <Dialog
        header={t("categories")}
        visible={isCatDialogOpen}
        onHide={() => setIsCatDialogOpen(false)}
        className="w-[90%]"
      >
        <Categories />
      </Dialog>
    </div>
  );
};

export default AppBar;
