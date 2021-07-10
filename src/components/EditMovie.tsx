import React, {Component, FormEvent} from "react";
import {Movie} from "./OneMovie";
import Input from "./form-components/Input";
import TextArea from "./form-components/TextArea";
import Select from "./form-components/Select";

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
    mpaaOptions: { id: string, value: string }[]
}

class EditMovie extends Component<EditMovieProps, EditMovieState> {
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
        error: null
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
        const data = new FormData(evt.currentTarget)
        const payload = Object.fromEntries(data.entries());
        console.log(payload)

        const requestOptions = {
            method: "POST",
            body: JSON.stringify(payload)
        }

        fetch("http://localhost:4000/v1/admin/editmovie", requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
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
                    <hr/>
                    <form method="post" onSubmit={this.handleSubmit}>
                        <input type="hidden" id="id" value={movie.id} onChange={this.handleChange}/>
                        <Input
                            name={"title"}
                            title={"Title"}
                            type={"text"}
                            value={movie.title}
                            handleChange={this.handleChange}
                        />
                        <Input
                            name={"release_date"}
                            title={"Release Date"}
                            type={"date"}
                            value={movie.release_date}
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
                    </form>
                </React.Fragment>
            )
        }
    }

}

export default EditMovie