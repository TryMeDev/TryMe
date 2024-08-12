import React from "react";
import { useTranslation } from "react-i18next";
import LoadingScreen from "../../components/LoadingScreen";
import { useGetTagsQuery } from "../../slices/tagsSlice";
import Error from "../../components/Error";
import { useAppSelector } from "../../app/store";
import Content from "./Content";
import PromptInstallIfNotStandalone from "../../components/PromptInstallIfNotStandalone";

const Search: React.FC = () => {
  const { t } = useTranslation();

  const preference = useAppSelector((state) => state.preference);

  const {
    data: tags,
    isError: isTagsError,
    isLoading: isTagsLoading,
    refetch: reGetTags,
  } = useGetTagsQuery(
    { catId: preference.currentCat },
    { skip: preference.currentCat === "" }
  );

  return (
    <PromptInstallIfNotStandalone>
      <div className="h-full w-full">
        {isTagsError ? (
          <Error
            onReload={() => {
              reGetTags();
            }}
            errorText={t("search.getTagsError")}
          />
        ) : (
          <>
            <LoadingScreen isLoading={isTagsLoading} />
            <Content tags={tags ?? []} />
          </>
        )}
      </div>
    </PromptInstallIfNotStandalone>
  );
};

export default Search;
