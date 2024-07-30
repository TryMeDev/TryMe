import { Button } from "primereact/button";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC<{ isSearch: boolean }> = ({ isSearch }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="w-full h-full flex flex-col">
      <div
        className="w-full py-3 px-1 flex items-center justify-between"
        style={{
          backgroundColor: "var(--primary-color)",
        }}
      >
        {isSearch ? (
          <Button
            icon="pi pi-chevron-left"
            className="p-0 pl-2 w-auto"
            onClick={() => {
              navigate("search");
            }}
          />
        ) : (
          <>
            <div>
              <Button
                icon="pi pi-cog"
                className="p-0"
                onClick={() => {
                  navigate("settings");
                }}
              />
              <Button
                icon="pi pi-bookmark"
                className="p-0"
                onClick={() => {
                  navigate("bookmarks");
                }}
              />
            </div>
            <Button
              icon="pi pi-search"
              className="p-0"
              onClick={() => {
                navigate("search");
              }}
            />
          </>
        )}
      </div>

      <div className="flex flex-grow justify-center items-center p-4">
        <h3 className="text-center">
          {t(isSearch ? "home.noSearchResult" : "home.noRecommendations")}
        </h3>
      </div>
    </div>
  );
};

export default NotFound;
