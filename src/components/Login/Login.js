import React from "react"
import { useState } from "react"
import "./Login.scss"
import { ReactComponent as Logo } from "../../assets/svg/logo.svg"
import { useDispatch } from "react-redux"
import { logIn } from "../../store/slices/auth"
import { Link, useHistory } from "react-router-dom"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"


// eslint-disable-next-line import/no-anonymous-default-export
export default ({loginName, setLoginName }) => {
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()
    
    const submit = (e) => {
        e.preventDefault()

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                dispatch(logIn())                       // вызываем функцию авторизации из хранилища Redux
                history.push('./blog')                  // переходим на главную страницу
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }


    return (
        <>
            <form className="form" onSubmit={submit}>
                <div className="logo">
                    <Logo className="logo__icon"/>
                </div>
                <input 
                    className="input"
                    value={email}
                    onChange={event => setEmail(event.target.value)} 
                    placeholder="email"
                    required
                ></input>
                <input 
                    className="input" 
                    type="password" 
                    value={password}
                    onChange={event => setPassword(event.target.value)} 
                    placeholder="password"
                    required
                ></input>
                <button className="btn" type="submit" value="Submit">Войти</button>
                <Link to="./register" className="login__register">Регистрация</Link>
            </form>
        </>
    )
}