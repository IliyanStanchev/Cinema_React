import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import UserService from '../../service/UserService';

const INSTRUCTOR = 'bg.tu-varna'

class UserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.location.state,
            username:  '',
            password:  '',
            email:     '',
            createdOn: ''
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)

    }

    componentDidMount() {

        console.log(this.state.id)

        UserService.retrieveUser(this.state.id)
            .then(response => this.setState({
                username: response.data.username,
                password: response.data.password,
                email:    response.data.email,
                createdOn: response.data.createdOn
            }))
        
    }

    validate(values) {
        let errors = {}

        if (!values.email) {
            errors.email = 'Enter email.'
        } else if (values.email.length < 5) {
            errors.email = 'Enter atleast 5 Characters in email.'
        }

        return errors
    }

    onSubmit(values) {
        let username = INSTRUCTOR

        let user = {
            id:         this.state.id,
            username:   values.username,
            password:   values.password,
            email:      values.email,
            createdOn:  new Date()
        }

        UserService.updateUser(this.state.id, user)
            .then(() => this.props.history.push('/admin/users'))
        
        console.log(values);
    }

    render() {

        let { username,password,email, id } = this.state

        return (
            <div className ="content">
                <div className="form">
                    <Formik
                        initialValues={{ id, username, password, email }}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <div className = "header">User</div>
                                    <div className ="error">
                                    <ErrorMessage style={{width: "100%"}} name="email" component="div" className="alert alert-warning" />
                                    </div>
                              
                                    <fieldset className="form-group">
                                        <label>Username</label>
                                        <Field style={{width: "50%"}} className="form-control" type="text" name="username"  />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Password</label>
                                        <Field style={{width: "50%"}} className="form-control" type="text" name="password"  />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Email</label>
                                        <Field style={{width: "50%"}} className="form-control" type="text" name="email" />
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

export default UserComponent