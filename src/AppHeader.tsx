import * as React from "react";
import {Component} from "react";

interface AppHeaderProps {

}

interface AppHeaderState {

}

class AppHeader extends Component<AppHeaderProps, AppHeaderState> {
    render() {
        return (
            <div className="row">
                <h1 className="mt-3">
                    Go Watch a Movie!
                </h1>
                <hr className="mb-3"/>
            </div>
        )
    }
}

export default AppHeader