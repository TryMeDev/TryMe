import { Button } from "primereact/button";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CUSTOMER_URL } from "../config";

const BottomBar: React.FC<{
  children?: React.ReactNode;
  canLogout?: boolean;
}> = ({}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="w-full flex items-center border-t border-gray-200">
      <Button
        text
        className="py-0 px-1"
        label={t("aboutUs.aboutUs")}
        onClick={() => {
          navigate("/aboutus");
        }}
      />
      <Button
        text
        className="py-0 px-1"
        label={t("faq.faq")}
        onClick={() => {
          navigate("/faq");
        }}
      />

      <a className="underline" href={CUSTOMER_URL}>
        <Button
          text
          className="py-0 px-1"
          label={t("browse")}
          onClick={() => {}}
        />
      </a>
    </div>
  );
};

export default BottomBar;
