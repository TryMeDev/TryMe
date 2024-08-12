import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { regions } from "../../assets/regions";
import {
  AutoComplete,
  AutoCompleteChangeEvent,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import { useSelector } from "react-redux";
import { setLocation } from "../../slices/preferenceSlice";
import { useAppDispatch } from "../../app/store";

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

const LocationDropdown: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const preference = useSelector((state: any) => state.preference);
  const [filteredDivisions, setFilteredDivisions] =
    useState<region[]>(regionDataList);

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

  return (
    <div className="mt-1">
      <label>{t("location")}</label>
      <AutoComplete
        className="w-full"
        pt={{ container: { className: "w-full" } }}
        value={regionDataList
          .find((region) => region.code === preference.location.split("-")[0])
          ?.items.find((division) => division.value === preference.location)}
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
  );
};

export default LocationDropdown;
