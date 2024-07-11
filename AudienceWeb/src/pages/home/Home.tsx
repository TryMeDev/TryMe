import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../app/store";
import LoadingScreen from "../../components/LoadingScreen";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ad, useGetIdsQuery, useLazyGetByIdQuery } from "../../slices/adsSlice";
import Error from "../../components/Error";
import NotFound from "./NotFound";
import ImageSlider from "./ImageSlider";
import Slider from "react-slick";
import TopButtons from "./TopButtons";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const preference = useAppSelector((state) => state.preference);
  const { t } = useTranslation();

  const [ads, setAds] = useState<{ [key: string]: ad }>({});
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
    <div className="h-[100svh] w-[100svw] bg-black overflow-hidden">
      <LoadingScreen isLoading={isGetIdsLoading} />
      <div className="h-full w-full flex flex-col bg-black">
        <Slider
          adaptiveHeight
          infinite={false}
          vertical
          verticalSwiping
          beforeChange={(currentPage, newPage) => {
            setCurrentPage(newPage);
          }}
        >
          {adIds?.map((adId) => (
            <ImageSlider
              key={adId}
              adId={adId}
              isShown={currentAdId === adId}
              addAd={(newAd: ad) => {
                setAds((prev) => ({ ...prev, [newAd._id]: newAd }));
              }}
            />
          ))}
        </Slider>

        {currentAdId && currentAdId in ads && (
          <TopButtons
            currentAd={ads[currentAdId]}
            currentAdId={currentAdId}
            isSearch={isSearch}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
