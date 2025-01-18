import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io";

const fetchAllTrucks = createAsyncThunk(
  "trucks/fetchAll",
  async ({ limit = 4, page = 1 } = {}, thunkAPI) => {
    try {
      // Формируем параметры запроса
      const queryParams = new URLSearchParams({
        limit,
        page,
      }).toString();

      // Делаем запрос к API
      const response = await axios.get(`/campers?${queryParams}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const fetchTruckById = createAsyncThunk(
  "trucks/fetchTruckById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/campers/${id}`);

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const fetchFilteredTrucks = createAsyncThunk(
  "trucks/fetchFiltered",
  async ({ filters = {}, limit = 4, page = 1 } = {}, thunkAPI) => {
    try {
      // Формируем параметры запроса
      const queryParams = new URLSearchParams({
        ...filters,
        limit,
        page,
      }).toString();

      // Делаем запрос к API
      const response = await axios.get(`/campers?${queryParams}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export { fetchFilteredTrucks, fetchAllTrucks, fetchTruckById };
