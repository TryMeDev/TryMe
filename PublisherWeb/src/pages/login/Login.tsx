import React, { useRef, useEffect } from "react";
import { useLoginMutation } from "../../slices/authSlice";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { Toast } from "primereact/toast";
import LoadingScreen from "../../components/LoadingScreen";
import AppBar from "../../components/AppBar";
import { GOOGLE_CLIENT_ID } from "../../config";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
    <>
      <LoadingScreen isLoading={isLoading} />
      <div className="w-full h-full flex flex-col">
        <AppBar canLogout={false} />
        <Toast ref={toast} />
        <div className="flex flex-col flex-grow justify-center items-center p-4">
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
          <div>{t("login.hint")}</div>
        </div>
      </div>
    </>
  );
};

export default Login;
