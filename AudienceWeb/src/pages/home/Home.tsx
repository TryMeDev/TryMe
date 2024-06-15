import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../app/store";
import LoadingScreen from "../../components/LoadingScreen";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetByIdQuery, useGetIdsQuery } from "../../slices/adsSlice";
import Error from "../../components/Error";
import NotFound from "./NotFound";
import ImageSlider from "./ImageSlider";
import Slider from "react-slick";
import TopButtons from "./TopButtons";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const preference = useAppSelector((state) => state.preference);
  const { t } = useTranslation();

  const [currentPage, setCurrentPage] = useState<number>(0);

  const isSearch = preference?.searchingTags?.length > 0;

  const {
    data: adIds,
    isError: isGetIdsError,
    isLoading: isGetIdsLoading,
    refetch: reGetIds,
  } = useGetIdsQuery({
    excludedCatIds: preference.notInterestedCats,
    is18: preference.is18,
    locations: [preference.location],
    tags: preference?.searchingTags || [],
  });

  const currentAdId = adIds?.[currentPage];

  const {
    data: currentAd,
    isError: isGetByIdError,
    isLoading: isGetByIdLoading,
    refetch: reGetById,
  } = useGetByIdQuery({ _id: currentAdId || "" }, { skip: !currentAdId });

  useEffect(() => {
    if (!preference.isSet) {
      navigate("/settings");
    }
  }, [preference.isSet]);

  return isGetIdsError ? (
    <Error
      onReload={() => {
        reGetIds();
      }}
      errorText={t("home.getIdsError")}
    />
  ) : !isGetIdsLoading && adIds?.length === 0 ? (
    <NotFound isSearch={isSearch} />
  ) : (
    <>
      <LoadingScreen isLoading={isGetIdsLoading} />
      <div className="w-full h-full flex flex-col">
        <Slider
          adaptiveHeight
          infinite={false}
          vertical
          verticalSwiping
          afterChange={(newPage) => {
            setCurrentPage(newPage);
          }}
        >
          {adIds?.map((adId) => (
            <ImageSlider
              key={adId}
              ad={currentAd}
              isGetByIdError={isGetByIdError}
              isGetByIdLoading={isGetByIdLoading}
              reGetById={reGetById}
            />
          ))}
        </Slider>

        <TopButtons
          currentAd={currentAd}
          currentAdId={currentAdId}
          isSearch={isSearch}
        />
      </div>
    </>
  );
};

export default Home;
