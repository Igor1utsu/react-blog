import { configureStore } from "@reduxjs/toolkit"
import { authReducer } from "./slices/auth"
import { postsReducer } from "./slices/posts"

// инициализируем хранилище
export const store = configureStore({
    reducer: {
        auth: authReducer,          // редьюсер авторизации
        posts: postsReducer,        // редьюсер c постами
    }
})