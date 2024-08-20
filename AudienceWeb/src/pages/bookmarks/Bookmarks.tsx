import React, { useContext, useEffect, useState } from "react";
import { ad } from "../../slices/adsSlice";
import Bookmark from "./Bookmark";
import { IndexedDBContext } from "../../app/IndexedDBContext";
import BookmarksContent from "./BookmarksContent";
import { cat, useGetCatsQuery } from "../../slices/catsSlice";
import Error from "../../components/Error";
import LoadingScreen from "../../components/LoadingScreen";
import { useTranslation } from "react-i18next";
import PromptInstallIfNotStandalone from "../../components/PromptInstallIfNotStandalone";
import { useThemeColor } from "../../hooks/useThemeColor";

const Bookmarks: React.FC = () => {
  const { t } = useTranslation();
  const [isPreview, setIsPreview] = React.useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);

  useThemeColor(isPreview ? "#000000" : "#FFFFFF");

  const indexedDBContext = useContext(IndexedDBContext);

  if (!indexedDBContext) {
    return <></>;
  }

  const { data: allBookmarks, deleteData: deleteBookmark } = indexedDBContext;
  const [selectedCats, setSelectedCats] = useState<cat[]>([]);

  const bookmarks = allBookmarks.filter(
    (bookmark) =>
      selectedCats.length === 0 ||
      selectedCats.map((cat) => cat._id).includes(bookmark?.catId)
  );

  const {
    data: cats,
    isError: isCatsError,
    isLoading: isCatsLoading,
    refetch: reGetCats,
  } = useGetCatsQuery({});

  useEffect(() => {
    if (cats && cats.length > 0) {
      setSelectedCats(cats);
    }
  }, [cats]);

  return (
    <PromptInstallIfNotStandalone>
      {isCatsError ? (
        <Error
          onReload={() => {
            reGetCats();
          }}
          errorText={t("getCatsError")}
        />
      ) : (
        <>
          <LoadingScreen isLoading={isCatsLoading} />
          <div className="h-full w-full">
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
              <BookmarksContent
                cats={cats ?? []}
                bookmarks={bookmarks}
                setSelectedCats={setSelectedCats}
                deleteBookmark={deleteBookmark}
                setIsPreview={setIsPreview}
                setCurrentPage={setCurrentPage}
                selectedCats={selectedCats}
              />
            )}
          </div>
        </>
      )}
    </PromptInstallIfNotStandalone>
  );
};

export default Bookmarks;
