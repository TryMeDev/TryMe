import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { apiSlice } from "../slices/apiSlice";
import preferenceReducer, {
  initializeLanguage,
} from "../slices/preferenceSlice";

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  preference: preferenceReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (gDM) => gDM().concat(apiSlice.middleware),
});

store.dispatch(initializeLanguage());

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
