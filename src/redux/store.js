import { configureStore } from "@reduxjs/toolkit";
import trucksReducer from "./trucksReducer/trucksSlice";
import { filterReducer } from "./filterReducer/filterSlice";

export const store = configureStore({
  reducer: {
    trucks: trucksReducer,
    filters: filterReducer,
  },
});
