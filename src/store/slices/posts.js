import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { API } from "../../utils/api"

// инициализируем начальное состояние
const initialState = {
    isLoading: false,
    isFavourites: false,
    postList: [],
    error: false
}

// функция загрузки постов
export const loadPosts = createAsyncThunk(
    'posts/load',
    async (_, { getState, rejectWithValue }) => {
        const { posts } = getState()                // вытаскиваваем стейт из хранилища Redux 
        try {
            const dataPosts = await API.loadPosts( posts.isFavourites )     // загружаем посты
            return dataPosts
        } catch (error) {
            console.error('Ошибка получения постов', error)
            return rejectWithValue(Error)                       // возвращаем ошибку
        }
    }
)

// функция обновления постов
export const updatePosts = createAsyncThunk(
    'posts/update',
    async (_, { getState, rejectWithValue }) => {
        const { posts } = getState()                // вытаскиваваем стейт из хранилища Redux
        try {
            const dataPosts = await API.loadPosts( posts.isFavourites )     // загружаем посты
            return dataPosts
        } catch (error) {
            console.error('Ошибка получения постов', error)
            return rejectWithValue(Error)                       // возвращаем ошибку
        }
    }
)

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setFavourites: (state, action) => {
            state.isFavourites = true
        },
        unsetFavourites: (state, action) => {
            state.isFavourites = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loadPosts.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(loadPosts.fulfilled, (state, action) => {
            state.postList = action.payload
            state.isLoading = false
        })
        builder.addCase(loadPosts.rejected, (state, action) => {
            state.error = true
            state.isLoading = false
        })
        builder.addCase(updatePosts.fulfilled, (state, action) => {
            state.postList = action.payload
        })
        builder.addCase(updatePosts.rejected, (state, action) => {
            state.error = action.payload
        })
    }
})

export const { setFavourites, unsetFavourites } = postsSlice.actions            // экспортруем действия из слайса
export const postsReducer = postsSlice.reducer        // экспортируется редьюсер сгенерированный слайсом
export const selectPostsData = (state => state.posts)        // достаем стейт их хранилища и деструктуризируем
