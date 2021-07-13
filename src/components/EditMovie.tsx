import React, {Component, FormEvent} from "react";
import {Movie} from "./OneMovie";
import Input from "./form-components/Input";
import TextArea from "./form-components/TextArea";
import Select from "./form-components/Select";
import Alert from "./ui-components/Alert.js";
import {Link} from "react-router-dom"
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {AppContext} from "../AppContext";

interface EditMovieProps {
    match: {
        params: {
            id: number
        }
    }
}

interface EditMovieState {
    movie: Movie,
    isLoaded: boolean,
    error: Error | null,
    mpaaOptions: { id: string, value: string }[],
    errors: string[],
    alert: {
        type: string,
        message: string
    }
}

class EditMovie extends Component<EditMovieProps, EditMovieState> {

    static contextType = AppContext

    state: EditMovieState = {
        movie: {
            id: 0,
            title: "",
            runtime: 0,
            year: 0,
            description: "",
            mpaa_rating: "",
            release_date: "",
            rating: "",
            genres: [],
        },
        mpaaOptions: [
            {id: "G", value: "G"},
            {id: "PG", value: "PG"},
            {id: "PG13", value: "PG13"},
            {id: "R", value: "R"},
            {id: "NC17", value: "NC17"},
        ],
        isLoaded: false,
        error: null,
        errors: [],
        alert: {
            type: "d-none",
            message: ""
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        if (id > 0) {
            fetch("http://localhost:4000/v1/movie/" + id)
                .then(response => response.json())
                .then((data) => {
                    const releaseDate = new Date(data.movie.release_date);
                    this.setState({
                        movie: {
                            id,
                            title: data.movie.title,
                            release_date: releaseDate.toISOString().split("T")[0],
                            runtime: data.movie.runtime,
                            mpaa_rating: data.movie.mpaa_rating,
                            rating: data.movie.rating,
                            description: data.movie.description,
                            year: data.movie.year,
                            genres: data.movie.generes
                        },
                        isLoaded: true
                    })
                }).catch((error: Error) => {
                this.setState({
                    error
                })
            })
        } else {
            this.setState({
                isLoaded: true
            })
        }
    }

    handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        let errors = [];
        //Validating Input
        if (this.state.movie.title === "") {
            errors.push("title")
        }

        this.setState({
            errors
        })

        if (errors.length > 0) {
            return false;
        }

        const data = new FormData(evt.currentTarget)
        const payload = Object.fromEntries(data.entries());

        const myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json")
        myHeaders.append("Authorization", "Bearer " + this.context.jwt)

        const requestOptions = {
            method: "POST",
            body: JSON.stringify(payload),
            headers: myHeaders
        }

        fetch("http://localhost:4000/v1/admin/editmovie", requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    this.setState({
                        alert: {
                            type: "alert-danger",
                            message: data.error.message
                        }
                    })
                } else {
                    this.setState({
                        alert: {
                            type: "alert-success",
                            message: "Changes Saved"
                        }
                    })
                }
            }).catch((error) => {

        })
    }

    hasError(key: string) {
        return this.state.errors.indexOf(key) !== -1
    }

    handleChange = (evt: { target: { value: any; name: any; }; }) => {
        let value = evt.target.value;
        let name = evt.target.name;
        this.setState((prevState) => ({
            movie: {
                ...prevState.movie,
                [name]:
                value
            }
        }))
    }

    confirmDelete = () => {
        confirmAlert({
            title: 'Delete Movie',
            message: 'Are you sure ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        let myHeaders = new Headers()
                        myHeaders.append("Content-Type", "application/json")
                        myHeaders.append("Authorization", "Bearer "+this.context.jwt)
                        let requestOptions = {
                            method : "GET",
                            headers: myHeaders
                        }
                        fetch("http://localhost:4000/v1/admin/deletemovie/" + this.state.movie.id, requestOptions)
                            .then((response) => response.json())
                            .then(data => {
                                if (data.error) {
                                    this.setState({
                                        alert: {
                                            type: "alert-danger",
                                            message: data.error.message
                                        }
                                    })
                                } else {
                                    this.setState({
                                        alert: {
                                            type: "alert-success",
                                            message: "Movie deleted"
                                        }
                                    })
                                }
                            })
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                    }
                }
            ]
        });
    }

    render() {
        let {movie, isLoaded, error} = this.state;

        if (error != null) {
            return <div>{error.message}</div>
        } else if (!isLoaded) {
            return <div>Loading...</div>
        } else {
            return (
                <React.Fragment>
                    <h2>Add / Edit Movie</h2>
                    <Alert alertType={this.state.alert.type} alertMessage={this.state.alert.message}/>
                    <hr/>
                    <form method="post" onSubmit={this.handleSubmit}>
                        <input type="hidden" name="id" value={movie.id} onChange={this.handleChange}/>
                        <Input
                            name={"title"}
                            title={"Title"}
                            className={this.hasError("title") ? "is-invalid" : ""}
                            type={"text"}
                            errorDiv={this.hasError("title") ? "text-danger" : "d-none"}
                            value={movie.title}
                            handleChange={this.handleChange}
                            errorMsg={"Please enter a title"}
                        />
                        <Input
                            name={"release_date"}
                            title={"Release Date"}
                            type={"date"}
                            value={movie.release_date}
                            handleChange={this.handleChange}
                        />
                        <Input
                            name={"runtime"}
                            title={"Runtime"}
                            type={"text"}
                            value={movie.runtime.toString()}
                            handleChange={this.handleChange}
                        />
                        <Select
                            name={"mpaa_rating"}
                            title={"MPAA Rating"}
                            value={movie.mpaa_rating}
                            options={this.state.mpaaOptions}
                            handleChange={this.handleChange}
                            placeholder={"Choose..."}
                        />
                        <Input
                            name={"rating"}
                            title={"Rating"}
                            type={"text"}
                            value={movie.rating}
                            handleChange={this.handleChange}
                        />
                        <TextArea
                            name={"description"}
                            title={"Description"}
                            value={movie.description}
                            handleChange={this.handleChange}
                        />
                        <button className="btn btn-primary float-end">Save</button>
                        <Link to={"/admin"} className={"btn btn-warning ms-1"}>
                            Cancel
                        </Link>
                        {
                            this.state.movie.id > 0 && (
                                <button onClick={() => this.confirmDelete()}
                                   className={"btn btn-danger ms-1"}
                                >Delete</button>
                            )
                        }
                    </form>
                </React.Fragment>
            )
        }
    }
}

export default EditMovie