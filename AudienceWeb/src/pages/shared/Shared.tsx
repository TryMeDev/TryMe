import React from "react";
import LoadingScreen from "../../components/LoadingScreen";
import { useGetByIdQuery } from "../../slices/adsSlice";
import NotFound from "./NotFound";
import ImageSlider from "./ImageSlider";
import TopButtons from "./TopButtons";
import { useParams } from "react-router-dom";

const Shared: React.FC = () => {
  const { adId } = useParams();

  const {
    data: ad,
    isError: isGetByIdError,
    isLoading: isGetByIdLoading,
    refetch: reGetById,
  } = useGetByIdQuery({ _id: adId || "" }, { skip: !adId });

  return isGetByIdError ? (
    <NotFound reGetById={reGetById} />
  ) : (
    <>
      <LoadingScreen isLoading={isGetByIdLoading} />
      <div className="w-full h-full flex flex-col">
        <ImageSlider ad={ad} />

        <TopButtons currentAd={ad} currentAdId={adId} />
      </div>
    </>
  );
};

export default Shared;
