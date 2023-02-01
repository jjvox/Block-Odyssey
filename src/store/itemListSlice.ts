import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getItemList, ItemType } from "../api/axios";

export const fetchItemList = createAsyncThunk(
  "itemList",
  async (page: number) => {
    const response = await getItemList(page);
    return response;
  }
);

export interface ItemListType {
  itemList: ItemType[];
}

const initialState = {
  itemList: [],
} as ItemListType;

const itemListSlice = createSlice({
  name: "itemList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchItemList.fulfilled, (state, action) => {
      state.itemList = action.payload;
    });
  },
});

export const itemListReducer = itemListSlice.reducer;
