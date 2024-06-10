import { useState, useEffect } from "react";

export type IndexedDBItem = {
  _id?: string;
  [key: string]: any;
};

export type IndexedDBMethods = {
  initDB: () => Promise<IDBDatabase>;
  retrieveData: () => Promise<IndexedDBItem[]>;
  addData: (newData: IndexedDBItem) => Promise<void>;
  updateData: (_id: string, updatedData: IndexedDBItem) => Promise<void>;
  deleteData: (_id: string) => Promise<void>;
};

const useIndexedDB = (
  databaseName: string,
  storeName: string
): [IndexedDBItem[], Error | null, IndexedDBMethods] => {
  const [data, setData] = useState<IndexedDBItem[]>([]);
  const [error, setError] = useState<Error | null>(null);

  // Initialize the IndexedDB database and object store
  const initDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(databaseName, 1);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result as IDBDatabase;
        db.createObjectStore(storeName, {
          keyPath: "_id",
          autoIncrement: true,
        });
      };

      request.onsuccess = (event) => {
        resolve((event.target as IDBOpenDBRequest).result as IDBDatabase);
      };

      request.onerror = (event) => {
        setError(
          new Error(
            `IndexedDB error: ${
              (event.target as IDBOpenDBRequest).error?.message
            }`
          )
        );
        reject((event.target as IDBOpenDBRequest).error);
      };
    });
  };

  // Retrieve data from the IndexedDB object store
  const retrieveData = (): Promise<IndexedDBItem[]> => {
    return new Promise((resolve, reject) => {
      initDB().then((db) => {
        const transaction = db.transaction([storeName], "readonly");
        const store = transaction.objectStore(storeName);
        store.getAll().onsuccess = (event) => {
          setData((event.target as IDBRequest<IndexedDBItem[]>).result);
          resolve((event.target as IDBRequest<IndexedDBItem[]>).result);
        };
        transaction.onerror = (event) => {
          setError(
            new Error(
              `IndexedDB error: ${(event.target as IDBRequest).error?.message}`
            )
          );
          reject((event.target as IDBRequest).error);
        };
      });
    });
  };

  // Add data to the IndexedDB object store
  const addData = (newData: IndexedDBItem): Promise<void> => {
    return new Promise((resolve, reject) => {
      initDB().then((db) => {
        const transaction = db.transaction([storeName], "readwrite");
        const store = transaction.objectStore(storeName);
        store.add(newData).onsuccess = (event) => {
          setData((prevData) => [...prevData, newData]);
          resolve();
        };
        transaction.onerror = (event) => {
          setError(
            new Error(
              `IndexedDB error: ${(event.target as IDBRequest).error?.message}`
            )
          );
          reject((event.target as IDBRequest).error);
        };
      });
    });
  };

  // Update data in the IndexedDB object store
  const updateData = (
    _id: string,
    updatedData: IndexedDBItem
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      initDB().then((db) => {
        const transaction = db.transaction([storeName], "readwrite");
        const store = transaction.objectStore(storeName);
        store.put({ _id, ...updatedData }).onsuccess = () => {
          setData((prevData) =>
            prevData.map((item) =>
              item._id === _id ? { _id, ...updatedData } : item
            )
          );
          resolve();
        };
        transaction.onerror = (event) => {
          setError(
            new Error(
              `IndexedDB error: ${(event.target as IDBRequest).error?.message}`
            )
          );
          reject((event.target as IDBRequest).error);
        };
      });
    });
  };

  // Delete data from the IndexedDB object store
  const deleteData = (_id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      initDB().then((db) => {
        const transaction = db.transaction([storeName], "readwrite");
        const store = transaction.objectStore(storeName);
        store.delete(_id).onsuccess = () => {
          setData((prevData) => prevData.filter((item) => item._id !== _id));
          resolve();
        };
        transaction.onerror = (event) => {
          setError(
            new Error(
              `IndexedDB error: ${(event.target as IDBRequest).error?.message}`
            )
          );
          reject((event.target as IDBRequest).error);
        };
      });
    });
  };

  return [
    data,
    error,
    { initDB, retrieveData, addData, updateData, deleteData },
  ];
};

export default useIndexedDB;
