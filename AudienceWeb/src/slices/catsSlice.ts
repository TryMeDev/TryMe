import { apiSlice } from "./apiSlice";

export type display = {
  "zh-TW": string;
  en: string;
};
export type cat = {
  _id: string;
  display: display;
};

type catsResponse = cat[];

const catsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCats: builder.query<catsResponse, {}>({
      query: ({}) => ({
        url: "cat/",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetCatsQuery } = catsSlice;
