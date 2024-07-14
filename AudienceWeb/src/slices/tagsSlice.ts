import { apiSlice } from "./apiSlice";

export type tag = { name: string };

type tagsResponse = tag[];

const tagsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTags: builder.query<tagsResponse, {}>({
      query: ({}) => ({
        url: "ad/tags/",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetTagsQuery } = tagsSlice;
