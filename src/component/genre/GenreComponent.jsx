import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import GenreService from '../../service/GenreService';

class GenreComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.location.state,
            name: ''
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)

    }

    componentDidMount() {

        console.log(this.state.id)

        GenreService.getGenre(this.state.id)
            .then(response => this.setState({
                name: response.data.name
            }))
    }

    validate(values) {
        let errors = {}

        if (!values.name) {
            errors.name = 'Enter genre.'
        } else if (values.name.length < 2) {
            errors.name = 'Enter atleast 2 characters in genre.'
        }

        return errors
    }

    onSubmit(values) {
        

        let genre = {
            id:         this.state.id,
            name:       values.name
        }

        GenreService.update(this.state.id, genre)
            .then(() => this.props.history.push('/admin/genres'))
        
        console.log(values);
    }

    render() {

        let { name, id } = this.state

        return (
            <div className ="content">
                
                <div className="form">
                    <Formik
                        initialValues={{ id, name }}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <div className = "header">Genre</div>
                                    <div className ="error">
                                    <ErrorMessage style={{width: "100%"}} name="name" component="div"
                                        className="alert alert-warning" />
                                    </div>
                                    <fieldset className="form-group">
                                        <label>Movie genre</label>
                                        <Field style={{width: "50%"}} className="form-control" type="text" name="name" />
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

export default GenreComponent