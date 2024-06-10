import { BlockUI } from "primereact/blockui";
import { ProgressSpinner } from "primereact/progressspinner";
import React from "react";

const LoadingScreen: React.FC<{
  isLoading: boolean;
}> = ({ isLoading }) => {
  return (
    isLoading && (
      <>
        <ProgressSpinner className="absolute m-auto left-0 right-0 top-0 bottom-0" />
        <BlockUI blocked fullScreen containerClassName="" />
      </>
    )
  );
};

export default LoadingScreen;
