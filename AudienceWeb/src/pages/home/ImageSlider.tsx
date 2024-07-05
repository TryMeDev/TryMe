import React, { useEffect } from "react";
import LoadingScreen from "../../components/LoadingScreen";
import { useTranslation } from "react-i18next";
import { ad, useGetByIdQuery } from "../../slices/adsSlice";
import Error from "../../components/Error";
import { Image } from "primereact/image";
import Slider from "react-slick";

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
      <LoadingScreen isLoading={isGetByIdLoading} />

      <Slider adaptiveHeight infinite={false}>
        {ad?.imgs?.map((img, idx) => {
          return ad.links[idx] === "" ? (
            <Image
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
    </>
  );
};

export default ImageSlider;
