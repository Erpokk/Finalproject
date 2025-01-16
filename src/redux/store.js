import { configureStore } from "@reduxjs/toolkit";
import trucksReducer from "./trucksReducer/trucksSlice";

export const store = configureStore({
  reducer: {
    trucks: trucksReducer,
  },
});
