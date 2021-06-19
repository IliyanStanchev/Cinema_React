import React, { Component } from 'react'
import GenreService from '../../service/GenreService';

class GenreCollectionComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            genres: [],
            message: null
        }
        this.deleteClicked  = this.deleteClicked.bind(this)
        this.updateClicked  = this.updateClicked.bind(this)
        this.refresh        = this.refresh.bind(this)
    }

    componentDidMount() {
        this.refresh();
    }

    refresh() {
        GenreService.getAll()
            .then(
                response => {
                    this.setState({ genres: response.data })
                }
            )
    }

    deleteClicked(id) {
        GenreService.delete(id)
            .then(
                response => {
                    this.setState({ message: `Delete of genre successful` })
                    this.refresh()
                }
            )

    }


    updateClicked(id) {
        console.log('update ' + id)
        this.props.history.push({pathname: `/admin/genres/edit`, state: id})
    }

    render() {
        console.log('render')
        return (
            <div className="container">
                <h3>All movie genres</h3>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Movie genre</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.genres.map(
                                    genre =>
                                        <tr key={genre.id}>
                                            <td>{genre.name}</td>
                                            <td><button className="btn btn-success" onClick={() => this.updateClicked(genre.id)}>Update</button></td>
                                            <td><button className="btn btn-warning" onClick={() => this.deleteClicked(genre.id)}>Delete</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <button style={{width: "30%"}} className="btn btn-success" onClick={() => this.updateClicked(0)}>Add new genre</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default GenreCollectionComponent