import { ad } from "../../slices/adsSlice";
import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { IndexedDBContext } from "../../app/IndexedDBContext";
import { LOCAL_URL } from "../../config";
import { Toast } from "primereact/toast";
import { t } from "i18next";

const TopButtons: React.FC<{
  currentAd?: ad;
  currentAdId?: string;
  isSearch: boolean;
}> = ({ currentAd, currentAdId, isSearch }) => {
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);

  const indexedDBContext = useContext(IndexedDBContext);

  if (!indexedDBContext) {
    return <></>;
  }

  const {
    data: bookmarks,
    addData: addBookmark,
    deleteData: deleteBookmark,
  } = indexedDBContext;
  const bookmarkIds = bookmarks.map((bookmark) => bookmark._id);

  return (
    <div className="w-full flex justify-between p-1 absolute">
      <Toast ref={toast} />
      {isSearch ? (
        <Button
          icon="pi pi-chevron-left"
          className="bg-opacity-10 bg-black"
          text
          rounded
          pt={{ icon: { className: "text-gray-100" } }}
          onClick={(e) => {
            e.stopPropagation();
            navigate("search");
          }}
        />
      ) : (
        <div>
          <Button
            icon="pi pi-cog"
            className="bg-opacity-10 bg-black"
            text
            rounded
            pt={{ icon: { className: "text-gray-100" } }}
            onClick={(e) => {
              e.stopPropagation();
              navigate("settings");
            }}
          />
          <Button
            icon="pi pi-bookmark"
            className="bg-opacity-10 bg-black"
            text
            rounded
            pt={{ icon: { className: "text-gray-100" } }}
            onClick={(e) => {
              e.stopPropagation();
              navigate("bookmarks");
            }}
          />
        </div>
      )}
      <div>
        {currentAd && currentAdId && (
          <Button
            icon="pi pi-share-alt"
            className="bg-opacity-10 bg-black"
            text
            rounded
            pt={{ icon: { className: "text-gray-100" } }}
            onClick={(e) => {
              e.stopPropagation();
              navigator.clipboard.writeText(`${LOCAL_URL}${currentAdId}`);
              toast.current?.show({
                severity: "success",
                summary: t("success"),
                detail: t("copiedToClipboard"),
              });
            }}
          />
        )}
        {currentAd &&
          currentAdId &&
          (bookmarkIds?.includes(currentAdId) ? (
            <Button
              icon="pi pi-bookmark-fill"
              className="bg-opacity-10 bg-black"
              text
              rounded
              pt={{ icon: { className: "text-gray-100" } }}
              onClick={(e) => {
                e.stopPropagation();
                deleteBookmark(currentAdId);
              }}
            />
          ) : (
            <Button
              icon="pi pi-bookmark"
              className="bg-opacity-10 bg-black"
              text
              rounded
              pt={{ icon: { className: "text-gray-100" } }}
              onClick={(e) => {
                e.stopPropagation();
                addBookmark(currentAd);
              }}
            />
          ))}
        {!isSearch && (
          <Button
            icon="pi pi-search"
            className="bg-opacity-10 bg-black"
            text
            rounded
            pt={{ icon: { className: "text-gray-100" } }}
            onClick={(e) => {
              e.stopPropagation();
              navigate("search");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default TopButtons;
