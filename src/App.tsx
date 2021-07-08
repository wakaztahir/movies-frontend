import React, {Component} from "react";
import AppFooter from "./AppFooter";
import styled from "styled-components";
import AppContent from "./AppContent";
import AppHeader from "./AppHeader";
import {BrowserRouter as Router} from "react-router-dom";

interface AppProps {

}

interface AppState {

}

const Container = styled((props) => <div className={"container"} {...props}/>)`
  max-width: 80%;
  margin: 0 auto;
  font-family: 'Roboto', sans-serif;
`

class App extends Component<AppProps, AppState> {

    render() {
        return (
            <Router>
                <Container>
                    <AppHeader/>
                    <AppContent/>
                    <AppFooter/>
                </Container>
            </Router>
        )
    }
}

export default App