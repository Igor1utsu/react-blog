import { Route, Switch } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import PhoneAuth from "../pages/PhoneAuth/PhoneAuth";
import Register from "../pages/Register/Register";

export const AuthLayout = () => {
    return (
        <>
            <Switch>
                <Route exact path="/login"><LoginPage/></Route>
                <Route exact path="/phone-auth"><PhoneAuth/></Route>
                <Route exact path="/register"><Register/></Route>
            </Switch>
        </>
    )
}