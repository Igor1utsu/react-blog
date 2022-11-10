/* eslint-disable import/no-anonymous-default-export */
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export default () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()
        
    const submit = (e) => {
        e.preventDefault()

        const auth = getAuth()
        
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user
            history.push('./blog')
            // ...
        })
        .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            // ..
        })
    }

    return (
        <form className="form" onSubmit={(e) => submit(e)}>
                <input 
                    className="input"
                    type="email" 
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                ></input>
                <input 
                    className="input" 
                    type="password" 
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                ></input>
                <button className="btn" type="submit" value="Submit">Отправить</button>
        </form>
    )
}