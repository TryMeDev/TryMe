import React from "react";
import { ad } from "../../slices/adsSlice";
import { Image } from "primereact/image";
import Slider from "react-slick";

const ImageSlider: React.FC<{ bookmark: ad }> = ({ bookmark }) => {
  return (
    <Slider adaptiveHeight infinite={false} touchThreshold={10}>
      {bookmark?.imgs?.map((img, idx) => {
        return bookmark.links[idx] === "" ? (
          <Image
            src={img}
            imageClassName="h-[100svh] w-[100svw] object-contain"
          />
        ) : (
          <a
            key={idx}
            href={bookmark.links[idx]}
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
