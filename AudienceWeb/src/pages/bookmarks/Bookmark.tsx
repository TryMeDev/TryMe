import React, { useRef } from "react";
import LoadingScreen from "../../components/LoadingScreen";
import { Button } from "primereact/button";
import { ad } from "../../slices/adsSlice";
import ImageSlider from "./ImageSlider";

const Bookmark: React.FC<{
  bookmark: ad;
  onBack: () => void;
  onDelete: () => void;
}> = ({ bookmark, onBack, onDelete }) => {
  return (
    <>
      <LoadingScreen isLoading={false} />
      <div className="w-full h-full flex flex-col">
        <div className="w-full flex justify-between p-1">
          <Button icon="pi pi-chevron-left" text onClick={onBack} />
          {bookmark?._id && (
            <Button
              icon="pi pi-bookmark-fill"
              text
              onClick={() => {
                onDelete();
              }}
            />
          )}
        </div>

        {bookmark && <ImageSlider bookmark={bookmark} />}
      </div>
    </>
  );
};

export default Bookmark;
