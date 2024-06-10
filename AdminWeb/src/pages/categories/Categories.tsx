import React, { useState } from "react";
import useProfile from "../../hooks/useProfile";
import LoadingScreen from "../../components/LoadingScreen";
import {
  display,
  initDisplay,
  useCreateCatMutation,
  useGetCatsQuery,
  useUpdateCatMutation,
} from "../../slices/catSlice";
import { useTranslation } from "react-i18next";
import { langs } from "../../assets/langs";
import { DataTable, DataTableRowEditCompleteEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from "primereact/button";

const Categories: React.FC = () => {
  const { isSuccess } = useProfile();
  const { data: cats, isSuccess: isCatsSuccess } = useGetCatsQuery({});
  const [createCat, { isLoading: isCreateCatLoading }] = useCreateCatMutation();
  const [updateCat, { isLoading: isUpdateCatLoading }] = useUpdateCatMutation();

  const [display, setDisplay] = useState<display>(initDisplay);

  const { t } = useTranslation();

  return (
    <>
      <LoadingScreen
        isLoading={
          !isSuccess ||
          !isCatsSuccess ||
          isCreateCatLoading ||
          isUpdateCatLoading
        }
      />
      <div className="flex flex-col gap-1">
        <DataTable
          value={cats?.map((cat) => cat.display)}
          editMode="row"
          dataKey="_id"
          onRowEditComplete={(e: DataTableRowEditCompleteEvent) => {
            updateCat({
              catId: cats ? cats[e.index]._id : "",
              display: e.newData as display,
            });
          }}
        >
          {cats &&
            Object.keys(langs).map((lang) => {
              return (
                <Column
                  key={lang}
                  field={lang}
                  header={langs[lang]["nativeName"]}
                  editor={(options) => (
                    <InputText
                      type="text"
                      value={options.value}
                      onChange={(e) => {
                        if (options.editorCallback)
                          options.editorCallback(e.target.value);
                      }}
                    />
                  )}
                />
              );
            })}
          <Column rowEditor={true} bodyStyle={{ textAlign: "center" }} />
        </DataTable>

        <div className="flex flex-wrap gap-1 items-center">
          {Object.keys(initDisplay).map((lang) => (
            <React.Fragment key={lang}>
              <FloatLabel>
                <label htmlFor={lang}>{t(`lang.${lang}`)}</label>
                <InputText
                  id={lang}
                  value={display[lang]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setDisplay((prev) => ({ ...prev, [lang]: e.target.value }))
                  }
                />
              </FloatLabel>
            </React.Fragment>
          ))}
          <Button
            label={t("add")}
            onClick={() => {
              createCat({ display });
              setDisplay(initDisplay);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Categories;
