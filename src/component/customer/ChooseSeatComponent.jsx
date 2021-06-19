import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import RowService  from '../../service/RowService';

import { Button, Grid, IconButton, Box}       from '@material-ui/core';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import EventSeatIcon from '@material-ui/icons/EventSeat';



class ChooseSeatComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ids: this.props.location.state,
            name: '',
            showtime: null,
            rows: []
        }

        this.refreshSeats = this.refreshSeats.bind(this)   
        this.buyTicket    = this.buyTicket.bind(this)

    }

    componentDidMount() {
            
        this.refreshSeats()
           
    }

    refreshSeats() {

        RowService.getAll(this.state.ids.showtime.hall.id)
        .then(response => this.setState({
            name: this.state.ids.showtime.hall.name,
            rows: response.data
        }))
    }

    buyTicket(seat, rowNumber){

        let info ={
            id:        this.state.ids.userId,
            showtime:  this.state.ids.showtime,
            seat:      seat,
            rowNumber: rowNumber, 
        }

        this.props.history.push({pathname: `/customer/hall/ticket`, state: info})

    }

    render() {

        let { rows,name, id } = this.state

        return (
            <div>
                <Button style= {{ position: 'relative', left: '95%'}} >
                <LogoutIcon onClick={() => this.props.history.push("/login")} /> 
            </Button>
            <div className="content">
                
                <div className="form">
                    <Formik
                        initialValues={{ rows,id, name }}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                    <div>
                                    <div className = "header">{name}</div>
                                    <div className ="error">
                                    <ErrorMessage style={{width: "100%"}} name="name" component="div"
                                        className="alert alert-warning" />
                                    </div>  
                                    </div> 
                                
                            )   
                        }
                          
            
                    </Formik>
                    
                    </div>
                    </div>
                    <br></br>
                    <div className="header" align="center"> Choose seat </div>
                    <br></br>
                    <div align="center">
                            {
                                this.state.rows.map(
                                   row =>
                                       <div>
                                            {row.seats.map(
                                            seat=>
     
                                            <Button  color="primary">
                                            <EventSeatIcon fontSize="large" onClick={() =>  this.buyTicket(seat, row.rowNumber) }/>
                                            </Button>
             
                                            )}
                                    </div>
                                )}
                            </div> 
                    </div>    
        )
    }
}

export default ChooseSeatComponent