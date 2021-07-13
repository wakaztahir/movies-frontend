import React, {Component, Fragment} from "react";
import {Link} from "react-router-dom"

interface MoviesProps {
}

interface MoviesState {
    movies: Movie[],
    isLoaded: boolean,
    error: null | Error
}

type Movie = {
    id: number,
    title: string,
    runtime: number
}

class Admin extends Component<MoviesProps, MoviesState> {

    state: MoviesState = {
        movies: [],
        isLoaded: false,
        error: null
    };

    componentDidMount() {
        fetch("http://localhost:4000/v1/movies")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    movies: data.movies,
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
                    <h2>Choose a movie</h2>
                    <div className={"list-group"}>
                        {movies.map((movie: Movie) =>
                            <Link
                                className={"list-group-item list-group-item-action"}
                                key={movie.id}
                                to={`/admin/movie/${movie.id}`}>
                                {movie.title}
                            </Link>
                        )}
                    </div>
                </Fragment>

            )
        }
    }
}

export default Admin