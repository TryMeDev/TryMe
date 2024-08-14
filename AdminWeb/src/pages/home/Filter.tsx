import React, { useState } from "react";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import { Calendar } from "primereact/calendar";
import { addDays } from "../../assets/utils";
import { region, regions } from "../../assets/regions";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import { useAppSelector } from "../../app/store";

const statuses = ["unpaid", "paid", "approved", "rejected", "canceled"];

const Filter: React.FC<{ getAd: any; isAdLoading: boolean }> = ({
  getAd,
  isAdLoading,
}) => {
  const { t } = useTranslation();
  const lang = useAppSelector((state) => state.preference.lang);

  const [searchLink, setSearchLink] = useState<string>("");
  const [earlierThan, setEarlierThan] = useState<Date>(addDays(2));
  const [selectedRegions, setSelectedRegions] = useState<region[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(["paid"]);

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

      <MultiSelect
        value={selectedRegions}
        onChange={(e) => {
          if (e.value) {
            setSelectedRegions(e.value);
          }
        }}
        filter
        options={regions}
        optionLabel={`display.${lang}`}
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
            locations: selectedRegions.map((region) => region.code),
            statuses: selectedStatuses,
          });
        }}
      />
    </div>
  );
};

export default Filter;
