import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true'       // инициализируем начальное состояние
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logIn: (state, actions) => {
            state.isLoggedIn = true                         
            localStorage.setItem('isLoggedIn', true)
        },
        logOut: (state, actions) => {
            state.isLoggedIn = false
            localStorage.setItem('isLoggedIn', false)
        }
    }
})

export const { logIn, logOut } = authSlice.actions      // экспортруем действия из слайса
export const authReducer = authSlice.reducer        // экспортируется редьюсер сгенерированный слайсом
export const selectIsLoggedin = (state => state.auth.isLoggedIn)        // достаем состояние(isLoggedIn) из хранилища(state)