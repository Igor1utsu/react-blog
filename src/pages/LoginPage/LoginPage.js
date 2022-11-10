/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import Login from "../../components/Login/Login";

export default ({loginName, setLoginName }) => {
    return (
        <div className="login">
            <Login 
                loginName={loginName} 
                setLoginName={setLoginName}
            />
        </div>
    )
}