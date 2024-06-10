import React from "react";
import LoadingScreen from "../../components/LoadingScreen";
import { useTranslation } from "react-i18next";
import { ad } from "../../slices/adsSlice";
import Error from "../../components/Error";
import { Image } from "primereact/image";
import Slider from "react-slick";

const ImageSlider: React.FC<{
  ad?: ad;
  isGetByIdLoading: boolean;
  isGetByIdError: boolean;
  reGetById: () => void;
}> = ({ ad, isGetByIdLoading, isGetByIdError, reGetById }) => {
  const { t } = useTranslation();

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
          return (
            <Image
              key={idx}
              src={img}
              loading="lazy"
              imageClassName="h-[100svh] w-[100svw] object-contain"
            />
          );
        })}
      </Slider>
    </>
  );
};

export default ImageSlider;
