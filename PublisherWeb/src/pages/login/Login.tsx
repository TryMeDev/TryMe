import React, { useRef, useEffect } from "react";
import { useLoginMutation } from "../../slices/authSlice";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { Toast } from "primereact/toast";
import LoadingScreen from "../../components/LoadingScreen";
import { GOOGLE_CLIENT_ID } from "../../config";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AppBar from "../../components/AppBar";
import Slider from "react-slick";

const Login = () => {
  const [login, { isLoading, isError, isSuccess }] = useLoginMutation();
  const toast = useRef<Toast>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (isError) {
      toast.current?.show({
        severity: "error",
        summary: t("login.failedSummary"),
        detail: t("login.failedDetail"),
      });
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess]);

  return (
    <div className="w-full h-full flex flex-col">
      <LoadingScreen isLoading={isLoading} />
      <AppBar canLogout={false} />
      <Toast ref={toast} />

      <div className="flex-grow overflow-auto">
        <Slider className="h-full w-full">
          <div className="h-full w-full !flex flex-col justify-center items-center p-4">
            <h1 className="text-4xl font-semibold text-center">
              {t("login.heading")}
            </h1>
            <h2 className="text-2xl text-center">{t("login.subHeading")}</h2>
            <div className="mt-4 flex flex-col justify-center items-center">
              <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID || ""}>
                <GoogleLogin
                  onSuccess={(credentials) => {
                    login({ credentials });
                  }}
                  onError={() => {
                    toast.current?.show({
                      severity: "error",
                      summary: t("login.failedSummary"),
                      detail: t("login.failedDetail"),
                    });
                  }}
                />
              </GoogleOAuthProvider>
              <div className="text-gray-700 text-sm text-center">
                {t("login.hint")}
              </div>

              <div className="flex gap-1 justify-center">
                <a
                  className="underline text-gray-700 text-sm"
                  href="https://www.termsfeed.com/live/b1a4cb1c-6bed-4ed0-91e8-215086dea7e0"
                >
                  {t("termsOfService")}
                </a>
                <a
                  className="underline text-gray-700 text-sm"
                  href="https://www.termsfeed.com/live/b986215a-08ec-420e-9542-0b3157bf1fb1"
                >
                  {t("privacyPolicy")}
                </a>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Login;
