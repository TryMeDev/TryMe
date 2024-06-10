import { apiSlice } from "./apiSlice";

export type tag = string;

type tagResponse = tag[];

const tagSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTags: builder.query<tagResponse, {}>({
      query: ({}) => ({
        url: "ad/tag/",
        headers: { Authorization: "None" },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetTagsQuery } = tagSlice;
