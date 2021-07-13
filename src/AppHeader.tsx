import * as React from "react";
import {FC, useContext} from "react";
import {Link} from "react-router-dom";
import {AppContext} from "./AppContext";

interface AppHeaderProps {

}

const AppHeader: FC<AppHeaderProps> = () => {
    let appState = useContext(AppContext)
    let loginLink;
    if (appState.jwt === "") {
        loginLink = <Link to={"/login"}>Login</Link>
    } else {
        loginLink = <Link to={"/logout"} onClick={appState.logout}>Logout</Link>
    }
    return (
        <div className="row">
            <div className="col mt-3">
                <h1 className="mt-3">
                    Go Watch a Movie!
                </h1>
            </div>
            <div className="col mt-3 text-end">
                {loginLink}
            </div>
            <hr className="mb-3"/>
        </div>
    )
}

export default AppHeader