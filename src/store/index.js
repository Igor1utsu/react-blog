import { applyMiddleware, configureStore } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import authReducer from "./slices/auth"
import { bookmarksReducer } from "./reducers/bookmarksReducer"
import { postsReducer } from "./slices/posts"

// инициализируем хранилище
export const store = configureStore({
    reducer: {
        auth: authReducer,          // редьюсер авторизации
        posts: postsReducer,        // редьюсер c постами
        bookmarks: bookmarksReducer,
    }
}, applyMiddleware(thunk))