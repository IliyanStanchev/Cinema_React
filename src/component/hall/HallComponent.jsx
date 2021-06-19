import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import HallService from '../../service/HallService';
import RowService  from '../../service/RowService';
import SeatService from '../../service/SeatService';


import { Button, Grid, IconButton, Box}       from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import EventSeatIcon from '@material-ui/icons/EventSeat';
import AddCircleIcon from '@material-ui/icons/AddCircle';


class HallComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.location.state,
            name: '',
            rows: []
        }

        this.refreshSeats = this.refreshSeats.bind(this)
        this.createSeat = this.createSeat.bind(this)
        this.deleteSeat = this.deleteSeat.bind(this)

        this.onSubmit   = this.onSubmit.bind(this)
        this.validate   = this.validate.bind(this)

        this.createRow = this.createRow.bind(this)
        this.deleteRow = this.deleteRow.bind(this)
        

    }

    componentDidMount() {

        console.log(this.state.id)

       HallService.retrieveHall(this.state.id)
            .then(response => this.setState({
                name: response.data.name,
            }))
            
        this.refreshSeats()
           
    }

    validate(values) {
        let errors = {}

        if (!values.name) {
            errors.name = 'Enter name.'
        } else if (values.name.length < 5) {
            errors.name = 'Enter atleast 5 Characters in first name.'
        }

        return errors
    }

    viewRows(){
        this.props.history.push({pathname: `/admin/halls/rows`, state: this.state.id})
    }

    onSubmit(values) {
        

        let hall = {
            id:         this.state.id,
            name:       values.name,
        }

        HallService.update(this.state.id, hall)
            .then(() => this.props.history.push('/admin/halls'))
        
        console.log(values);
    }

    createRow(){
        RowService.create(this.state.id)
        .then(
            response => {
                this.refreshSeats()
            }
        )
    }

    deleteRow(){
        RowService.delete(this.state.id)
        .then(
            response => {
                this.refreshSeats()
            }
        )
    }

    createSeat(id){
        SeatService.create(id)
        .then(
            response => {
                this.refreshSeats()
            }
        )
    }

    deleteSeat(id){
        SeatService.delete(id)
        .then(
            response => {
                this.refreshSeats()
            }
        )
    }

    refreshSeats() {

        RowService.getAll(this.state.id)
        .then(response => this.setState({
            rows: response.data
        }))
    }

    render() {

        let { rows,name, id } = this.state

        return (
            <div>
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
                                <Form>
                                    <div className = "header">Hall</div>
                                    <div className ="error">
                                    <ErrorMessage style={{width: "100%"}} name="name" component="div"
                                        className="alert alert-warning" />
                                    </div>
                                    <fieldset className="form-group">
                                        <label>First Name</label>
                                        <Field style={{width: "50%"}} className="form-control" type="text" name="name" />
                                    </fieldset>
                                    <button style={{width: "50%"}} className="btn btn-success" type="submit">Save</button>    
                                </Form>
                                
                            )   
                        }
                          
            
                    </Formik>
                    
                    </div>
                    </div>
                    <br></br>
                    <div className="header" align="center"> Hall seats </div>
                    <br></br>
                    <div align="center">
                            {
                                this.state.rows.map(
                                   row =>
                                       <div>
                                            {row.seats.map(
                                            seat=>
     
                                            <Button disabled size="large">
                                            <EventSeatIcon />
                                            </Button>
             
                                            )}
                                            <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => this.createSeat(row.id)}>
                                            <AddCircleIcon />
                                            </IconButton>
                                            <IconButton color="secondary" aria-label="upload picture" component="span" onClick={() =>  this.deleteSeat(row.id) }>
                                            <DeleteIcon />
                                            </IconButton>
                                            
                                    </div>
                                )}
                                <div>
                                <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => this.createRow()}>
                                            Add row <AddCircleIcon />
                                            </IconButton>
                                            <IconButton color="secondary" aria-label="upload picture" component="span" onClick={() =>  this.deleteRow() }>
                                            Delete row <DeleteIcon />
                                            </IconButton>
                                </div>  
                            </div> 
                    </div>    
        )
    }
}

export default HallComponent