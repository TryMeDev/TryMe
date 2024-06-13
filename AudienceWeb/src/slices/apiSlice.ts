import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER_URL } from "../config";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_URL,
  }),
  reducerPath: "api",
  endpoints: (builder) => ({}),
});

export const {} = apiSlice;
