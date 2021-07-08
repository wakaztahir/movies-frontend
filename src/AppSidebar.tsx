import React, {FC} from "react";
import {Link} from "react-router-dom"

const AppSidebar: FC = (props) => {
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
                    <li className="list-group-item">
                        <Link to="/admin">Manage Catalogue</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default AppSidebar