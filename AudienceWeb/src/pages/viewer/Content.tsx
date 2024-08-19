import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../app/store";
import { ad } from "../../slices/adsSlice";
import ImageSlider from "./ImageSlider";
import Slider from "react-slick";
import TopButtons from "./TopButtons";
import BottomTags from "./BottomTags";

const Content: React.FC<{ adIds: string[] }> = ({ adIds }) => {
  const preference = useAppSelector((state) => state.preference);

  const [ads, setAds] = useState<{ [key: string]: ad }>({});
  const [currentPage, setCurrentPage] = useState<number>(0);

  const isSearch = preference?.searchingTags?.length > 0;

  const currentAdId = adIds?.[currentPage];

  useEffect(() => {
    const sliderElement = document.querySelector(".slick-slider");
    if (sliderElement) {
      if (currentPage === 0) {
        document.body.style.overscrollBehaviorY = "auto contain";
      } else if (currentPage === adIds.length - 1) {
        document.body.style.overscrollBehaviorY = "contain auto";
      } else {
        document.body.style.overscrollBehaviorY = "contain";
      }
    }

    return () => {
      document.body.style.overscrollBehaviorY = "";
    };
  }, [currentPage, adIds.length]);

  return (
    <div className="h-full w-full flex flex-col bg-black">
      <Slider
        touchThreshold={20}
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

      <BottomTags tags={ads[currentAdId]?.tags} />
    </div>
  );
};

export default Content;
