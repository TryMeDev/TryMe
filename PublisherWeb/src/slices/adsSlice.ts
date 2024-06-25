import { File2 } from "../pages/create/UploadImages";
import { apiSlice } from "./apiSlice";

export type status = "unpaid" | "paid" | "approved" | "rejected" | "canceled";

export type ad = {
  _id: string;
  imgs: string[];
  links: string[];
  startDate: string;
  endDate: string;
  locations: string[];
  catIds: string[];
  status: status;
  tags: string[];
  explosure: number;
  statusDescription: string;
  is18: boolean;
};

type profileResponse = ad[];

const adsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<profileResponse, {}>({
      query: ({}) => ({
        url: "ad/profile/",
      }),
    }),
    createAd: builder.mutation<
      {},
      {
        imgs: File2[];
        links: string[];
        startDate: Date;
        endDate: Date;
        locations: string[];
      }
    >({
      query: ({ imgs, links, startDate, endDate, locations }) => {
        const formData = new FormData();
        for (const img of imgs) {
          formData.append("images", img);
        }
        formData.append(
          "data",
          JSON.stringify({ links, startDate, endDate, locations })
        );

        return {
          url: "ad/",
          method: "POST",
          body: formData,
        };
      },
      transformResponse: ({ url }) => {
        window.location = url;
        return url;
      },
    }),
    deleteAd: builder.mutation<{}, { adId: string }>({
      query: ({ adId }) => ({
        url: "ad/",
        method: "DELETE",
        body: { adId },
      }),
      async onQueryStarted({ adId }, { dispatch, queryFulfilled }) {
        const result = dispatch(
          adsSlice.util.updateQueryData("getProfile", {}, (draft) => {
            return draft.filter((ad) => ad._id !== adId);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          result.undo();
        }
      },
    }),
    cancelAd: builder.mutation<{}, { adId: string }>({
      query: ({ adId }) => ({
        url: "ad/cancel/",
        method: "PUT",
        body: { adId },
      }),
      async onQueryStarted({ adId }, { dispatch, queryFulfilled }) {
        const result = dispatch(
          adsSlice.util.updateQueryData("getProfile", {}, (draft) => {
            const oldAd = draft.find((ad) => ad._id === adId);
            if (oldAd) {
              return [
                ...draft.filter((ad) => ad._id !== adId),
                { ...oldAd, status: "canceled" },
              ];
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          result.undo();
        }
      },
    }),
    payAd: builder.mutation<{}, { adId: string }>({
      query: ({ adId }) => ({
        url: "ad/pay/",
        method: "PUT",
        body: { adId },
      }),
      transformResponse: ({ url }) => {
        window.location = url;
        return url;
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProfileQuery,
  useCreateAdMutation,
  useDeleteAdMutation,
  useCancelAdMutation,
  usePayAdMutation,
} = adsSlice;
