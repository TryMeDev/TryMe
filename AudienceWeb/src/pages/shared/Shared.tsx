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
    <div className="h-[100svh] w-[100svw] bg-black overflow-hidden">
      <LoadingScreen isLoading={isGetByIdLoading} />

      <div className="h-full w-full flex flex-col bg-black">
        <ImageSlider ad={ad} />
        <TopButtons currentAd={ad} currentAdId={adId} />
      </div>
    </div>
  );
};

export default Shared;
