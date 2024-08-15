import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "primereact/button";
import {
  AutoComplete,
  AutoCompleteChangeEvent,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import { setSearchingTags } from "../../slices/preferenceSlice";
import { useNavigate } from "react-router-dom";
import { tag } from "../../slices/tagsSlice";
import { useAppDispatch, useAppSelector } from "../../app/store";

const SUGGESTION_NUM = 5;

const Content: React.FC<{ tags: tag[] }> = ({ tags }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const preference = useAppSelector((state) => state.preference);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  return (
    <>
      <div className="w-full p-3">
        <div className="flex items-center gap-1">
          <Button
            text
            icon="pi pi-chevron-left"
            className="p-0 w-auto"
            onClick={() => {
              dispatch(setSearchingTags({ searchingTags: [] }));
              navigate("/viewer");
            }}
          />
          <h2 className="text-2xl">{t("search.search")}</h2>
        </div>
      </div>

      <div className="w-full h-full px-4">
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
            forceSelection
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
  );
};

export default Content;
