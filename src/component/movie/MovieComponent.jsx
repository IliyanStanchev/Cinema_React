import { TextareaAutosize } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { Component } from 'react';
import GenreService from '../../service/GenreService';
import MovieService from '../../service/MovieService';
import ProducerService from '../../service/ProducerService';







class MovieComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.location.state,
            title: '',
            genre: null,
            producer: null,
            reting: null,
            review: '',
            imageUrl: '',
            producers: [],
            genres: [] 
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)

    }

 

    componentDidMount() {

        console.log(this.state.id)

        MovieService.getMovie(this.state.id)
            .then(response => this.setState({
                title: response.data.title,
                review: response.data.review,
                imageUrl: response.data.imageUrl,
                producer: response.data.producer,
                genre: response.data.genre,
                rating: response.data.rating
            }))

        GenreService.getAll()
            .then(response => this.setState({
                genres: response.data
            }))

        ProducerService.retrieveAllProducers()
            .then(response => this.setState({
                producers: response.data
            }))
    }

    validate(values) {
        let errors = {}

        if (!values.title) {
            errors.title = 'Enter title.'
        } else if (values.title.length < 2) {
            errors.title = 'Enter atleast 2 characters in title.'
        }
        if (this.state.review.length == 0){
            errors.title = 'Enter review'
        }else if(this.state.review.length < 2){
            errors.title = 'Enter atleast 2 characters in review.'
        }
        if (!values.imageUrl){
            errors.err = 'Enter image URL'
        }else if(values.imageUrl < 2){
            errors.err = 'Enter atleast 2 characters in image URL.'
        }


        return errors
    }

    onSubmit(values) {
        

        let movie = {
            id:         this.state.id,
            title:      values.title,
            review:     this.state.review,
            imageUrl:   values.imageUrl,
            producer:   this.state.producer,
            genre:      this.state.genre,
            rating:     this.state.rating
        }

        MovieService.update(this.state.id, movie)
            .then(() => this.props.history.push('/admin/movies'))
        
        console.log(values);
    }

    render() {
        let { id, title, review, imageUrl} = this.state

        return (
           
            <div className ="content">
                
                <div className="form">
                    <Formik
                        initialValues={{ id, title, review, imageUrl}}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            () => (
                                <Form>
                                    <div className = "header">Movie</div>
                                    <div className ="error">
                                    <ErrorMessage style={{width: "100%"}} name="title" component="div"
                                        className="alert alert-warning" />
                                    </div>
                                    <fieldset className="form-group">
                                        <label>Title</label>
                                        <Field style={{width: "50%"}} className="form-control" type="text" name="title" />
                                    </fieldset>
                                    <div style ={{margin: '24px', marginLeft: '64px'}}>
                                        <Autocomplete style={{marginLeft: '120px' }} 
                                            value={this.state.genre}
                                            id="combo-box-demo"
                                            options={this.state.genres}
                                            getOptionLabel={(option) => option.name}
                                            style={{ width: 300 }}
                                            onChange={(event,value) => this.setState( { genre: value })}
                                            renderInput={(params) => <TextField {...params} label="Genre" variant="outlined" />}
                                        />
                                    </div>
                                    <div style ={{margin: '24x', marginLeft: '64px'}}>
                                        <Autocomplete
                                            value={this.state.producer}
                                            id="combo-box-producers"
                                            options={this.state.producers}
                                            getOptionLabel={(option) => option.firstName + " " + option.lastName}
                                            style={{ width: 300 }}
                                            onChange={(event,value) => this.setState( { producer: value })}
                                            renderInput={(params) => <TextField {...params} label="Producer" variant="outlined" />}
                                        />
                                    </div>
                                    <fieldset className="form-group">
                                        <label>Review</label>
                                        <TextareaAutosize 
                                            style={{marginLeft: '24px', width: "170%" }} 
                                            className="form-control" 
                                            type="edit" 
                                            defaultValue={review} 
                                            onChange={(event)=> this.setState({ review: event.target.value })}/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Image URL</label>
                                        <Field style={{width: "50%"}} className="form-control" type="text" name="imageUrl" />
                                    </fieldset>
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

export default MovieComponent