import React, { useEffect, useRef } from "react";
import { useAppSelector } from "../../app/store";
import useProfile from "../../hooks/useProfile";
import LoadingScreen from "../../components/LoadingScreen";
import { useNavigate } from "react-router-dom";
import AppBar from "../../components/AppBar";
import { cat, useGetCatsQuery } from "../../slices/catSlice";
import { DataScroller } from "primereact/datascroller";
import { Button } from "primereact/button";
import { ad } from "../../slices/adsSlice";
import LoadingImage from "../../components/LoadingImage";
import { displayDate, sortByDate } from "../../assets/utils";
import { useTranslation } from "react-i18next";
import { Toast } from "primereact/toast";
import BottomBar from "../../components/BottomBar";

const Home: React.FC = () => {
  const toast = useRef<Toast>(null);
  const navigate = useNavigate();
  const {
    profile,
    isSuccess,
    isError: isProfileError,
    error: profileError,
  } = useProfile();
  const {
    data: cats,
    isSuccess: isCatsSuccess,
    isError: isCatsError,
    error: catsError,
  } = useGetCatsQuery({});
  const lang = useAppSelector((state: any) => state.preference.lang);
  const { t } = useTranslation();

  useEffect(() => {
    if (isProfileError) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: JSON.stringify(profileError),
      });
    }
  }, [isProfileError]);

  useEffect(() => {
    if (isCatsError) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: JSON.stringify(catsError),
      });
    }
  }, [isCatsError]);

  return (
    <>
      <LoadingScreen isLoading={!isSuccess && !isCatsSuccess} />
      <div className="w-full h-full flex flex-col">
        <AppBar />
        <Toast ref={toast} />

        <div className="h-[calc(100%-59px)] overflow-auto flex flex-col justify-between">
          <DataScroller
            value={profile ? sortByDate(profile, "startDate", false) : []}
            itemTemplate={(ad: ad) => (
              <div
                key={ad._id}
                className="w-full p-2 flex gap-4"
                onClick={() => {
                  navigate(`detail/${ad._id}`);
                }}
              >
                <LoadingImage
                  src={ad.imgs.length > 0 ? ad.imgs[0] : ""}
                  className="w-[3rem] h-[calc(3rem*16/9)]"
                  width="3rem"
                  height="calc(3rem * 16 / 9)"
                />
                <div className="flex-grow flex flex-col">
                  <div className="flex justify-between">
                    <span className="overflow-clip">{`${displayDate(
                      new Date(ad.startDate)
                    )} - ${displayDate(new Date(ad.endDate))}`}</span>
                    <span>{t(`status.${ad?.status}`)}</span>
                  </div>
                  <div className="overflow-clip flex gap-2">
                    {cats && (
                      <>
                        <span className="flex items-center gap-1">
                          <i className="pi pi-tag product-category-icon"></i>
                          <span>
                            {
                              cats.find((cat) => cat._id === ad.catId)
                                ?.display?.[lang as keyof cat["display"]]
                            }
                          </span>
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
            header={
              <div className="w-full flex justify-between items-center">
                <div>{t("home.yourAds")}</div>
                <Button
                  text
                  className="m-0 !pr-0"
                  icon="pi pi-plus"
                  label={t("home.createAd")}
                  onClick={() => {
                    navigate("/create");
                  }}
                />
              </div>
            }
            rows={10}
            emptyMessage={t("home.noAds")}
          />

          <BottomBar />
        </div>
      </div>
    </>
  );
};

export default Home;
