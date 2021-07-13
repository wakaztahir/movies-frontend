import React from "react";

export interface AppState {
    jwt: string
}

export let defaultAppState: AppState = {
    jwt: ""
}

export const AppContext = React.createContext({
    ...defaultAppState,
    handleJWTChange: (jwt: string) => {
    },
    logout: () => {

    }
})