import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://trymeserver.onrender.com/",
    mode: "no-cors",
  }),
  reducerPath: "api",
  endpoints: (builder) => ({}),
});

export const {} = apiSlice;
