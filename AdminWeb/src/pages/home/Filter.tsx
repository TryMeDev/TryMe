import React, { useState } from "react";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import { Calendar } from "primereact/calendar";
import { addDays } from "../../assets/utils";
import { regions } from "../../assets/regions";
import {
  AutoComplete,
  AutoCompleteChangeEvent,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";

type division = {
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

const statuses = ["unpaid", "paid", "approved", "rejected", "canceled"];

const Filter: React.FC<{ getAd: any; isAdLoading: boolean }> = ({
  getAd,
  isAdLoading,
}) => {
  const { t } = useTranslation();

  const [searchLink, setSearchLink] = useState<string>("");
  const [earlierThan, setEarlierThan] = useState<Date>(addDays(2));
  const [selectedDivisions, setSelectedDivisions] = useState<division[]>([]);
  const [filteredDivisions, setFilteredDivisions] =
    useState<region[]>(regionDataList);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(["paid"]);

  const search = (event: AutoCompleteCompleteEvent) => {
    const query = event.query.toLowerCase();
    const filteredDivisions = regionDataList.map((region) => ({
      ...region,
      items: region.items.filter((item) =>
        item.label.toLowerCase().includes(query)
      ),
    }));

    const nonEmptyFilteredDivisions = filteredDivisions.filter(
      (region) => region.items.length > 0
    );
    setFilteredDivisions(nonEmptyFilteredDivisions);
  };

  return (
    <div className="w-full flex flex-wrap items-center gap-2">
      <IconField>
        <InputIcon className="pi pi-search" />
        <InputText
          value={searchLink}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchLink(e.target.value)
          }
          placeholder={t("searchPlaceholder")}
        />
      </IconField>

      <label htmlFor="locations">{t("locations")}</label>
      <AutoComplete
        inputId="locations"
        value={selectedDivisions}
        onChange={(e: AutoCompleteChangeEvent) => setSelectedDivisions(e.value)}
        suggestions={filteredDivisions}
        completeMethod={search}
        field="label"
        optionGroupLabel="label"
        optionGroupChildren="items"
        dropdown
        multiple
      />

      <label htmlFor="earlierThan">{t("Earlier Than")}</label>
      <Calendar
        inputId="earlierThan"
        value={earlierThan}
        onChange={(e) => {
          if (e.value) {
            setEarlierThan(e.value);
          }
        }}
      />

      <MultiSelect
        value={selectedStatuses}
        onChange={(e: MultiSelectChangeEvent) => setSelectedStatuses(e.value)}
        options={statuses}
        display="chip"
        placeholder={t("Select Statuses")}
      />

      <Button
        label={t("Search")}
        loading={isAdLoading}
        onClick={() => {
          getAd({
            search: searchLink,
            earlierThan: earlierThan.toISOString(),
            locations: selectedDivisions.map((division) => division.value),
            statuses: selectedStatuses,
          });
        }}
      />
    </div>
  );
};

export default Filter;
