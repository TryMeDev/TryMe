import React from "react";
import Content from "./Content";
import PromptInstallIfNotStandalone from "../../components/PromptInstallIfNotStandalone";
import { useThemeColor } from "../../hooks/useThemeColor";

const Settings: React.FC = () => {
  useThemeColor("#FFFFFF");

  return (
    <PromptInstallIfNotStandalone>
      <div className="h-full w-full">
        <Content />
      </div>
    </PromptInstallIfNotStandalone>
  );
};

export default Settings;
