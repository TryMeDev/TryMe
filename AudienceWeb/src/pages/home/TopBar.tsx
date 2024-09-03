import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { PUBLISHER_URL } from "../../config";
import { IndexedDBContext } from "../../app/IndexedDBContext";
import SearchByIdDialog from "./SearchByIdDialog";
import usePlatform from "../../hooks/usePlatform";

const TopBar: React.FC = () => {
  const navigate = useNavigate();
  const [isSearchByIdDialogOpen, setIsSearchByIdDialogOpen] =
    useState<boolean>(false);

  const platform = usePlatform();

  const indexedDBContext = useContext(IndexedDBContext);

  if (!indexedDBContext) {
    return <></>;
  }

  const { data: allBookmarks } = indexedDBContext;

  return (
    <div className="w-full flex justify-between items-center pr-2">
      <Button text label="TryMe" pt={{ label: { className: "text-2xl" } }} />
      <div>
        {platform !== "android" && (
          <Button
            icon="pi pi-apple"
            text
            onClick={(e) => {
              setIsSearchByIdDialogOpen(true);
            }}
          />
        )}

        <a target="_blank" rel="noopener noreferrer" href={PUBLISHER_URL}>
          <Button icon="pi pi-pen-to-square" text onClick={(e) => {}} />
        </a>
        <Button
          icon="pi pi-cog"
          text
          onClick={(e) => {
            navigate("settings");
          }}
        />
        {allBookmarks.length > 0 && (
          <Button
            icon="pi pi-bookmark"
            text
            onClick={(e) => {
              navigate("bookmarks");
            }}
          />
        )}
      </div>

      <SearchByIdDialog
        isOpen={isSearchByIdDialogOpen}
        setIsOpen={setIsSearchByIdDialogOpen}
      />
    </div>
  );
};

export default TopBar;
