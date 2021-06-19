import React from "react";
import loginImg from "../../cinema.png";
import UserService from "../../service/UserService";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { withRouter } from "react-router-dom";

const INSTRUCTOR = 'bg.tu-varna'

class RegisterComponent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
        email:    '',
        username: '',
        psasword: '',
        message:  null,
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.validate = this.validate.bind(this)
    
}


  onSubmit(values) {
    
    let instructor = ''

    let user = {
        id:         0,
        email:      values.email,
        username:   values.username,
        password:   values.password,
        createdOn:  new Date()
    }

    UserService.createUser(user)
    .then(response => this.setState({ message: `You've registered successfully.` }))
    .catch(this.setState({ message: `Registration failed. Check either email or username.` }))
  
  }

  validate(values) {
    let errors = {}

    if (!values.password) {
      errors.email = 'Enter password.'
    } else if (values.password.length < 3) {
      errors.email = 'Enter atleast 3 Characters in password.'
    }

    if (!values.username) {
        errors.email = 'Enter username.'
    } else if (values.username.length < 3) {
        errors.email = 'Enter atleast 3 Characters in username.'
    }

    if (!values.email) {
      errors.email = 'Enter email.'
    } 

    return errors
}


  render() {

    let { email, username, password } = this.state

    return (
      <Formik
        initialValues={{ email, username, password }}
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
                  <div>
                    <div className="image">
                      <img src={loginImg} />
                    </div>
                    <div className="header">Register</div>
                    <div className="form">
                        {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                        <ErrorMessage style={{width: "100%"}} name="email"    component="div" className="alert alert-warning" />  
                        <div className="form-group">
                          <fieldset className="form-group">
                            <label>Email</label>
                            <Field style={{width: "100%"}} className="form-control" type="text" name="email"/>
                          </fieldset>           
                        </div>               
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
                  <button className="btn btn-success" type= "submit" >Register</button>
                </div>
              </div>
            </Form>
          )
        }
      </Formik>
    );
  }
}

export default withRouter(RegisterComponent);