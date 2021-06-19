import React, { Component } from 'react'
import ShowtimeService from '../../service/ShowtimeService';

import '@material/react-card/index.scss';
import '@material/react-button/index.scss';
import '@material/react-material-icon/index.scss';
import { IconButton }       from '@material-ui/core';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import * as moment from 'moment'
import Card, {
    CardPrimaryContent,
    CardMedia,
    CardActions,
    CardActionButtons,
    CardActionIcons
  } from "@material/react-card";
  
  import Button from '@material/react-button';

const INSTRUCTOR = 'bg.tu-varna'

function today()
{
    return new Date();
}

class CustomerComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.location.state,
            showtimes: [],
            date: null,
            options: { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' },
            optionsEnd: {hour: 'numeric', minute: 'numeric'},
            optionsDay: {yea: 'numeric', month: 'numeric', day: 'numeric'}
            
        }

        this.buyTicket          = this.buyTicket.bind(this)
        this.getShowtimesByDate = this.getShowtimesByDate.bind(this)
        this.getNextDay         = this.getNextDay.bind(this)

    }

    componentDidMount() {

        this.getShowtimesByDate(null)
    }

    getShowtimesByDate(date){

        ShowtimeService.getAll(date)
        .then(response=> this.setState({
            showtimes: response.data
        }))
    }

    getNextDay(){

        var tomorrow = new Date()
        tomorrow.setDate( new Date().getDate() +1 )

        this.getShowtimesByDate(tomorrow)
    }

    buyTicket(showtime){

        let ids ={
            userId:     this.state.id,
            showtime:   showtime
        }

        this.props.history.push({pathname: `/customer/hall`, state: ids})
    }

    render() {
        return (
            <div>
               <Button style= {{ position: 'relative', left: '95%'}} >
                <LogoutIcon onClick={() => this.props.history.push("/login")} /> 
                </Button>
               
                <div className = 'btn' style={{position: 'relative' , left: '30%'}}>
                    <Button onClick={() => this.getShowtimesByDate(new Date())}> 
                    <h5> Today </h5> 
                    </Button>
                    <Button onClick={() => this.getNextDay()}>
                        <h5> Tomorrow </h5>
                    </Button>
                    <Button onClick={() => this.getShowtimesByDate(null)}>
                        <h5> All Showtimes </h5> 
                    </Button>
                </div>
                <div>
                    {
                        this.state.showtimes.map(
                            showtime =>
                                <div style={{position: 'relative', left: '35%', marginTop: '20px', marginBottom: '20px'}}>
                                    
                                    <Card style={{width: '500px', height: '400px'}}>
                                        <CardPrimaryContent>
                                            <h1>{showtime.movie.title}</h1>
                                            <CardMedia square imageUrl={showtime.movie.imageUrl} />
                                            <h1>{showtime.startTime}</h1>
                                        </CardPrimaryContent>
                                        
                                        <h5>Start: {new Date(showtime.startTime).toLocaleDateString("en-US",this.state.options)} 
                                        - {new Date(showtime.endTime).toLocaleDateString("en-US",this.state.optionsEnd).slice(11)}
                                        [   {showtime.type.type} ] {showtime.hall.name} </h5>
                                        
                                        
                                        <CardActions>
                                            <CardActionButtons>
                                                <Button 
                                                    color="secondary" 
                                                    aria-label="upload picture" 
                                                    component="span" 
                                                    onClick={() =>  this.buyTicket(showtime) }>
                                                    Buy Ticket
                                                </Button>
                                            </CardActionButtons>
                                        </CardActions>
                                    </Card>
                                </div>
                        )  
                    }
                </div>
            </div>
        )
        
    }
}

export default CustomerComponent