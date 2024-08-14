import React, { useEffect } from "react";
import { useAppSelector } from "../../app/store";
import LoadingScreen from "../../components/LoadingScreen";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetIdsQuery } from "../../slices/adsSlice";
import Error from "../../components/Error";
import NotFound from "./NotFound";
import useIsStandalone from "../../hooks/useIsStandalone";
import Content from "./Content";
import PromptInstallIfNotStandalone from "../../components/PromptInstallIfNotStandalone";

const Viewer: React.FC = () => {
  const navigate = useNavigate();

  const preference = useAppSelector((state) => state.preference);
  const { t } = useTranslation();

  const isSearch = preference?.searchingTags?.length > 0;

  const {
    data: adIds,
    isError: isGetIdsError,
    isLoading: isGetIdsLoading,
    refetch: reGetIds,
  } = useGetIdsQuery(
    {
      catIds: [preference.currentCat],
      is18: preference.is18,
      locations: [preference.location],
      tags: preference?.searchingTags ?? [],
    },
    { skip: preference.currentCat === "" }
  );

  useEffect(() => {
    if (!preference.isSet) {
      navigate("/settings");
    }
  }, [preference.isSet]);

  useEffect(() => {
    if (preference.currentCat === "") {
      navigate("/");
    }
  }, [preference.currentCat]);

  return (
    <PromptInstallIfNotStandalone>
      {isGetIdsError ? (
        <Error
          onReload={() => {
            reGetIds();
          }}
          errorText={t("viewer.getIdsError")}
        />
      ) : !isGetIdsLoading && adIds?.length === 0 ? (
        <NotFound isSearch={isSearch} />
      ) : (
        <div className="h-[100svh] w-[100svw] bg-black overflow-hidden">
          <meta name="theme-color" content="#000000" />
          <LoadingScreen isLoading={isGetIdsLoading} />
          <Content adIds={adIds ?? []} />
        </div>
      )}
    </PromptInstallIfNotStandalone>
  );
};

export default Viewer;
