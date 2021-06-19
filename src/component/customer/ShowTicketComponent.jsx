import React, { Component } from 'react'

import UserService from '../../service/UserService';

import Card, {
    CardPrimaryContent,
    CardMedia,
    CardActions,
    CardActionButtons,
    CardActionIcons
  } from "@material/react-card";
  
import LogoutIcon from '@material-ui/icons/ExitToApp';
import Button from '@material/react-button';
import TicketService from '../../service/TicketService';

class ShowTicketComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            info: this.props.location.state,
            user: null,
            message: null,
            options: { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' },
            optionsEnd: {hour: 'numeric', minute: 'numeric'}
        } 
        this.buyTicket    = this.buyTicket.bind(this)

    }

    componentDidMount() {
            
        UserService.retrieveUser(this.state.info.id)
        .then(response => this.setState({
            user: response.data
        }))
    }

    buyTicket(){
        
        
        let ticket = {
            id: 0,
            user:  this.state.user,
            showtime: this.state.info.showtime,
            seat: this.state.info.seat,
            price: 10     
        }

        TicketService.update(0, ticket)
            .then(() => this.setState({
                message: 'Ticket bought succesfully!'
            }))

    }

    render() {

        return (
            <div style={{marginLeft: '500px', marginTop: '20px', marginBottom: '20px'}}>
                                      <Button style= {{ position: 'relative', left: '95%'}} >
                <LogoutIcon onClick={() => this.props.history.push("/login")} /> 
            </Button>
            <Card style={{width: '500px', height: '600px'}}>
            {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <CardPrimaryContent>
                    <h1>{this.state.info.showtime.movie.title}</h1>
                    <CardMedia square imageUrl={this.state.info.showtime.movie.imageUrl} />
                    <h1>{this.state.info.showtime.startTime}</h1>
                </CardPrimaryContent>
                
                <h5>[ Start: {new Date(this.state.info.showtime.startTime).toLocaleDateString("en-US",this.state.options)} 
                - {new Date(this.state.info.showtime.endTime).toLocaleDateString("en-US",this.state.optionsEnd).slice(11)}  ] </h5>
                <h5> [  Movie Type:  {this.state.info.showtime.type.type} ] </h5>
                <h5> [  Hall:  {this.state.info.showtime.hall.name}  ]      </h5>
                <h5> [  Row:   {this.state.info.rowNumber} ]                 </h5>
                <h5> [  Seat:  {this.state.info.seat.seatNumber } ]         </h5>
                <h5> [  Price: 10 EUR ]</h5>
                
                <CardActions>
                    <CardActionButtons> 
                    {!this.state.message &&  <Button 
                            color="secondary" 
                            aria-label="upload picture" 
                            component="span" 
                            onClick={() =>  this.buyTicket() }>
                            Confirm
                        </Button>}
                    </CardActionButtons>
                </CardActions>
            </Card>
        </div>
        )
    }
}

export default ShowTicketComponent