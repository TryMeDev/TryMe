import React, { ReactNode } from "react";
import PromptInstallPWAPage from "./PromptInstallPWAPage";
import useIsStandalone from "../hooks/useIsStandalone";

const PromptInstallIfNotStandalone: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const isStandalone = useIsStandalone();

  return isStandalone === "unknown" ? (
    <></>
  ) : isStandalone ? (
    children
  ) : (
    // children
    <PromptInstallPWAPage />
  );
};

export default PromptInstallIfNotStandalone;
