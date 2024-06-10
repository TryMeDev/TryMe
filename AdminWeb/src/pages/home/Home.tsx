import React, { useEffect, useRef } from "react";
import useProfile from "../../hooks/useProfile";
import LoadingScreen from "../../components/LoadingScreen";
import AppBar from "../../components/AppBar";
import { useGetCatsQuery } from "../../slices/catSlice";
import { useGetAdMutation } from "../../slices/adsSlice";
import Filter from "./Filter";
import AdDetail from "./AdDetail";
import { Toast } from "primereact/toast";

const Home: React.FC = () => {
  const toast = useRef<Toast>(null);
  const { isSuccess: isProfileSuccess } = useProfile();
  const { isSuccess: isCatsSuccess } = useGetCatsQuery({});
  const [
    getAd,
    { data: ad, isLoading: isAdLoading, isError: isAdError, error: adError },
  ] = useGetAdMutation({});

  useEffect(() => {
    if (isAdError) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: JSON.stringify(adError),
      });
    }
  }, [isAdError]);

  return (
    <>
      <LoadingScreen
        isLoading={!isProfileSuccess || !isCatsSuccess || isAdLoading}
      />
      <div className="w-full h-full flex flex-col">
        <AppBar />
        <Toast ref={toast} />
        <div className="flex-grow overflow-auto p-2 pb-0">
          <Filter getAd={getAd} isAdLoading={isAdLoading} />
          {ad && <AdDetail ad={ad} />}
        </div>
      </div>
    </>
  );
};

export default Home;
