import React from "react";
import { useTranslation } from "react-i18next";
import TopBar from "./TopBar";
import { cat, display } from "../../slices/catsSlice";
import CatButton from "./CatButton";
import { Button } from "primereact/button";

const Content: React.FC<{ cats: cat[] }> = ({ cats }) => {
  const { t } = useTranslation();

  return (
    <div className="w-full h-full flex flex-col">
      <TopBar />

      <div className="h-[calc(100%_-_50px)] overflow-auto p-4 pt-2 flex flex-col gap-1 items-center justify-between">
        {cats.map((cat) => (
          <CatButton cat={cat} key={cat._id} />
        ))}

        <Button text label={t("home.lookforward")} />
      </div>
    </div>
  );
};

export default Content;
