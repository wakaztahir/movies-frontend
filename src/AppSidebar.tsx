import React, {FC, useContext} from "react";
import {Link} from "react-router-dom"
import {AppContext} from "./AppContext";

const AppSidebar: FC = (props) => {
    let appState = useContext(AppContext)

    return (
        <div className="col-md-2">
            <nav>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/movies">Movies</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/genres/">Genres</Link>
                    </li>
                    {appState.jwt !== "" && (
                        <React.Fragment>
                            <li className="list-group-item">
                                <Link to="/admin/movie/0">Add Movie</Link>
                            </li>
                            <li className="list-group-item">
                                <Link to="/admin">Manage Catalogue</Link>
                            </li>
                        </React.Fragment>
                    )}
                </ul>
            </nav>
        </div>
    )
}

export default AppSidebar