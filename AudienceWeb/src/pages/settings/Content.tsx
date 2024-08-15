import React from "react";
import TopBar from "./TopBar";
import LangDropdown from "./LangDropdown";
import LocationDropdown from "./LocationDropdown";
import Is18Toggle from "./Is18Toggle";

const Content: React.FC = () => {
  return (
    <>
      <TopBar />
      <div className="w-full min-h-[90%] p-4">
        <LangDropdown />
        <LocationDropdown />
        <Is18Toggle />
      </div>
    </>
  );
};

export default Content;
