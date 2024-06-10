import { apiSlice } from "./apiSlice";

export type ad = {
  _id: string;
  imgs: string[];
  links: string[];
  catIds: string[];
  tags: string[];
  is18: boolean;
};

const adsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getById: builder.query<ad, { _id: string }>({
      query: ({ _id }) => ({
        url: "ad/getbyid/",
        method: "POST",
        body: { _id },
      }),
    }),
    getIds: builder.query<
      string[],
      {
        excludedCatIds: string[];
        tags: string[];
        locations: string[];
        is18: boolean;
      }
    >({
      query: ({ excludedCatIds, tags, locations, is18 }) => ({
        url: "ad/browse/",
        method: "POST",
        body: { excludedCatIds, tags, locations, is18 },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetByIdQuery, useGetIdsQuery, useLazyGetByIdQuery } =
  adsSlice;
