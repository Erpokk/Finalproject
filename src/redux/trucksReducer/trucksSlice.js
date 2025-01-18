import { createSlice } from "@reduxjs/toolkit";
import { fetchFilteredTrucks, fetchAllTrucks } from "./operations";

const trucksSlice = createSlice({
  name: "trucks",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    page: 1,
    totalCount: 0,
  },
  reducers: {
    setPage: (state) => {
      state.page = state.page + 1;
    },
    resetTrucks: (state) => {
      state.items = []; // Очищаем список машин
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTrucks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllTrucks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload.items;
        state.totalCount = action.payload.total;
      })
      .addCase(fetchAllTrucks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.items;
      })
      .addCase(fetchFilteredTrucks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFilteredTrucks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.totalCount = action.payload.total;
        state.items = [...state.items, ...action.payload.items];
      })
      .addCase(fetchFilteredTrucks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.items;
      });
  },
});

export const { resetTrucks, setPage } = trucksSlice.actions;
export default trucksSlice.reducer;
