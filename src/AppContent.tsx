import React, {Component} from "react";
import AppSidebar from "./AppSidebar";
import {Route, Switch} from "react-router-dom";
import Movies from "./components/Movies";
import Admin from "./components/Admin";
import Home from "./components/Home";
import OneMovie from "./components/OneMovie";
import Genres from "./components/Genres";
import OneGenre from "./components/OneGenre";
import EditMovie from "./components/EditMovie";
import Login from "./components/Login"

interface AppContentProps {

}

interface AppContentState {

}

class AppContent extends Component<AppContentProps, AppContentState> {

    state = {}

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-2">

                    </div>
                </div>
                <div className="row">

                    <AppSidebar/>

                    <div className="col-md-10">
                        <Switch>
                            <Route path={"/movies/:id"} component={OneMovie}/>
                            <Route path={"/movies"}>
                                <Movies/>
                            </Route>
                            <Route exact path={"/genre/:id"} component={OneGenre}/>
                            <Route exact path={"/login"} component={Login}/>
                            <Route exact path={"/genres"}>
                                <Genres/>
                            </Route>
                            <Route
                                path={"/admin/movie/:id"}
                                component={EditMovie}
                            />
                            <Route path={"/admin"}>
                                <Admin/>
                            </Route>
                            <Route path={"/"}>
                                <Home/>
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}

export default AppContent