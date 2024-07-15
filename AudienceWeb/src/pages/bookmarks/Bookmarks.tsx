import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { ad } from "../../slices/adsSlice";
import { Image } from "primereact/image";
import Bookmark from "./Bookmark";
import { IndexedDBContext } from "../../app/IndexedDBContext";
import { Checkbox } from "primereact/checkbox";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { ToggleButton } from "primereact/togglebutton";

const Bookmarks: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isPreview, setIsPreview] = React.useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [selectedBookmarkIds, setSelectedBookmarkIds] = useState<string[]>([]);

  const indexedDBContext = useContext(IndexedDBContext);

  if (!indexedDBContext) {
    return <></>;
  }

  const { data: bookmarks, deleteData: deleteBookmark } = indexedDBContext;

  return (
    <div className="h-full w-full">
      <ConfirmDialog />

      {isPreview ? (
        <Bookmark
          bookmark={bookmarks[currentPage] as ad}
          onBack={() => {
            setIsPreview(false);
            setCurrentPage(0);
          }}
          onDelete={() => {
            if (bookmarks.length === 1) {
              setIsPreview(false);
            } else if (currentPage >= bookmarks.length - 1) {
              setCurrentPage((prev) => prev - 1);
            }

            const bookmarkId = bookmarks?.[currentPage]?._id;
            if (bookmarkId) {
              deleteBookmark(bookmarkId);
            }
          }}
        />
      ) : (
        <>
          <div
            className="w-full p-3 flex items-center justify-between"
            style={{
              backgroundColor: "var(--primary-color)",
              color: "var(--primary-color-text)",
            }}
          >
            <div className="flex items-center gap-1">
              <Button
                icon="pi pi-chevron-left"
                className="p-0 w-auto"
                onClick={() => {
                  navigate("/");
                }}
              />
              <h2>{t("bookmarks.bookmarks")}</h2>
            </div>
            <Button
              className="p-0"
              icon="pi pi-trash"
              disabled={selectedBookmarkIds.length === 0}
              onClick={() => {
                confirmDialog({
                  message: t("bookmarks.deleteConfirmMsg"),
                  header: t("bookmarks.deleteConfirmHeader"),
                  icon: "pi pi-exclamation-triangle",
                  defaultFocus: "accept",
                  accept: () => {
                    selectedBookmarkIds.forEach((bookmarkId) =>
                      deleteBookmark(bookmarkId)
                    );
                  },
                  reject: () => {},
                });
              }}
            />
          </div>

          <div className="w-full h-full p-2 flex flex-wrap gap-1 justify-between">
            {bookmarks?.map((bookmark, idx) => {
              if (bookmark?.imgs.length > 0) {
                return (
                  <div className="w-[48%]" key={bookmark._id}>
                    <ToggleButton
                      className="absolute"
                      onLabel=""
                      offLabel=""
                      onIcon="pi pi-check"
                      offIcon="pi"
                      checked={
                        bookmark._id !== undefined &&
                        selectedBookmarkIds.includes(bookmark._id)
                      }
                      onChange={(e) => {
                        const bookmarkId = bookmark?._id;
                        if (bookmarkId) {
                          if (e.value) {
                            setSelectedBookmarkIds((prev) => [
                              ...prev,
                              bookmarkId,
                            ]);
                          } else {
                            setSelectedBookmarkIds((prev) =>
                              prev.filter((id) => id !== bookmarkId)
                            );
                          }
                        }
                      }}
                    />
                    <Image
                      className="w-full h-auto"
                      loading="lazy"
                      src={bookmark.imgs[0]}
                      onClick={() => {
                        setCurrentPage(idx);
                        setIsPreview(true);
                      }}
                    />
                  </div>
                );
              }
              return <></>;
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Bookmarks;
