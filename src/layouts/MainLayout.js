/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import Header from "../components/Header/Header";
import SideBar from "../components/Content/SideBar/SideBar";
import Footer from "../components/Footer/Footer"
import Settings from "../../src/pages/Settings/Settings";
import { Route, Switch } from "react-router-dom";
import Favourites from "../pages/Favourites/Favourites";
import Blog from "../pages/Blog/Blog";

export default ({ loginName, setIsLoggedIn, darkTheme, setDarkTheme, popup, setPopup }) => {
    return (
        <>
            <Header
                loginName={loginName}
                setIsLoggedIn={setIsLoggedIn}
                popup={popup}
                setPopup={setPopup}
                darkTheme={darkTheme}
                setDarkTheme={setDarkTheme}
            />
            
            <main className="main">
                <div className="container">
                    <div className="main__wrapper">
                        <SideBar
                            popup={popup}
                        />
                        <div className="content">
                            <Switch>
                                <Route exact path="/blog"><Blog darkTheme={darkTheme}/></Route>
                                <Route exact path="/blog/:id"><Blog darkTheme={darkTheme}/></Route>
                                <Route exact path="/favourites"><Favourites darkTheme={darkTheme}/></Route>
                                <Route exact path="/favourites/:id"><Favourites darkTheme={darkTheme}/></Route>
                                <Route exact path="/settings"><Settings/></Route>
                            </Switch>
                        </div>
                    </div>
                </div>
            </main>

            <Footer/>
        </>
    )
}