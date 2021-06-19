import React, { Component } from 'react'
import HallService from '../../service/HallService';

class ListHallsComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            halls: [],
            message: null,
        }
        this.deleteHallClicked  = this.deleteHallClicked.bind(this)
        this.updateHallClicked  = this.updateHallClicked.bind(this)
        this.refreshHalls       = this.refreshHalls.bind(this)
    }

    componentDidMount() {
        this.refreshHalls();
    }

    refreshHalls() {
       HallService.getAll()
            .then(
                response => {
                    this.setState({ halls: response.data })
                }
            )
    }

    deleteHallClicked(id) {
        HallService.delete(id)
            .then(
                response => {
                    this.setState({ message: `Delete of hall successful` })
                    this.refreshHalls()
                }
            )
    }


    updateHallClicked(id) {
        this.props.history.push({pathname: `/admin/halls/edit`, state: id})
    }

    render() {
        console.log('render')
        return ( 
            <div className="container">
                <h3>All Halls</h3>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Hall Name</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.halls.map(
                                    hall =>
                                        <tr key={hall.id}>
                                            <td>{hall.name}</td> 
                                            <td><button className="btn btn-success" onClick={() => this.updateHallClicked(hall.id)}>Update</button></td>
                                            <td><button className="btn btn-warning" onClick={() => this.deleteHallClicked(hall.id)}>Delete</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <button style={{width: "30%"}} className="btn btn-success" onClick={() => this.updateHallClicked(0)}>Add new hall</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListHallsComponent