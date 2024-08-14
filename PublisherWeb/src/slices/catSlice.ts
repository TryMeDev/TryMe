import { apiSlice } from "./apiSlice";

export type display = {
  "zh-TW": string;
  en: string;
};

export type cat = {
  _id: string;
  display: display;
};

type catResponse = cat[];

const catSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCats: builder.query<catResponse, {}>({
      query: ({}) => ({
        url: "cat/",
        headers: { Authorization: "None" },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetCatsQuery } = catSlice;
