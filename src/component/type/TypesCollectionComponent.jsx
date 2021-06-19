import React, { Component } from 'react'
import TypeService from '../../service/TypeService';

class TypesCollectionComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            types: [],
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
        TypeService.getAll()
            .then(
                response => {
                    this.setState({ types: response.data })
                }
            )
    }

    deleteClicked(id) {
        TypeService.delete(id)
            .then(
                response => {
                    this.setState({ message: `Delete of type successful` })
                    this.refresh()
                }
            )

    }


    updateClicked(id) {
        console.log('update ' + id)
        this.props.history.push({pathname: `/admin/types/edit`, state: id})
    }

    render() {
        console.log('render')
        return (
            <div className="container">
                <h3>All movie types</h3>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Movie type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.types.map(
                                    type =>
                                        <tr key={type.id}>
                                            <td>{type.type}</td>
                                            <td><button className="btn btn-success" onClick={() => this.updateClicked(type.id)}>Update</button></td>
                                            <td><button className="btn btn-warning" onClick={() => this.deleteClicked(type.id)}>Delete</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <button style={{width: "30%"}} className="btn btn-success" onClick={() => this.updateClicked(0)}>Add new type</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default TypesCollectionComponent