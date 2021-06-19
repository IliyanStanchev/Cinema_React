import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ProducerService from '../../service/ProducerService';

const INSTRUCTOR = 'bg.tu-varna'

class ProducerComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.location.state,
            firstName:  '',
            lastName:   ''
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)

    }

    componentDidMount() {

        console.log(this.state.id)

        ProducerService.retrieveProducer(this.state.id)
            .then(response => this.setState({
                firstName: response.data.firstName,
                lastName: response.data.lastName
            }))
    }

    validate(values) {
        let errors = {}

        if (!values.firstName) {
            errors.firstName = 'Enter first name.'
        } else if (values.firstName.length < 5) {
            errors.firstName = 'Enter atleast 5 Characters in first name.'
        }
        if (!values.lastName) {
            errors.lastName = 'Enter last name.'
        } else if (values.lastName.length < 5) {
            errors.lastName = 'Enter atleast 5 Characters in last name.'
        }

        return errors
    }

    onSubmit(values) {
        

        let producer = {
            id:         this.state.id,
            firstName:  values.firstName,
            lastName:   values.lastName,
            targetDate: values.targetDate
        }

        ProducerService.updateProducer(this.state.id, producer)
            .then(() => this.props.history.push('/admin/producers'))
        
        console.log(values);
    }

    render() {

        let { firstName,lastName, id } = this.state

        return (
            <div className ="content">
                
                <div className="form">
                    <Formik
                        initialValues={{ id, firstName, lastName }}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <div className = "header">Producer</div>
                                    <div className ="error">
                                    <ErrorMessage style={{width: "100%"}} name="firstName" component="div"
                                        className="alert alert-warning" />
                                    </div>
                                    <div className ="error">
                                    <ErrorMessage style={{width: "100%"}} name="lastName" component="div"
                                        className="alert alert-warning" />
                                    </div>
                                    <fieldset className="form-group">
                                        <label>First Name</label>
                                        <Field style={{width: "50%"}} className="form-control" type="text" name="firstName" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Last Name</label>
                                        <Field style={{width: "50%"}} className="form-control" type="text" name="lastName" />
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

export default ProducerComponent