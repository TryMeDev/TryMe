import { apiSlice } from "./apiSlice";

export type display = {
  "zh-TW": string;
  en: string;
  [key: string]: string;
};

export const initDisplay: display = {
  "zh-TW": "",
  en: "",
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
    createCat: builder.mutation<cat, { display: display }>({
      query: ({ display }) => ({
        url: "cat/",
        method: "POST",
        body: { display },
      }),
      async onQueryStarted({}, { dispatch, queryFulfilled }) {
        try {
          const { data: newCat } = await queryFulfilled;
          const postResult = dispatch(
            catSlice.util.updateQueryData("getCats", {}, (draft) => {
              draft.push(newCat);
            })
          );
        } catch {}
      },
    }),
    updateCat: builder.mutation<cat, { catId: string; display: display }>({
      query: ({ catId, display }) => ({
        url: "cat/",
        method: "PUT",
        body: { catId, display },
      }),
      async onQueryStarted({ catId, display }, { dispatch, queryFulfilled }) {
        const result = dispatch(
          catSlice.util.updateQueryData("getCats", {}, (draft: catResponse) => {
            return [
              ...draft.filter((cat) => cat._id !== catId),
              { display, _id: catId },
            ];
          })
        );
        try {
          await queryFulfilled;
        } catch {
          result.undo();
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetCatsQuery, useCreateCatMutation, useUpdateCatMutation } =
  catSlice;
