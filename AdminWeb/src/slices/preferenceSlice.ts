import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import i18next from "i18next";
import { createAsyncThunk } from "@reduxjs/toolkit";

type preferenceState = { lang: string };

const preferenceInitialState: preferenceState = {
  lang: i18next.resolvedLanguage || "en",
};

export const initializeLanguage = createAsyncThunk(
  "preference/initializeLanguage",
  async () => {
    await i18next.init(/* your i18next config */);
    return i18next.language;
  }
);

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
  extraReducers: (builder) => {
    builder.addCase(initializeLanguage.fulfilled, (state, action) => {
      state.lang = action.payload;
    });
  },
});

export const { setLang } = preferenceSlice.actions;
export default preferenceSlice.reducer;
