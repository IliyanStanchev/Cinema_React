import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import TypeService from '../../service/TypeService';

class TypeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.location.state,
            type: ''
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)

    }

    componentDidMount() {

        console.log(this.state.id)

        TypeService.getType(this.state.id)
            .then(response => this.setState({
                type: response.data.type
            }))
    }

    validate(values) {
        let errors = {}

        if (!values.type) {
            errors.type = 'Enter type.'
        } else if (values.type.length < 2) {
            errors.type = 'Enter atleast 2 characters in type.'
        }

        return errors
    }

    onSubmit(values) {
        

        let type = {
            id:         this.state.id,
            type:       values.type
        }

        TypeService.update(this.state.id, type)
            .then(() => this.props.history.push('/admin/types'))
        
        console.log(values);
    }

    render() {

        let { type, id } = this.state

        return (
            <div className ="content">
                
                <div className="form">
                    <Formik
                        initialValues={{ id, type }}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <div className = "header">Type</div>
                                    <div className ="error">
                                    <ErrorMessage style={{width: "100%"}} name="type" component="div"
                                        className="alert alert-warning" />
                                    </div>
                                    <fieldset className="form-group">
                                        <label>Movie type</label>
                                        <Field style={{width: "50%"}} className="form-control" type="text" name="type" />
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

export default TypeComponent