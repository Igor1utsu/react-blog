import React, { useRef } from "react"
import { useState } from "react"
import "./Login.scss"
import { ReactComponent as Logo } from "../../assets/svg/logo.svg"


// eslint-disable-next-line import/no-anonymous-default-export
export default ({loginName, setLoginName, setIsLoggedIn}) => {
    let [name, setName] = useState(loginName)

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
        
        // Устанавливаем Логин, статус и стек
        setLoginName(userData.login)
        setIsLoggedIn(true)
        localStorage.setItem('isLoggedIn', true)
        localStorage.setItem('login', name)
        
        window.location.href = '/blog'
    }


    return (
        <div className="login__window">
            <form className="form" onSubmit={submit}>
                <div className="logo">
                    <Logo className="logo__icon" fill='#1E90FF'/>
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