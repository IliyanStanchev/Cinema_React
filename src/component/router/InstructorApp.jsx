import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AdminComponent from '../admin/AdminComponent';
import ChooseSeatComponent from '../customer/ChooseSeatComponent';
import CustomerComponent from '../customer/CustomerComponent';
import ShowTicketComponent from '../customer/ShowTicketComponent';
import LoginRegisterComponent from '../login/LoginRegisterComponent';


class InstructorApp extends Component {

    render() {
        return (
            <>
                <Router>
                    <>
                        <Switch>
                            <Route path="/"                         exact component={LoginRegisterComponent} />
                            <Route path="/login"                    exact component={LoginRegisterComponent} />
                            <Route path="/customer"                 exact component={CustomerComponent} />
                            <Route path="/customer/hall"            exact component={ChooseSeatComponent} />
                            <Route path="/admin"                    exact component={AdminComponent} />
                            <Route path="/customer/hall/ticket"     exact component={ShowTicketComponent} />
                        </Switch>
                    </>
                </Router>
            </>
        )
    }
}

export default InstructorApp