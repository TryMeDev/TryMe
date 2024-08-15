import { apiSlice } from "./apiSlice";

export type tag = { name: string };

type tagsResponse = tag[];

const tagsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTags: builder.query<tagsResponse, { catId: string }>({
      query: ({ catId }) => ({
        url: "ad/tags/",
        method: "POST",
        body: { catId },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetTagsQuery } = tagsSlice;
