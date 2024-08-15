import { apiSlice } from "./apiSlice";

export type tag = string;

type tagResponse = tag[];

const tagSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTags: builder.query<tagResponse, { catId: string }>({
      query: ({ catId }) => ({
        url: "ad/tag/",
        method: "POST",
        body: { catId },
        headers: { Authorization: "None" },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetTagsQuery } = tagSlice;
