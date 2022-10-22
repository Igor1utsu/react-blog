import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";

// инициализируем хранилище
export const store = configureStore({
    reducer: {
        auth: authReducer,          // редьюсер авторизации
    }
})