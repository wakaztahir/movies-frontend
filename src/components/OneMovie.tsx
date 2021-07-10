import React, {Component} from "react";

interface MovieProps {
    match: {
        params: {
            id: number
        }
    }
}

export interface Movie {
    id: number,
    title: string,
    runtime: number,
    year: number,
    description: string,
    mpaa_rating: string
    rating : string,
    release_date : string,
    genres: Map<number, string> | string[]
}

interface MovieState {
    movie: Movie | null,
    error: Error | null,
    isLoaded: boolean
}

class OneMovie extends Component<MovieProps, MovieState> {

    state: MovieState = {
        movie: null,
        error: null,
        isLoaded: false
    }

    componentDidMount() {
        fetch("http://localhost:4000/v1/movie/" + this.props.match.params.id,)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    movie: data.movie,
                }, () => {
                    this.setState({
                        isLoaded: true
                    })
                })
            })
            .catch((error: Error) => {
                this.setState({
                    error
                })
            })
    }

    render() {

        let {error, isLoaded, movie} = this.state
        if (error != null) {
            return (
                <div>{error.message}</div>
            )
        } else if (!isLoaded) {
            return (
                <p>Loading Movie...</p>
            )
        } else if (movie != null) {

            if (movie.genres) {
                movie.genres = Object.values(movie.genres)
            } else {
                movie.genres = []
            }

            return (
                <React.Fragment>
                    <h2>Movie : {movie.title} {movie.year}</h2>

                    <div className="float-start">
                        <small>
                            Rating : {movie.mpaa_rating}
                        </small>
                    </div>
                    <div className="float-end">
                        {movie.genres.map((genre, index) => (
                            <span className="badge bg-secondary me-1" key={index}>
                                {genre}
                            </span>
                        ))}
                    </div>
                    <div className="clearfix"/>
                    <hr/>

                    <table className="table table-compact table-stripped">
                        <thead/>
                        <tbody>
                        <tr>
                            <td><strong>Title : </strong></td>
                            <td>{movie.title}</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Description : </strong>

                            </td>
                            <td>{movie.description}</td>
                        </tr>
                        <tr>
                            <td><strong>Run Time : </strong></td>
                            <td>{movie.runtime} minutes</td>
                        </tr>
                        </tbody>
                    </table>

                </React.Fragment>
            )
        } else {
            return null
        }
    }
}

export default OneMovie