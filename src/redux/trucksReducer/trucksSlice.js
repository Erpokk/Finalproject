import { createSlice } from "@reduxjs/toolkit";
import {
  fetchFilteredTrucks,
  fetchAllTrucks,
  fetchTruckById,
} from "./operations";

const trucksSlice = createSlice({
  name: "trucks",
  initialState: {
    items: [], // Список всех грузовиков
    favorites: [], // Список ID избранных грузовиков
    isLoading: false,
    error: null,
    page: 1,
    totalCount: 0,
  },
  reducers: {
    resetPage: (state) => {
      state.page = 1;
    },
    setPage: (state) => {
      state.page = state.page + 1;
    },
    resetTrucks: (state) => {
      state.items = [];
      state.page = 1;
    },
    toggleFavorite: (state, action) => {
      const truckId = action.payload;

      if (state.favorites.includes(truckId)) {
        // Убираем грузовик из избранного
        state.favorites = state.favorites.filter((id) => id !== truckId);
      } else {
        // Добавляем грузовик в избранное
        state.favorites.push(truckId);
      }
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
        state.items = action.payload.items; // Обновляем список грузовиков
        state.totalCount = action.payload.total; // Сохраняем общее количество
      })
      .addCase(fetchAllTrucks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchTruckById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTruckById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = [action.payload]; // Обновляем массив грузовиков для конкретного ID
      })
      .addCase(fetchTruckById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchFilteredTrucks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFilteredTrucks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.totalCount = action.payload.total; // Общее количество грузовиков после фильтрации
        state.items = [...state.items, ...action.payload.items]; // Добавляем новые элементы
      })
      .addCase(fetchFilteredTrucks.rejected, (state, action) => {
        state.isLoading = false;
        if (action.payload === "Request failed with status code 404") {
          state.error = "No trucks available (404)";
        } else {
          state.error = action.payload || "An error occurred";
        }
      });
  },
});

export const { resetTrucks, setPage, resetPage, toggleFavorite } =
  trucksSlice.actions;
export default trucksSlice.reducer;
