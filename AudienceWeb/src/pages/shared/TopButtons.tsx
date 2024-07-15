import { ad } from "../../slices/adsSlice";
import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { IndexedDBContext } from "../../app/IndexedDBContext";
import { Toast } from "primereact/toast";
import useIsStandalone from "../../hooks/useIsStandalone";

const TopButtons: React.FC<{
  currentAd?: ad;
  currentAdId?: string;
}> = ({ currentAd, currentAdId }) => {
  const navigate = useNavigate();
  const isStandalone = useIsStandalone();
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
      <Button
        icon="pi pi-home"
        className="bg-opacity-10 bg-black"
        text
        rounded
        pt={{ icon: { className: "text-gray-100" } }}
        onClick={() => {
          navigate("/");
        }}
      />

      {isStandalone &&
        currentAd &&
        currentAdId &&
        (bookmarkIds?.includes(currentAdId) ? (
          <Button
            icon="pi pi-bookmark-fill"
            className="bg-opacity-10 bg-black"
            text
            rounded
            pt={{ icon: { className: "text-gray-100" } }}
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
            pt={{ icon: { className: "text-gray-100" } }}
            onClick={() => {
              addBookmark(currentAd);
            }}
          />
        ))}
    </div>
  );
};

export default TopButtons;
