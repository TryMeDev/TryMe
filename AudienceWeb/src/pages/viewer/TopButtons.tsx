import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { t } from "i18next";
import { useAppDispatch } from "../../app/store";
import { setCurrentCat } from "../../slices/preferenceSlice";
import { IndexedDBContext } from "../../app/IndexedDBContext";
import { LOCAL_URL } from "../../config";
import { ad } from "../../slices/adsSlice";

interface TopButtonsProps {
  currentAd?: ad;
  currentAdId?: string;
  isSearch: boolean;
}

const TopButtons: React.FC<TopButtonsProps> = ({
  currentAd,
  currentAdId,
  isSearch,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const toast = useRef<Toast>(null);
  const indexedDBContext = useContext(IndexedDBContext);

  if (!indexedDBContext) return null;

  const {
    data: bookmarks,
    addData: addBookmark,
    deleteData: deleteBookmark,
  } = indexedDBContext;
  const bookmarkIds = bookmarks.map((bookmark) => bookmark._id);

  const handleBackClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSearch) {
      navigate("/search");
    } else {
      dispatch(setCurrentCat({ cat: "" }));
    }
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`${LOCAL_URL}${currentAdId}`);
    toast.current?.show({
      severity: "success",
      summary: t("success"),
      detail: t("copiedToClipboard"),
    });
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (bookmarkIds?.includes(currentAdId!)) {
      deleteBookmark(currentAdId!);
    } else {
      addBookmark(currentAd!);
    }
  };

  const handleSearchClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate("/search");
  };

  return (
    <div className="w-full flex justify-between p-1 absolute">
      <Toast ref={toast} />
      <Button
        icon="pi pi-chevron-left"
        className="!bg-opacity-30 !bg-black"
        text
        rounded
        pt={{ icon: { className: "text-gray-100" } }}
        onClick={handleBackClick}
      />
      <div>
        {currentAd && currentAdId && (
          <>
            <Button
              icon="pi pi-share-alt"
              className="!bg-opacity-30 !bg-black"
              text
              rounded
              pt={{ icon: { className: "text-gray-100" } }}
              onClick={handleShareClick}
            />
            <Button
              icon={
                bookmarkIds?.includes(currentAdId)
                  ? "pi pi-bookmark-fill"
                  : "pi pi-bookmark"
              }
              className="!bg-opacity-30 !bg-black"
              text
              rounded
              pt={{ icon: { className: "text-gray-100" } }}
              onClick={handleBookmarkClick}
            />
          </>
        )}
        {!isSearch && (
          <Button
            icon="pi pi-search"
            className="!bg-opacity-30 !bg-black"
            text
            rounded
            pt={{ icon: { className: "text-gray-100" } }}
            onClick={handleSearchClick}
          />
        )}
      </div>
    </div>
  );
};

export default TopButtons;
