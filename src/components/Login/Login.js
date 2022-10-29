import React, { useRef } from "react"
import { useState } from "react"
import "./Login.scss"
import { ReactComponent as Logo } from "../../assets/svg/logo.svg"
import { useDispatch } from "react-redux"
import { logIn } from "../../store/slices/auth"


// eslint-disable-next-line import/no-anonymous-default-export
export default ({loginName, setLoginName }) => {
    let [name, setName] = useState(loginName)
    const dispatch = useDispatch()

    // Создаем ключ: Логин, Пароль
    const loginRef = useRef()
    const passwordRef = useRef()

    const submit = (e) => {
        e.preventDefault()
        // Считываем значение ключей из imput
        const userData = {
            login: loginRef.current.value,
            password: passwordRef.current.value
        }
        
        setLoginName(userData.login)            // заносим login в стейт
        dispatch(logIn())                       // вызываем функцию авторизации из хранилища Redux
        localStorage.setItem('login', name)     // заносим login в локальное хранилище
        window.location.href = '/blog'          // переходим на главную страницу
    }


    return (
        <div className="login__window">
            <form className="form" onSubmit={submit}>
                <div className="logo">
                    <Logo className="logo__icon"/>
                </div>
                <h3 className="login__title">Вход</h3>
                <input 
                    className="input" 
                    type="text" ref={loginRef} 
                    value={name} 
                    onChange={event => setName(event.target.value)} 
                    placeholder="name"
                    required
                ></input>
                <input 
                    className="input" 
                    type="password" 
                    ref={passwordRef} 
                    placeholder="password"
                    required
                ></input>
                <button className="btn" type="submit" value="Submit">login</button>
            </form>
        </div>
    )
}