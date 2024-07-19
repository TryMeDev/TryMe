import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "primereact/button";
import {
  AutoComplete,
  AutoCompleteChangeEvent,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import { useSelector } from "react-redux";
import { setSearchingTags } from "../../slices/preferenceSlice";
import LoadingScreen from "../../components/LoadingScreen";
import { useNavigate } from "react-router-dom";
import { useGetTagsQuery } from "../../slices/tagsSlice";
import Error from "../../components/Error";
import { useAppDispatch } from "../../app/store";

const SUGGESTION_NUM = 5;

const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const preference = useSelector((state: any) => state.preference);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const {
    data: tags,
    isError: isTagsError,
    isLoading: isTagsLoading,
    refetch: reGetTags,
  } = useGetTagsQuery({});

  return (
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
          <div
            className="w-full p-3"
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
                  dispatch(setSearchingTags({ searchingTags: [] }));
                  navigate("/");
                }}
              />
              <h2>{t("search.search")}</h2>
            </div>
          </div>

          <div className="w-full h-full p-2">
            <LoadingScreen isLoading={isTagsLoading} />

            <div className="flex flex-col">
              <label>{t("search.hint")}</label>
              <AutoComplete
                className="w-full"
                pt={{ container: { className: "w-full" } }}
                value={preference.searchingTags}
                onChange={(e: AutoCompleteChangeEvent) => {
                  dispatch(setSearchingTags({ searchingTags: e.target.value }));
                }}
                suggestions={suggestions}
                completeMethod={(e: AutoCompleteCompleteEvent) => {
                  if (tags) {
                    const newSuggestions = [];
                    for (let tag of tags.map((tag) => tag.name)) {
                      if (tag.toLowerCase().includes(e.query.toLowerCase())) {
                        newSuggestions.push(tag);
                        if (newSuggestions.length >= SUGGESTION_NUM) {
                          break;
                        }
                      }
                    }
                    setSuggestions(newSuggestions);
                  }
                }}
                multiple
              />
            </div>

            <Button
              className="mt-2 w-full"
              disabled={preference.searchingTags.length === 0}
              label={t("search.search")}
              onClick={() => {
                navigate("/");
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Search;
