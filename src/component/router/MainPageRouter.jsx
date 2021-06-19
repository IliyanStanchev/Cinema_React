import React, { Component }                       from 'react';
import Navbar                                     from '../navigation/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ListUsersComponent                         from '../user/ListUsersComponent';
import UserComponent                              from '../user/UserComponent';
import ListProducersComponent                     from '../producer/ListProducersComponent';
import ProducerComponent                          from '../producer/ProducerComponent';
import ProfileComponent                           from '../user/Profile';
import ListHallsComponent                         from '../hall/ListHallsComponent';
import HallComponent                              from '../hall/HallComponent';
import TypesCollectionComponent                   from '../type/TypesCollectionComponent';
import TypeComponent                              from '../type/TypeComponent';
import GenreCollectionComponent                   from '../genre/GenreCollectionComponent';
import GenreComponent                             from '../genre/GenreComponent';
import MovieCollectionComponent                   from '../movie/MovieCollectionComponent';
import MovieComponent                             from '../movie/MovieComponent';
import ShowtimeCollectionComponent                from '../showtime/ShowtimeCollectionComponent';
import ShowtimeComponent                          from '../showtime/ShowtimeComponent';
import TicketsCollectionComponent                 from '../ticket/TicketCollectionComponent';

import { Button }   from '@material-ui/core';


class MainPageRouter extends Component {

    render() {
        return (
            <>
            <Router>
           
              <Navbar />
              <Button 
                style= {{alignSelf: 'center'}}
                onClick={() => this.props.history.push("/login")}
            >
                Logout
            </Button>
              <Switch>
                <Route path='/admin/profile'              exact component={ProfileComponent} />
                <Route path="/admin/users"                exact component={ListUsersComponent} />
                <Route path="/admin/profile/:id"          exact component={UserComponent} />
                <Route path="/admin/users/:id"            exact component={UserComponent} />
                <Route path="/admin/producers"            exact component={ListProducersComponent} />
                <Route path="/admin/producers/:id"        exact component={ProducerComponent} />
                <Route path="/admin/halls"                exact component={ListHallsComponent} />
                <Route path="/admin/halls/edit"           exact component={HallComponent} />
                <Route path="/admin/types"                exact component={TypesCollectionComponent} />
                <Route path="/admin/types/edit"           exact component={TypeComponent} />
                <Route path="/admin/genres"               exact component={GenreCollectionComponent} />
                <Route path="/admin/genres/edit"          exact component={GenreComponent} />
                <Route path="/admin/movies"               exact component={MovieCollectionComponent} />
                <Route path="/admin/movies/edit"          exact component={MovieComponent} />
                <Route path="/admin/showtimes"            exact component={ShowtimeCollectionComponent} />
                <Route path="/admin/showtimes/edit"       exact component={ShowtimeComponent} />
                <Route path="/admin/tickets"              exact component={TicketsCollectionComponent} />
              </Switch>
            </Router>
          </>
        )
    }
}

export default MainPageRouter