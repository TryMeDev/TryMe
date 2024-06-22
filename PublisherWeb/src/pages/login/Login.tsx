import React, { useRef, useEffect } from "react";
import { useLoginMutation } from "../../slices/authSlice";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { Toast } from "primereact/toast";
import LoadingScreen from "../../components/LoadingScreen";
import { GOOGLE_CLIENT_ID } from "../../config";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AppBar from "../../components/AppBar";

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
      <div className="flex-1 flex flex-col justify-center p-4">
        <Toast ref={toast} />
        <h1 className="text-6xl text-[#80f]">只要有才華</h1>
        <h2 className="text-4xl text-yellow-300">就能有曝光</h2>
        <div className="mt-4">
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
          <div className="text-gray-300">{t("login.hint")}</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
