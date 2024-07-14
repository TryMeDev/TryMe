import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { PrimeReactProvider } from "primereact/api";
import { IndexedDBProvider } from "./IndexedDBContext";
import { useAppDispatch } from "./store";
import { getFromStorage } from "../slices/preferenceSlice";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFromStorage({}));
  }, []);

  return (
    <IndexedDBProvider databaseName="tryme" storeName="bookmarks">
      <PrimeReactProvider>
        <RouterProvider router={router} />
      </PrimeReactProvider>
    </IndexedDBProvider>
  );
};

export default App;
