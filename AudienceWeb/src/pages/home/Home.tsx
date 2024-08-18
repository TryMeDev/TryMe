import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../app/store";
import LoadingScreen from "../../components/LoadingScreen";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PromptInstallIfNotStandalone from "../../components/PromptInstallIfNotStandalone";
import { useGetCatsQuery } from "../../slices/catsSlice";
import Error from "../../components/Error";
import Content from "./Content";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const preference = useAppSelector((state) => state.preference);
  const { t } = useTranslation();

  const {
    data: cats,
    isError: isCatsError,
    isLoading: isCatsLoading,
    refetch: reGetCats,
  } = useGetCatsQuery({});

  useEffect(() => {
    if (!preference.isSet) {
      navigate("/settings");
    }
  }, [preference.isSet]);

  useEffect(() => {
    if (preference.currentCat !== "") {
      navigate("/viewer");
    }
  }, [preference.currentCat]);

  return (
    <PromptInstallIfNotStandalone>
      <meta name="theme-color" content="#FFFFFF" />
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
          <Content cats={cats ?? []} />
        </>
      )}
    </PromptInstallIfNotStandalone>
  );
};

export default Home;
