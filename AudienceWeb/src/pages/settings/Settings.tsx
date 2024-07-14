import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "primereact/button";
import { regions } from "../../assets/regions";
import {
  AutoComplete,
  AutoCompleteChangeEvent,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import { useSelector } from "react-redux";
import {
  saveLocalStorage,
  setIs18,
  setLang,
  setLocation,
  setNotInterestedCats,
} from "../../slices/preferenceSlice";
import { InputSwitch } from "primereact/inputswitch";
import { display, useGetCatsQuery } from "../../slices/catsSlice";
import LoadingScreen from "../../components/LoadingScreen";
import { ToggleButton, ToggleButtonChangeEvent } from "primereact/togglebutton";
import { useNavigate } from "react-router-dom";
import Error from "../../components/Error";
import { Dropdown } from "primereact/dropdown";
import { langs } from "../../assets/langs";
import { useAppDispatch } from "../../app/store";
import { PUBLISHER_URL } from "../../config";
import useIsStandalone from "../../hooks/useIsStandalone";
import PromptInstallPWAPage from "../installPWA/PromptInstallPWAPage";

export type division = {
  label: string;
  value: string;
};
type region = {
  label: string;
  code: string;
  items: division[];
};
const regionDataList: region[] = Object.entries(regions).map(
  ([regionCode, region]) => ({
    label: region.name,
    code: regionCode,
    items: Object.entries(region.divisions).map(([divisionCode, division]) => ({
      label: division,
      value: divisionCode,
    })),
  })
);

const Settings: React.FC = () => {
  const dispatch = useAppDispatch();
  const isStandalone = useIsStandalone();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const preference = useSelector((state: any) => state.preference);
  const [filteredDivisions, setFilteredDivisions] =
    useState<region[]>(regionDataList);
  const {
    data: cats,
    isError: isCatsError,
    isLoading: isCatsLoading,
    refetch: reGetCats,
  } = useGetCatsQuery({});

  const search = (event: AutoCompleteCompleteEvent) => {
    let query = event.query;
    let _filteredCities = [];

    for (let country of regionDataList) {
      let filteredItems = country.items.filter(
        (item) => item.label.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );

      if (filteredItems && filteredItems.length) {
        _filteredCities.push({ ...country, ...{ items: filteredItems } });
      }
    }

    setFilteredDivisions(_filteredCities);
  };

  const langList = Object.keys(langs).map((code) => ({
    code,
    ...langs[code as keyof typeof langs],
  }));

  return isStandalone === "unknown" ? (
    <></>
  ) : isStandalone ? (
    <div className="h-full w-full">
      {isCatsError ? (
        <Error
          onReload={() => {
            reGetCats();
          }}
          errorText={t("getCatsError")}
        />
      ) : (
        <>
          <div
            className="w-full py-3 px-1 flex items-center justify-between"
            style={{
              backgroundColor: "var(--primary-color)",
              color: "var(--primary-color-text)",
            }}
          >
            <h2 className="pl-3">{t("settings.settings")}</h2>
            <Button
              className="p-0"
              icon="pi pi-check"
              onClick={() => {
                dispatch(saveLocalStorage());
                navigate("/");
              }}
            />
          </div>

          <div className="w-full min-h-[90%] p-3">
            <LoadingScreen isLoading={isCatsLoading} />

            <div>
              <label>{t("language")}</label>
              <Dropdown
                value={
                  langList?.find((lang) => lang.code === preference.lang) || ""
                }
                onChange={(e) => {
                  dispatch(setLang({ lang: e.value.code }));
                }}
                options={langList}
                optionLabel="nativeName"
                className="w-full"
              />
            </div>

            <div className="mt-1">
              <label>{t("location")}</label>
              <AutoComplete
                className="w-full"
                pt={{ container: { className: "w-full" } }}
                value={regionDataList
                  .find(
                    (region) =>
                      region.code === preference.location.split("-")[0]
                  )
                  ?.items.find(
                    (division) => division.value === preference.location
                  )}
                onChange={(e: AutoCompleteChangeEvent) => {
                  dispatch(setLocation({ location: e.value.value }));
                }}
                suggestions={filteredDivisions}
                completeMethod={search}
                field="label"
                optionGroupLabel="label"
                optionGroupChildren="items"
                dropdown
              />
            </div>

            <div className="flex gap-1 items-center mt-3">
              <InputSwitch
                checked={preference.is18}
                onChange={(e) => dispatch(setIs18({ is18: e.value }))}
              />
              <label>
                {preference.is18 ? t("settings.is18") : t("settings.isNot18")}
              </label>
            </div>

            <div className="mt-3">{t("settings.interestedCats")}</div>
            <div className="flex flex-wrap w-full gap-1">
              {cats?.map((cat) => (
                <ToggleButton
                  className="text-xs"
                  pt={{
                    box: { className: "p-1" },
                    label: { className: "m-0 text-sm" },
                    icon: { className: "m-0 text-sm" },
                  }}
                  key={cat._id}
                  onLabel={cat.display[preference.lang as keyof display]}
                  offLabel={cat.display[preference.lang as keyof display]}
                  onIcon="pi pi-check"
                  offIcon="pi pi-times"
                  checked={!preference.notInterestedCats.includes(cat._id)}
                  onChange={(e) => {
                    if (e.value) {
                      dispatch(
                        setNotInterestedCats({
                          notInterestedCats:
                            preference.notInterestedCats.filter(
                              (notInterestedCat: string) =>
                                notInterestedCat !== cat._id
                            ),
                        })
                      );
                    } else {
                      dispatch(
                        setNotInterestedCats({
                          notInterestedCats: [
                            ...preference.notInterestedCats,
                            cat._id,
                          ],
                        })
                      );
                    }
                  }}
                />
              ))}
            </div>

            <div className="mt-3 flex flex-col">
              <a
                className="underline"
                href={`${PUBLISHER_URL}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("settings.publish")}
              </a>
              <a
                className="underline"
                href={`${PUBLISHER_URL}aboutus`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("settings.aboutUs")}
              </a>
              <a
                className="underline"
                href={`${PUBLISHER_URL}faq`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("settings.faq")}
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  ) : (
    <PromptInstallPWAPage />
  );
};

export default Settings;
