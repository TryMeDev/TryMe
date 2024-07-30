import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import i18next from "i18next";

type preferenceState = { lang: string };

const preferenceInitialState: preferenceState = {
  lang: i18next.resolvedLanguage ?? "",
};

export const preferenceSlice = createSlice({
  name: "preference",
  initialState: preferenceInitialState,
  reducers: {
    setLang: (
      state: preferenceState,
      { payload: { lang } }: PayloadAction<{ lang: string }>
    ) => {
      state.lang = lang;
      i18next.changeLanguage(lang);
    },
  },
});

export const { setLang } = preferenceSlice.actions;
export default preferenceSlice.reducer;
