/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import Header from "../components/Header/Header";
import SideBar from "../components/Content/SideBar/SideBar";
import Footer from "../components/Footer/Footer"
import Settings from "../../src/pages/Settings/Settings";
import { Route, Switch } from "react-router-dom";
import Favourites from "../pages/Favourites/Favourites";
import Blog from "../pages/Blog/Blog";

export default ({ loginName }) => {
    return (
        <>
            <Header
                loginName={loginName}
            />
            
            <main className="main">
                <div className="container">
                    <div className="main__wrapper">
                        <SideBar/>
                        <div className="content">
                            <Switch>
                                <Route exact path="/blog"><Blog/></Route>
                                <Route exact path="/blog/:id"><Blog/></Route>
                                <Route exact path="/favourites"><Favourites/></Route>
                                <Route exact path="/favourites/:id"><Favourites/></Route>
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