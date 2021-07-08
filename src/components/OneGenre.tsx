import React, {Component, Fragment} from "react";
import {Link} from "react-router-dom"
import {Movie} from "./OneMovie";

interface OneGenreProps {
    match: {
        params: {
            id: number,
        }
    },
    location: {
        genreName: string
    }
}

interface OneGenreState {
    movies: Movie[],
    isLoaded: boolean,
    error: null | Error,
    genreName: string
}

class OneGenre extends Component<OneGenreProps, OneGenreState> {

    state: OneGenreState = {
        movies: [],
        isLoaded: false,
        error: null,
        genreName: ""
    }

    componentDidMount() {
        fetch("http://localhost:4000/v1/movies/" + this.props.match.params.id)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    movies: data.movies || [],
                    genreName: this.props.location.genreName
                }, () => {
                    this.setState({
                        isLoaded: true,
                    })
                })
            }).catch((error: Error) => {
            this.setState({
                error
            })
        })
    }

    render() {
        const {movies, isLoaded, error} = this.state
        if (error != null) {
            return (
                <div>
                    Error : {error.message}
                </div>
            )
        } else if (!isLoaded) {
            return <p>Loading...</p>
        } else {
            return (
                <Fragment>
                    <h2>Genre : {this.state.genreName}</h2>
                    <div className={"list-group"}>
                        {movies.map((movie: Movie) =>
                            <Link
                                className={"list-group-item list-group-item-action"}
                                key={movie.id}
                                to={`/movies/${movie.id}`}>
                                {movie.title}
                            </Link>
                        )}
                    </div>
                </Fragment>

            )
        }
    }
}

export default OneGenre