import { Button } from "primereact/button";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/store";
import { setCurrentCat } from "../../slices/preferenceSlice";

const NotFound: React.FC<{ isSearch: boolean }> = ({ isSearch }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex items-center border-b border-gray-200">
        <Button
          icon="pi pi-chevron-left"
          text
          onClick={() => {
            if (isSearch) {
              navigate("search");
            } else {
              dispatch(setCurrentCat({ cat: "" }));
            }
          }}
        />
        <Button text className="p-0" label="TryMe" />
      </div>

      <div className="flex flex-grow justify-center items-center p-4">
        <h3 className="text-center">
          {t(isSearch ? "viewer.noSearchResult" : "viewer.noRecommendations")}
        </h3>
      </div>
    </div>
  );
};

export default NotFound;
