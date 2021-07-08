import React, {Component} from "react";
import {Link} from "react-router-dom"

interface GenresProps {

}

type Genre = {
    id: number,
    genre_name: string
}

interface GenresState {
    genres: Genre[],
    isLoaded: boolean,
    error: Error | null
}

class Genres extends Component<GenresProps, GenresState> {

    state: GenresState = {
        genres: [],
        isLoaded: false,
        error: null
    }

    componentDidMount() {
        fetch("http://localhost:4000/v1/genres")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    genres: data.genres,
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
        let {genres, isLoaded, error} = this.state

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
                <React.Fragment>
                    <h2>Genres</h2>
                    <div className={"list-group"}>
                        {genres.map(m => (
                            <Link
                                className={"list-group-item list-group-item-action"}
                                key={m.id}
                                to={{
                                    pathname: `/genre/${m.id}`,
                                }}>{m.genre_name}</Link>
                        ))}
                    </div>
                </React.Fragment>
            )
        }
    }

}

export default Genres