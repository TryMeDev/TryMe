import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useProfile from "../../hooks/useProfile";
import LoadingScreen from "../../components/LoadingScreen";
import AppBar from "../../components/AppBar";
import { Card } from "primereact/card";
import LoadingImage from "../../components/LoadingImage";
import { cat, useGetCatsQuery } from "../../slices/catSlice";
import { Button } from "primereact/button";
import { regions } from "../../assets/regions";
import { useAppSelector } from "../../app/store";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { useTranslation } from "react-i18next";
import {
  useCancelAdMutation,
  useDeleteAdMutation,
  usePayAdMutation,
} from "../../slices/adsSlice";
import { addDays, displayDate } from "../../assets/utils";
import { Toast } from "primereact/toast";

const divisions: { [key: string]: string } = Object.values(regions)
  .map((region) => region.divisions)
  .reduce((a, c) => ({ ...a, ...c }), {});

const Detail: React.FC = () => {
  const toast = useRef<Toast>(null);
  const { adId } = useParams();

  const {
    profile,
    isLoading: isProfileLoading,
    isError: isProfileError,
    error: profileError,
  } = useProfile();

  const {
    data: cats,
    isLoading: isCatsLoading,
    isError: isCatsError,
    error: catsError,
  } = useGetCatsQuery({});

  const [imgN, setImgN] = useState<number>(0);
  const [
    deleteAd,
    {
      isError: isDeleteAdError,
      error: deleteAdError,
      isSuccess: isDeleteAdSucess,
    },
  ] = useDeleteAdMutation();
  const [cancelAd, { isError: isCancelAdError, error: cancelAdError }] =
    useCancelAdMutation();
  const [payAd, { isError: isPayError, error: payError }] = usePayAdMutation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const ad =
    adId && profile ? profile.find((ad) => ad._id === adId) : undefined;
  const lang = useAppSelector((state: any) => state.preference.lang);
  const hasStarted = ad?.startDate && new Date(ad?.startDate) <= new Date();
  const moreThan2Days = ad?.startDate && new Date(ad?.startDate) > addDays(2);
  const hasEnded = ad?.endDate && new Date(ad?.endDate) <= new Date();

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

  useEffect(() => {
    if (isDeleteAdError) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: JSON.stringify(deleteAdError),
      });
    }
  }, [isDeleteAdError]);

  useEffect(() => {
    if (isCancelAdError) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: JSON.stringify(cancelAdError),
      });
    }
  }, [isCancelAdError]);

  useEffect(() => {
    if (isPayError) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: JSON.stringify(payError),
      });
    }
  }, [isPayError]);

  useEffect(() => {
    if (isDeleteAdSucess) {
      navigate("/");
    }
  }, [isDeleteAdSucess]);

  return (
    <>
      <LoadingScreen isLoading={isProfileLoading || isCatsLoading} />
      <ConfirmDialog />
      <Toast ref={toast} />
      <div className="h-full w-full flex flex-col">
        <AppBar />
        <div className="w-full flex-grow p-2">
          <Card className="w-full" pt={{ content: { className: "p-0" } }}>
            <div className="flex gap-5 flex-wrap w-full justify-around">
              <LoadingImage
                src={ad?.imgs[imgN]}
                className="w-[20dvw] h-auto cursor-pointer"
                onClick={() => {
                  if (ad?.imgs?.length) {
                    setImgN((prev) => (prev + 1) % ad?.imgs.length);
                  }
                }}
                height="calc(20dvw * 16 / 9)"
                width="20dvw"
              />
              <div className="flex flex-col max-w-full gap-2">
                <div className="text-lg overflow-clip w-full">
                  {t("detail.postingDate", {
                    date: `${displayDate(
                      new Date(ad?.startDate || "")
                    )} - ${displayDate(new Date(ad?.endDate || ""))}`,
                  })}
                </div>

                {ad?.links.map((link, idx) => (
                  <a
                    href={link}
                    className="text-lg overflow-clip w-full"
                    key={idx}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link && `${t("detail.link")}${idx + 1}: ${link}`}
                  </a>
                ))}

                {cats && (
                  <div className="text-lg overflow-clip w-full flex gap-2">
                    <div className="flex items-center gap-1 overflow-clip">
                      <i className="pi pi-tag product-category-icon"></i>
                      <span>
                        {
                          cats.find((cat) => cat._id === ad?.catId)?.display?.[
                            lang as keyof cat["display"]
                          ]
                        }
                      </span>
                    </div>
                  </div>
                )}
                {ad?.tags && ad.tags.length !== 0 && (
                  <div className="text-lg overflow-clip w-full">
                    {t("detail.tags", {
                      tags: ad?.tags.join(", "),
                    })}
                  </div>
                )}

                <div className="text-lg overflow-clip w-full">
                  {t("detail.locations", {
                    locations: ad?.locations
                      .map((locationCode) => divisions[locationCode])
                      .join(", "),
                  })}
                </div>
                {ad?.is18 && (
                  <div className="text-lg overflow-clip w-full">
                    {t("detail.is18")}
                  </div>
                )}

                <div className="text-lg overflow-clip w-full">
                  {t("detail.status") + t(`status.${ad?.status}`)}
                </div>
                {ad?.statusDescription && (
                  <div className="text-lg overflow-clip w-full">
                    {t("detail.statusDescription", {
                      statusDescription: ad?.statusDescription,
                    })}
                  </div>
                )}

                <div className="text-lg overflow-clip w-full">
                  {t("detail.explosure", { explosure: ad?.explosure })}
                </div>

                {moreThan2Days && ad?.status === "unpaid" && (
                  <Button
                    label={t("detail.pay")}
                    onClick={() => {
                      confirmDialog({
                        message: t("detail.confirmPayment"),
                        header: t("detail.confirmPaymentHeader"),
                        icon: "pi pi-exclamation-triangle",
                        defaultFocus: "accept",
                        accept: () => {
                          payAd({ adId: ad?._id });
                        },
                        reject: () => {},
                      });
                    }}
                  />
                )}
                {!hasStarted && ad?.status === "paid" && (
                  <Button
                    label={t("detail.refund")}
                    onClick={() => {
                      confirmDialog({
                        message: t("detail.confirmCancel"),
                        header: t("detail.confirmCancelHeader"),
                        icon: "pi pi-exclamation-triangle",
                        defaultFocus: "accept",
                        accept: () => {
                          cancelAd({ adId: ad?._id });
                        },
                        reject: () => {},
                      });
                    }}
                  />
                )}
                {!hasEnded && ad?.status === "approved" && (
                  <Button
                    label={t("detail.cancel")}
                    onClick={() => {
                      confirmDialog({
                        message: t("detail.confirmCancel"),
                        header: t("detail.confirmCancelHeader"),
                        icon: "pi pi-exclamation-triangle",
                        defaultFocus: "accept",
                        accept: () => {
                          cancelAd({ adId: ad?._id });
                        },
                        reject: () => {},
                      });
                    }}
                  />
                )}
                {(ad?.status === "unpaid" ||
                  ad?.status === "canceled" ||
                  ad?.status === "rejected" ||
                  (ad?.status === "approved" && hasEnded)) && (
                  <Button
                    label={t("detail.delete")}
                    onClick={() => {
                      confirmDialog({
                        message: t("detail.confirmDelete"),
                        header: t("detail.deleteHeader"),
                        icon: "pi pi-exclamation-triangle",
                        defaultFocus: "accept",
                        accept: () => {
                          deleteAd({ adId: ad?._id });
                        },
                        reject: () => {},
                      });
                    }}
                  />
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Detail;
