import React, { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { PrimeReactProvider } from "primereact/api";
import { IndexedDBProvider } from "./IndexedDBContext";
import { useAppDispatch } from "./store";
import { getFromStorage } from "../slices/preferenceSlice";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);
  }, []);

  useEffect(() => {
    dispatch(getFromStorage({}));
  }, []);

  return isStandalone ? (
    <IndexedDBProvider databaseName="tryme" storeName="bookmarks">
      <PrimeReactProvider>
        <RouterProvider router={router} />
      </PrimeReactProvider>
    </IndexedDBProvider>
  ) : (
    <></>
  );
};

export default App;
