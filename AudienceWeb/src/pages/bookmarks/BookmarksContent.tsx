import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Image } from "primereact/image";
import { ConfirmDialog } from "primereact/confirmdialog";
import { ToggleButton } from "primereact/togglebutton";
import { IndexedDBItem } from "../../hooks/useIndexedDB";
import { cat } from "../../slices/catsSlice";
import { MultiSelect } from "primereact/multiselect";
import { useAppSelector } from "../../app/store";
import TopBar from "./TopBar";
import { ad } from "../../slices/adsSlice";

const BookmarksContent: React.FC<{
  cats: cat[];
  bookmarks: IndexedDBItem[];
  deleteBookmark: (_id: string) => Promise<void>;
  setIsPreview: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  selectedCats: cat[];
  setSelectedCats: React.Dispatch<React.SetStateAction<cat[]>>;
}> = ({
  cats,
  bookmarks,
  deleteBookmark,
  setIsPreview,
  setCurrentPage,
  selectedCats,
  setSelectedCats,
}) => {
  const navigate = useNavigate();

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [selectedBookmarkIds, setSelectedBookmarkIds] = useState<string[]>([]);

  const lang = useAppSelector((state) => state.preference.lang);

  return (
    <>
      <ConfirmDialog />
      <TopBar
        bookmarks={bookmarks as ad[]}
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        selectedBookmarkIds={selectedBookmarkIds}
        deleteBookmark={(_id) => {
          deleteBookmark(_id);
          setSelectedBookmarkIds([]);
          setIsEditMode(false);
        }}
      />

      <div className="w-full p-4 flex flex-wrap gap-1 justify-between">
        <MultiSelect
          value={selectedCats}
          onChange={(e) => {
            setSelectedCats(e.value);
          }}
          options={cats}
          optionLabel={`display.${lang}`}
          className="w-full mb-2"
        />

        {bookmarks?.map((bookmark, idx) => {
          if (bookmark?.imgs.length > 0) {
            return (
              <div className="md:w-[24%] sm:w-[32%] w-[48%]" key={bookmark._id}>
                {isEditMode && (
                  <ToggleButton
                    className="!absolute"
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
                )}
                <Image
                  className="w-full h-auto"
                  loading="lazy"
                  src={bookmark.imgs[0]}
                  onClick={() => {
                    setCurrentPage(idx);
                    setIsPreview(true);
                  }}
                ></Image>
              </div>
            );
          }
          return <></>;
        })}
      </div>
    </>
  );
};

export default BookmarksContent;
