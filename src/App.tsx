import React, {Component} from "react";
import AppFooter from "./AppFooter";
import styled from "styled-components";
import {AppContext, AppState, defaultAppState} from "./AppContext";
import AppContent from "./AppContent";
import AppHeader from "./AppHeader";
import {BrowserRouter as Router} from "react-router-dom";


interface AppProps {

}

const Container = styled((props) => <div className={"container"} {...props}/>)`
  max-width: 80%;
  margin: 0 auto;
  font-family: 'Roboto', sans-serif;
`


class App extends Component<AppProps, AppState> {

    state: AppState = defaultAppState

    handleJWTChange = (jwt: string) => {
        this.setState({jwt})
    }

    logout = () => {
        this.setState({jwt: ""})
    }

    render() {
        return (
            <Router>
                <AppContext.Provider value={{
                    jwt: this.state.jwt,
                    handleJWTChange: this.handleJWTChange,
                    logout: this.logout
                }}>
                    <Container>
                        <AppHeader/>
                        <AppContent/>
                        <AppFooter/>
                    </Container>
                </AppContext.Provider>
            </Router>
        )
    }
}

export default App