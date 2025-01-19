import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // Используем localStorage
import { persistReducer, persistStore } from "redux-persist";
import trucksReducer from "./trucksReducer/trucksSlice";
import { filterReducer } from "./filterReducer/filterSlice";

// Конфигурация persist
const persistConfig = {
  key: "root", // Ключ, по которому данные будут сохраняться в localStorage
  storage, // Хранилище (localStorage)
  whitelist: ["trucks"], // Сохраняем только часть `trucks` в хранилище
};

// Объединяем редьюсеры
const rootReducer = combineReducers({
  trucks: trucksReducer,
  filters: filterReducer, // Фильтры не сохраняются
});

// Применяем persist к rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Конфигурируем store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Отключаем предупреждения для redux-persist
    }),
});

// Создаём persistor
export const persistor = persistStore(store);
