import React, {Component, FormEvent} from "react";
import Alert from "./ui-components/Alert.js";
import Input from "./form-components/Input";
import {AppContext} from "../AppContext";

interface LoginProps {

}

interface LoginState {
    email: string,
    password: string,
    error: Error | null,
    errors: string[],
    alert: {
        type: string,
        message: string
    }
}

class Login extends Component<LoginProps, LoginState> {

    static contextType = AppContext

    state: LoginState = {
        email: "",
        password: "",
        error: null,
        errors: [],
        alert: {
            type: "d-none",
            message: ""
        }
    }

    handleChange = (evt: { target: { value: any; name: any; }; }) => {
        let value = evt.target.value;
        let name = evt.target.name;
        this.setState((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault()
        let errors = [];
        if (this.state.email === "") {
            errors.push("email")
        }
        if (this.state.password === "") {
            errors.push("password")
        }

        this.setState({errors})

        if (errors.length > 0) {
            return false;
        }

        const data = new FormData(evt.currentTarget);

        const payload = Object.fromEntries(data.entries());

        const requestOptions = {
            method: "POST",
            body: JSON.stringify(payload)
        }

        fetch("http://localhost:4000/v1/signin", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    this.setState({
                        alert: {
                            type: "alert-danger",
                            message: data.error.message
                        }
                    })
                } else {
                    console.log(data)
                    this.context.handleJWTChange(data.response)
                }
            })

    }

    hasError(key: string) {
        return this.state.errors.indexOf(key) !== -1
    }

    render() {
        return (
            <React.Fragment>
                <h2>Login</h2>
                <hr/>
                <Alert alertType={this.state.alert.type} alertMessage={this.state.alert.message}/>
                <form onSubmit={this.handleSubmit} className="pt-3">
                    <Input
                        name={"email"}
                        title={"Email"}
                        type={"email"}
                        value={this.state.email}
                        handleChange={this.handleChange}
                        className={this.hasError("email") ? "is-invalid" : ""}
                        errorDiv={this.hasError("email") ? "text-danger" : "d-none"}
                        errorMsg={"Please enter a valid email address"}
                    />
                    <Input
                        name={"password"}
                        title={"Password"}
                        type={"password"}
                        value={this.state.password}
                        handleChange={this.handleChange}
                        className={this.hasError("password") ? "is-invalid" : ""}
                        errorDiv={this.hasError("password") ? "text-danger" : "d-none"}
                        errorMsg={"Please enter a valid password"}
                    />

                    <button className="btn btn-primary">Login</button>
                </form>
            </React.Fragment>
        )
    }
}

export default Login