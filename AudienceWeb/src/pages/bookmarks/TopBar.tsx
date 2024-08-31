import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { confirmDialog } from "primereact/confirmdialog";
import { ad } from "../../slices/adsSlice";

const TopBar: React.FC<{
  bookmarks: ad[];
  isEditMode: boolean;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  selectedBookmarkIds: string[];
  deleteBookmark: (_id: string) => void;
}> = ({
  bookmarks,
  isEditMode,
  setIsEditMode,
  selectedBookmarkIds,
  deleteBookmark,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center gap-1">
        <Button
          text
          icon="pi pi-chevron-left"
          onClick={() => {
            navigate("/");
          }}
        />
        <Button
          text
          label={t("bookmarks.bookmarks")}
          className="pl-0"
          pt={{ label: { className: "text-2xl" } }}
        />
      </div>
      <div>
        {bookmarks.length > 0 && (
          <Button
            text
            icon={isEditMode ? "pi pi-times" : "pi pi-pen-to-square"}
            onClick={() => {
              setIsEditMode((prev) => !prev);
            }}
          />
        )}

        {selectedBookmarkIds.length !== 0 && isEditMode && (
          <Button
            text
            icon="pi pi-trash"
            onClick={() => {
              confirmDialog({
                message: t("bookmarks.deleteConfirmMsg"),
                header: t("bookmarks.deleteConfirmHeader"),
                icon: "pi pi-exclamation-triangle",
                defaultFocus: "accept",
                accept: () => {
                  selectedBookmarkIds.forEach((bookmarkId) => {
                    deleteBookmark(bookmarkId);
                  });
                },
                reject: () => {},
              });
            }}
          />
        )}
      </div>
    </div>
  );
};

export default TopBar;
