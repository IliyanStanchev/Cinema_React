import React, { Component } from 'react'
import ProducerService from '../../service/ProducerService';

const INSTRUCTOR = 'bg.tu-varna'

class ListProducersComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            producers: [],
            message: null
        }
        this.deleteProducerClicked  = this.deleteProducerClicked.bind(this)
        this.updateProducerClicked  = this.updateProducerClicked.bind(this)
        this.refreshProducers       = this.refreshProducers.bind(this)
    }

    componentDidMount() {
        this.refreshProducers();
    }

    refreshProducers() {
        ProducerService.retrieveAllProducers()
            .then(
                response => {
                    //console.log(response);
                    this.setState({ producers: response.data })
                }
            )
    }

    deleteProducerClicked(id) {
        ProducerService.deleteProducer(id)
            .then(
                response => {
                    this.setState({ message: `Delete of producer successful` })
                    this.refreshProducers()
                }
            )

    }


    updateProducerClicked(id) {
        console.log('update ' + id)
        this.props.history.push({pathname: `/admin/producers/edit`, state: id})
    }

    render() {
        console.log('render')
        return (
            <div className="container">
                <h3>All Producers</h3>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.producers.map(
                                    producer =>
                                        <tr key={producer.id}>
                                            <td>{producer.firstName}</td>
                                            <td>{producer.lastName}</td>
                                            <td><button className="btn btn-success" onClick={() => this.updateProducerClicked(producer.id)}>Update</button></td>
                                            <td><button className="btn btn-warning" onClick={() => this.deleteProducerClicked(producer.id)}>Delete</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <button style={{width: "30%"}} className="btn btn-success" onClick={() => this.updateProducerClicked(0)}>Add new producer</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListProducersComponent