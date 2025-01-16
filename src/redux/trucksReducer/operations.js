import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io";

const fetchTrucks = createAsyncThunk("trucks/fetchAll", async (_, thunkAPI) => {
  try {
    const response = await axios.get("/campers");
    return response.data.items;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export { fetchTrucks };
