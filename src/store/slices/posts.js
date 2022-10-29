import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { API } from "../../utils/api"

// инициализируем начальное состояние
const initialState = {
    isLoading: false,
    isFavourites: false,
    postList: [],
    error: false,
    pendingLike: null       // здесь индикатор ( ID ) поста
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

// функция лайка поста
export const likePost = createAsyncThunk(
    'posts/like',
    async (post, { getState }) => {
        const copyPost = {...post}
        copyPost.liked = !copyPost.liked
        await API.updatePostByID(copyPost)          // отправляем измененный пост на сервер
        const { posts } = getState()                // вытаскиваваем стейт из хранилища Redux
        const dataPosts = await API.loadPosts( posts.isFavourites )     // загружаем посты
        return dataPosts
    }
)

// функция удаления поста
export const deletePost = createAsyncThunk(
    'posts/delete',
    async (postID, { getState }) => {
        await API.deletePost(postID)
        const { posts } = getState()                // вытаскиваваем стейт из хранилища Redux
        const dataPosts = await API.loadPosts( posts.isFavourites )     // загружаем посты
        return dataPosts
    }
)

// функция сохранения поста
export const savePost = createAsyncThunk(
    'posts/save',
    async (dataPost,  { getState }) => {
        await API.updatePostByID(dataPost)            // отправляем измененный пост на сервер
        const { posts } = getState()                // вытаскиваваем стейт из хранилища Redux
        const dataPosts = await API.loadPosts( posts.isFavourites )     // загружаем посты)
        return dataPosts
    }
)

// функция создания поста
export const addPost = createAsyncThunk(
    'posts/add',
    async (newPost,  { getState }) => {
        await API.createPost(newPost)            // отправляем пост на сервер
        const { posts } = getState()                // вытаскиваваем стейт из хранилища Redux
        const dataPosts = await API.loadPosts( posts.isFavourites )     // загружаем посты)
        return dataPosts
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
        builder.addCase(likePost.pending, (state, action) => {
            state.pendingLike = action.meta.arg.id              // достаем из мета-данных ID и заносим в стейт
        })
        builder.addCase(likePost.fulfilled, (state, action) => {
            state.postList = action.payload
            state.pendingLike = null
        })
        builder.addCase(likePost.rejected, (state, action) => {
            state.pendingLike = false
            console.error('Ошибка! Не возможно обработать Лайк')
        })
        builder.addCase(deletePost.fulfilled, (state, action) => {
            state.postList = action.payload
        })
        builder.addCase(deletePost.rejected, (state, action) => {
            console.error('Ошибка! Не возможно удалить пост')
        })
        builder.addCase(savePost.fulfilled, (state, action) => {
            state.postList = action.payload
        })
        builder.addCase(savePost.rejected, (state, action) => {
            console.error('Ошибка! Не возможно сохранить пост')
        })
        builder.addCase(addPost.fulfilled, (state, action) => {
            state.postList = action.payload
        })
        builder.addCase(addPost.rejected, (state, action) => {
            console.error('Ошибка! Не возможно создать пост')
        })
    }
})

export const { setFavourites, unsetFavourites } = postsSlice.actions            // экспортруем действия из слайса
export const postsReducer = postsSlice.reducer        // экспортируется редьюсер сгенерированный слайсом
export const selectPostsData = (state => state.posts)        // достаем стейт их хранилища и деструктуризируем
