import { TextareaAutosize } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { Component } from 'react';

import HallService from '../../service/HallService';
import ShowtimeService from '../../service/ShowtimeService';
import TypeService from '../../service/TypeService';
import MovieService from '../../service/MovieService';

class ShowtimeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.location.state,
            movie: null,
            startTime: '',
            endTime: '',
            type: null,
            hall: null,
            movies: [],
            types: [],
            halls: []
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)

    }

    componentDidMount() {

        console.log(this.state.id)

        ShowtimeService.getShowtime(this.state.id)
            .then(response => this.setState({
                movie: response.data.movie,
                startTime: response.data.startTime,
                endTime: response.data.endTime,
                type: response.data.type,
                hall: response.data.hall
            }))

        MovieService.getAll()
            .then(response => this.setState({
                movies: response.data
            }))

        HallService.getAll()
            .then(response => this.setState({
                halls: response.data
            }))

        TypeService.getAll()
            .then(response => this.setState({
                types: response.data
            }))
    }

    validate(values) {
        let errors = {}

        if (!this.state.movie) {
            errors.title = 'Pick movie' 
        }

        if (!this.state.type){
            errors.title = 'Pick type'
        }

        if(!this.state.hall){
            errors.title = 'Pick hall'
        }

        return errors
    }

    handleChange = (name, event) => {
        const target = event.target; // Do we need this?(unused in the function scope)!
        this.setState({
          [name]: event.target.value
        }, () => {
          console.log(this.state.plannedDep)
          // Prints the new value.
        });
      };

    onSubmit(values) {
        

        let showtime = {
            id:         this.state.id,
            movie:      this.state.movie,
            startTime:  this.state.startTime,
            endTime:    this.state.endTime,
            type:       this.state.type,
            hall:       this.state.hall
        }

        ShowtimeService.update(this.state.id, showtime)
            .then(() => this.props.history.push('/admin/showtimes'))
        
        console.log(values);
    }

    render() {
        let { id, title, review, imageUrl, startTime, endTime  } = this.state

        return (
           
            <div className ="content">
                
                <div className="form">
                    <Formik
                        initialValues={{ id, title, review, imageUrl }}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            () => (
                                <Form>
                                    <div className = "header">Showtime</div>
                                    <div className ="error">
                                    <ErrorMessage style={{width: "100%"}} name="title" component="div"
                                        className="alert alert-warning" />
                                    </div>
                                    <div style ={{margin: '24px', marginLeft: '164px'}}>
                                        <Autocomplete
                                            value={this.state.movie}
                                            id="combo-box-movie"
                                            options={this.state.movies}
                                            getOptionLabel={(option) => option.title}
                                            style={{ width: 300 }}
                                            onChange={(event,value) => this.setState( { movie: value })}
                                            renderInput={(params) => <TextField {...params} label="Movie" variant="outlined" />}
                                        />
                                    </div>
                                    <div style ={{marginLeft: '164px', marginBottom: '24px'}}>
                                        <Autocomplete
                                            value={this.state.type}
                                            id="combo-box-type"
                                            options={this.state.types}
                                            getOptionLabel={(option) => option.type}
                                            style={{ width: 300 }}
                                            onChange={(event,value) => this.setState( { type: value })}
                                            renderInput={(params) => <TextField {...params} label="Showtime type" variant="outlined" />}
                                        />
                                    </div>
                                    <div style ={{marginLeft: '164px', marginBottom: '24px'}}>
                                        <Autocomplete
                                            value={this.state.hall}
                                            id="combo-box-type"
                                            options={this.state.halls}
                                            getOptionLabel={(option) => option.name}
                                            style={{ width: 300 }}
                                            onChange={(event,value) => this.setState( { hall: value })}
                                            renderInput={(params) => <TextField {...params} label="Hall" variant="outlined" />}
                                        />
                                        </div>
                                         <TextField style = {{ margin: '24px' }}
                                            id="datetime-start"
                                            label="Start time"
                                            type="datetime-local"
                                            value={startTime}
                                            InputLabelProps={{shrink: true, }}
                                            onChange={(event) => this.setState({
                                                startTime: event.target.value
                                            })}
                                         />
                                        <TextField style = {{ marginTop: '24px', marginRight: '24px' }}
                                            id="datetime-end"
                                            label="End time"
                                            type="datetime-local"
                                            value={endTime}
                                            InputLabelProps={{shrink: true, }}
                                            onChange={(event) => this.setState({
                                                endTime: event.target.value
                                            })}
                                         />
                                    
                                    <button style={{width: "50%"}} className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>  
            </div>
        )
    }
}

export default ShowtimeComponent