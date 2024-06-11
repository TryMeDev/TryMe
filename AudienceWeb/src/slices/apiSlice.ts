import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://trymeserver-a52o.onrender.com/",
  }),
  reducerPath: "api",
  endpoints: (builder) => ({}),
});

export const {} = apiSlice;
