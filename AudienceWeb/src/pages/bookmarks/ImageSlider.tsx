import React from "react";
import { ad } from "../../slices/adsSlice";
import { Image } from "primereact/image";
import Slider from "react-slick";

const ImageSlider: React.FC<{ bookmark: ad }> = ({ bookmark }) => {
  return (
    <Slider adaptiveHeight infinite={false}>
      {bookmark?.imgs?.map((img, idx) => {
        return (
          <a
            href={bookmark.links[idx]}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              key={idx}
              src={img}
              loading="lazy"
              imageClassName="h-[100svh] w-[100svw] object-contain"
            />
          </a>
        );
      })}
    </Slider>
  );
};

export default ImageSlider;
