import React from "react";
import Content from "./Content";
import PromptInstallIfNotStandalone from "../../components/PromptInstallIfNotStandalone";

const Settings: React.FC = () => {
  return (
    <PromptInstallIfNotStandalone>
      <meta name="theme-color" content="#FFFFFF" />
      <div className="h-full w-full">
        <Content />
      </div>
    </PromptInstallIfNotStandalone>
  );
};

export default Settings;
