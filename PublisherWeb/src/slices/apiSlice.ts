import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://trymeserver.onrender.com/",
    prepareHeaders: (headers, { endpoint }) => {
      if (!headers.get("Authorization")) {
        const token = localStorage.getItem("token");
        if (token) {
          headers.set("Authorization", token);
        }
      }
    },
  }),
  reducerPath: "api",
  endpoints: (builder) => ({}),
});

export const {} = apiSlice;
