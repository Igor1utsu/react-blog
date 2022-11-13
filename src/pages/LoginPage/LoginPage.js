/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import Login from "../../components/Login/Login";
import LoginForm from "../../components/LoginForm/LoginForm";

export default () => {
    return (
        <div className="login">
            <LoginForm/>
        </div>
        // <div className="login">
        //     <Login 
        //     />
        // </div>
    )
}