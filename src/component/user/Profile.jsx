import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import UserService from '../../service/UserService';


class ProfileComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.location.state,
            username:  '',
            password:  '',
            email:     '',
            createdOn: '',
            options: { year: 'numeric', month: 'long', day: 'numeric' }
        }

        this.onSubmit = this.onSubmit.bind(this)

    }

    componentDidMount() {

        console.log(this.state.id)

        if(this.state.id == null){
            UserService.retrieveAdmin()
                .then(response =>this.setState({
                    id:         response.data.id,
                    username:   response.data.username,
                    password:   response.data.password,
                    email:      response.data.email,
                    createdOn: new Date(response.data.createdOn).toLocaleDateString("en-US",this.state.options)
                }))
        }
        else{
            UserService.retrieveUser('', this.state.id)
            .then(response => this.setState({
                username: response.data.username,
                password: response.data.password,
                email:    response.data.email,
                createdOn: new Date(response.data.createdOn).toLocaleDateString("en-US",this.state.options)
            }))
        }
       
    }

    onSubmit(values) {
       
        this.props.history.push({pathname: `/admin/profile/edit`, state: this.state.id})
    }

    render() {

        let { username,password,email, id, createdOn } = this.state

        return (
            <div className ="content">
                <div className="form">
                    <Formik
                        initialValues={{ id, username, password, email, createdOn }}
                        onSubmit={this.onSubmit}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <div className = "header">My profile</div>
                              
                                    <fieldset className="form-group">
                                        <label>Email</label>
                                        <Field style={{width: "50%"}} className="form-control" type="text" name="email" disabled/>
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <label>Username</label>
                                        <Field style={{width: "50%"}} className="form-control" type="text" name="username" disabled />
                                    </fieldset>
                                 
                                    <fieldset className="form-group">
                                        <label>Created On</label>
                                        <Field style={{width: "50%"}} className="form-control" type="text" name="createdOn" disabled />
                                    </fieldset>
                                    <button style={{width: "50%"}} className="btn btn-success" type="submit">Edit profile</button>
                                </Form>
                            )
                        }
                    </Formik>

                </div>
            </div>
        )
    }
}

export default ProfileComponent