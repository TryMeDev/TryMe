import React, { useEffect } from "react";
import LoadingScreen from "../../components/LoadingScreen";
import { useGetByIdQuery } from "../../slices/adsSlice";
import NotFound from "./NotFound";
import ImageSlider from "./ImageSlider";
import TopButtons from "./TopButtons";
import { useParams } from "react-router-dom";
import { useThemeColor } from "../../hooks/useThemeColor";

const Shared: React.FC = () => {
  const { adId } = useParams();

  useThemeColor("#000000");

  const {
    data: ad,
    isError: isGetByIdError,
    isLoading: isGetByIdLoading,
    refetch: reGetById,
  } = useGetByIdQuery({ _id: adId || "" }, { skip: !adId });

  useEffect(() => {
    if (!window.matchMedia("(display-mode: standalone)")) {
      const pwaUrl = window.location.href;
      window.open(pwaUrl, "_blank", "display=standalone");
    }
  }, []);

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
