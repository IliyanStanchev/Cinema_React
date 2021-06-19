import React, { Component } from 'react'
import TicketService from '../../service/TicketService';
import { IconButton }       from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';

class TicketsCollectionComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tickets: [],
            message: null,
            optionsDay: { year: 'numeric', month: 'long', day: 'numeric'},
            optionsTime: {hour: 'numeric', minute: 'numeric'}
        }
        this.deleteClicked  = this.deleteClicked.bind(this)
        this.updateClicked  = this.updateClicked.bind(this)
        this.refresh        = this.refresh.bind(this)
    }

    componentDidMount() {
        this.refresh();
    }

    refresh() {
        TicketService.getAll()
            .then(
                response => {
                    this.setState({ tickets: response.data })
                }
            )
    }

    deleteClicked(id) {
        TicketService.delete(id)
            .then(
                response => {
                    this.setState({ message: `Delete of ticket successful` })
                    this.refresh()
                }
            )

    }


    updateClicked(id) {
        console.log('update ' + id)
        this.props.history.push({pathname: `/admin/tickets/edit`, state: id})
    }

    render() {
        console.log('render')
        return (
            <div className="container">
                <h3>All tickets</h3>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Movie</th>
                                <th>Date</th>
                                <th>Start time</th>
                                <th>End time</th>
                                <th>Hall</th>
                                <th>Seat number</th>
                                <th>Price</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.tickets.map(
                                    ticket =>
                                        <tr key={ticket.id}>
                                            <td>{ticket.user.username}</td>
                                            <td>{ticket.showtime.movie.title}</td>
                                            <td>{new Date(ticket.showtime.endTime).toLocaleDateString("en-US",this.state.optionsDay)}</td>
                                            <td>{new Date(ticket.showtime.startTime).toLocaleDateString("en-US",this.state.optionsTime).slice(11)}</td>
                                            <td>{new Date(ticket.showtime.endTime).toLocaleDateString("en-US",this.state.optionsTime).slice(11)}</td>
                                            <td>{ticket.showtime.hall.name}</td>
                                            <td>{ticket.seat.seatNumber}</td>
                                            <td>{ticket.price}</td>
                                            <td> <IconButton 
                                                    color="secondary" 
                                                    aria-label="upload picture" 
                                                    component="span" 
                                                    onClick={() =>  this.deleteClicked(ticket.id) }>
                                                    <DeleteIcon />
                                                </IconButton></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default TicketsCollectionComponent