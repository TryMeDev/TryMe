import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import i18next from "i18next";

type preferenceState = {
  lang: string;
  location: string;
  is18: boolean;
  isSet: boolean;
  searchingTags: string[];
  currentCat: string;
};

const preferenceInitialState: preferenceState = {
  lang: i18next.resolvedLanguage || "en",
  location: "HK-KLN",
  is18: false,
  isSet: true,
  searchingTags: [],
  currentCat: "",
};

export const preferenceSlice = createSlice({
  name: "preference",
  initialState: preferenceInitialState,
  reducers: {
    getFromStorage: (state: preferenceState, {}) => {
      const lang = localStorage.getItem("lang");
      const location = localStorage.getItem("location");
      const is18 = localStorage.getItem("is18");

      if (location === null || is18 === null || lang === null) {
        state.isSet = false;
      } else {
        state.lang = lang;
        i18next.changeLanguage(lang);
        state.location = location;
        state.is18 = is18 === "true";
      }

      const currentCat = localStorage.getItem("currentCat");
      state.currentCat = currentCat ?? "";
    },
    setLang: (
      state: preferenceState,
      { payload: { lang } }: PayloadAction<{ lang: string }>
    ) => {
      state.lang = lang;
      i18next.changeLanguage(lang);
      state.isSet = true;
    },
    setLocation: (
      state: preferenceState,
      { payload: { location } }: PayloadAction<{ location: string }>
    ) => {
      state.location = location;
      state.isSet = true;
    },
    setIs18: (
      state: preferenceState,
      { payload: { is18 } }: PayloadAction<{ is18: boolean }>
    ) => {
      state.is18 = is18;
      state.isSet = true;
    },
    setCurrentCat: (
      state: preferenceState,
      { payload: { cat } }: PayloadAction<{ cat: string }>
    ) => {
      state.currentCat = cat;
      localStorage.setItem("currentCat", cat);
    },
    saveLocalStorage: (state: preferenceState) => {
      localStorage.setItem("lang", state.lang);
      localStorage.setItem("location", state.location);
      localStorage.setItem("is18", state.is18 ? "true" : "false");
      state.isSet = true;
    },
    setSearchingTags: (
      state: preferenceState,
      { payload: { searchingTags } }: PayloadAction<{ searchingTags: string[] }>
    ) => {
      state.searchingTags = searchingTags;
    },
  },
});

export const {
  setLang,
  getFromStorage,
  setIs18,
  setLocation,
  saveLocalStorage,
  setSearchingTags,
  setCurrentCat,
} = preferenceSlice.actions;
export default preferenceSlice.reducer;
