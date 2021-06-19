import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import HallService from '../../service/HallService';


class HallComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.location.state,
            name: '',
            rows: []

        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
        thos.editRows = this.editRows.bind(this)

    }

    componentDidMount() {

        console.log(this.state.id)

       HallService.retrieveHall(this.state.id)
            .then(response => this.setState({
                name: response.data.name,
                rows: response.data.rows
            }))

    }

    editRows(){
        this.props.history.push({pathname: `/admin/halls/rows`, state: id})

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

    onSubmit(values) {
        

        let hall = {
            id:         this.state.id,
            name:       values.name,
        }

        HallService.update(this.state.id, hall)
            .then(() => this.props.history.push('/admin/halls'))
        
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
                                    <button style={{width: "30%"}} className="btn btn-success" onClick={() => this.editRows()}>Edit rows</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        )
    }
}

export default HallComponent