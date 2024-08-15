import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ad, useGetByIdQuery } from "../../slices/adsSlice";
import Error from "../../components/Error";
import { Image } from "primereact/image";
import Slider from "react-slick";
import { Skeleton } from "primereact/skeleton";

const ImageSlider: React.FC<{
  adId: string;
  isShown: boolean;
  addAd: (newAd: ad) => void;
}> = ({ adId, isShown, addAd }) => {
  const { t } = useTranslation();

  const {
    data: ad,
    isError: isGetByIdError,
    isLoading: isGetByIdLoading,
    isSuccess: isGetByIdSuccess,
    refetch: reGetById,
  } = useGetByIdQuery({ _id: adId }, { skip: !isShown });

  useEffect(() => {
    if (isGetByIdSuccess) {
      addAd(ad);
    }
  }, [isGetByIdSuccess]);

  return isGetByIdError ? (
    <Error
      onReload={() => {
        reGetById();
      }}
      errorText={t("getByIdError")}
    />
  ) : (
    <>
      {isGetByIdLoading ? (
        <Skeleton width="100svw" height="100swh" />
      ) : (
        <Slider adaptiveHeight infinite={false} touchThreshold={10}>
          {ad?.imgs?.map((img, idx) => {
            return ad.links[idx] === "" ? (
              <Image
                key={idx}
                src={img}
                imageClassName="h-[100svh] w-[100svw] object-contain"
              />
            ) : (
              <a
                key={idx}
                href={ad.links[idx]}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={img}
                  imageClassName="h-[100svh] w-[100svw] object-contain"
                />
              </a>
            );
          })}
        </Slider>
      )}
    </>
  );
};

export default ImageSlider;
