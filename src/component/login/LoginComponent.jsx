import React, { Component } from 'react'
import loginImg from '../../cinema.png';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import LoginAuthenticationService from '../../service/LoginAuthenticationService';
import { withRouter } from "react-router-dom";

const INSTRUCTOR = 'bg.tu-varna'

class LoginComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
        username: '',
        psasword: '',
        message: null,
        registration: this.props.location.state,
        id: null,
        role: null
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.validate = this.validate.bind(this)
    this.loginUser = this.loginUser.bind(this)
    
}



  onSubmit(values) {

    let user ={
      username: values.username,
      password: values.password
    }

    LoginAuthenticationService.authenticateUser(user)
    .then(response => this.loginUser(
      response.data.id,
      response.data.role,
  ))
      .catch(this.setState({ message: `Wrong username or password.` }))
  }

  loginUser(id,role){
    if(id==null)
      return;

    if(role.roleName == 'Admin')
    this.props.history.push({pathname: '/admin', state:id})

    if(role.roleName == 'Customer')
    this.props.history.push({pathname: '/customer', state:id})

    
  }

  validate(values) {
    let errors = {}
    
    if (!values.password) {
      errors.username = 'Enter password.'
    }
       
    else if (values.password.length < 3) {
      errors.username = 'Enter atleast 3 Characters in password.'
    }

    else if (!values.username) {
      errors.username = 'Enter username.'
    }
    
    else if (values.username.length < 3) {
      errors.username = 'Enter atleast 3 Characters in username.'
    }

    return errors
}


  render() {

    let { registration,username,password } = this.state

    return (
      <Formik
        initialValues={{ username, password }}
        onSubmit={this.onSubmit}

        validateOnChange={false}
        validateOnBlur={false}
        validate={this.validate}
        enableReinitialize={true}
        >
        {
          props => (
            <Form>
              <div className="base-container" ref={this.props.containerRef}>
                <h1> {registration} </h1> 
                  <div>
                    <div className="image">
                      <img src={loginImg}/>
                    </div>
                    <div className="header">Login</div>
                    <div className="form">    
                    {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                        <ErrorMessage style={{width: "100%"}} name="username" component="div" className="alert alert-warning" />                 
                        <div className="form-group">
                          <fieldset className="form-group">
                            <label>Username</label>
                            <Field style={{width: "100%"}} className="form-control" type="text" name="username"/>
                          </fieldset>           
                        </div>
                        <div className="form-group">
                          <fieldset className="form-group">
                            <label>Password</label>
                            <Field style={{width: "100%"}} className="form-control" type="password" name="password"/>
                          </fieldset>                                  
                    </div>
                  </div>
                </div>
                <div className="footer">
                  <button className="btn btn-success" type= "submit" >Login</button>
                </div>
              </div>
            </Form>
          )
        }
      </Formik>
    );
  }
}

export default withRouter(LoginComponent);