/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import Header from "../../components/Header/Header";
import Login from "../../components/Login/Login";

export default ({loginName, setLoginName, setIsLoggedIn}) => {
    return (
        <div className="login">
            <Header/>
            <Login 
                loginName={loginName} 
                setLoginName={setLoginName}
                setIsLoggedIn={setIsLoggedIn}
            />
        </div>
    )
}