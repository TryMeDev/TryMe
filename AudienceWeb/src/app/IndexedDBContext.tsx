import React, { createContext, useEffect } from "react";
import useIndexedDB, { IndexedDBItem } from "../hooks/useIndexedDB";

interface IndexedDBContextType {
  data: IndexedDBItem[];
  error: Error | null;
  addData: (newData: IndexedDBItem) => Promise<void>;
  updateData: (_id: string, updatedData: IndexedDBItem) => Promise<void>;
  deleteData: (_id: string) => Promise<void>;
}

export const IndexedDBContext = createContext<IndexedDBContextType | null>(
  null
);

export const IndexedDBProvider: React.FC<{
  children?: React.ReactNode;
  databaseName: string;
  storeName: string;
}> = ({ children, databaseName, storeName }) => {
  const [
    data,
    error,
    { initDB, retrieveData, addData, updateData, deleteData },
  ] = useIndexedDB(databaseName, storeName);

  useEffect(() => {
    initDB();
    retrieveData();
  }, [initDB, retrieveData]);

  return (
    <IndexedDBContext.Provider
      value={{
        data,
        error,
        addData,
        updateData,
        deleteData,
      }}
    >
      {children}
    </IndexedDBContext.Provider>
  );
};
