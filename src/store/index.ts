import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { HistoryPushSliceReducer } from "./historyPushSlice";
import { itemListReducer } from "./itemListSlice";

export const store = configureStore({
  reducer: {
    itemList: itemListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
