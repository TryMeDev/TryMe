import { ad } from "../../slices/adsSlice";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { IndexedDBContext } from "../../app/IndexedDBContext";

const TopButtons: React.FC<{
  currentAd?: ad;
  currentAdId?: string;
  isSearch: boolean;
}> = ({ currentAd, currentAdId, isSearch }) => {
  const navigate = useNavigate();

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
      {isSearch ? (
        <Button
          icon="pi pi-chevron-left"
          className="bg-opacity-10 bg-black"
          text
          rounded
          onClick={() => {
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
            onClick={() => {
              navigate("settings");
            }}
          />
          <Button
            icon="pi pi-bookmark"
            className="bg-opacity-10 bg-black"
            text
            rounded
            onClick={() => {
              navigate("bookmarks");
            }}
          />
        </div>
      )}
      <div>
        {currentAd &&
          currentAdId &&
          (bookmarkIds?.includes(currentAdId) ? (
            <Button
              icon="pi pi-bookmark-fill"
              className="bg-opacity-10 bg-black"
              text
              rounded
              onClick={() => {
                deleteBookmark(currentAdId);
              }}
            />
          ) : (
            <Button
              icon="pi pi-bookmark"
              className="bg-opacity-10 bg-black"
              text
              rounded
              onClick={() => {
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
            onClick={() => {
              navigate("search");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default TopButtons;
