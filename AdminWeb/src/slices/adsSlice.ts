import { apiSlice } from "./apiSlice";

export type status = "unpaid" | "paid" | "approved" | "rejected" | "canceled";
export type ad = {
  _id: string;
  imgs: string[];
  links: string[];
  startDate: string;
  endDate: string;
  locations: string[];
  catId: string;
  status: status;
  tags: string[];
  explosure: number;
  statusDescription: string;
  is18: boolean;
};

type profileResponse = ad[];
type AdResponse = ad;

const adsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<profileResponse, {}>({
      query: ({}) => ({
        url: "ad/profile/",
      }),
    }),
    getAd: builder.mutation<
      AdResponse,
      {
        search: string;
        earlierThan: string;
        locations: string[];
        statuses: string[];
      }
    >({
      query: ({ search, earlierThan, locations, statuses }) => ({
        url: "ad/adminsearch/",
        method: "POST",
        body: { search, earlierThan, locations, statuses },
      }),
    }),
    updateAd: builder.mutation<
      AdResponse,
      {
        adId: string;
        links: string[];
        catId: string;
        tags: string[];
        status: string;
        statusDescription: string;
        is18: boolean;
      }
    >({
      query: ({
        adId,
        catId,
        tags,
        status,
        statusDescription,
        is18,
        links,
      }) => ({
        url: "ad/",
        method: "PUT",
        body: { adId, catId, tags, status, statusDescription, is18, links },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetProfileQuery, useGetAdMutation, useUpdateAdMutation } =
  adsSlice;
