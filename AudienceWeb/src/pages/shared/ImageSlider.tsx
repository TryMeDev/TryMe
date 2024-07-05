import React from "react";
import { ad } from "../../slices/adsSlice";
import { Image } from "primereact/image";
import Slider from "react-slick";

const ImageSlider: React.FC<{
  ad?: ad;
}> = ({ ad }) => {
  return (
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
  );
};

export default ImageSlider;
