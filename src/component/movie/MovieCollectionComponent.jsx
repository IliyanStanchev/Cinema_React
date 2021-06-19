import React, { Component } from 'react'
import '@material/react-card/index.scss';
import '@material/react-button/index.scss';
import '@material/react-material-icon/index.scss';
import { IconButton }       from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';



import Card, {
  CardPrimaryContent,
  CardMedia,
  CardActions,
  CardActionButtons,
  CardActionIcons
} from "@material/react-card";

import Button from '@material/react-button';
import MovieService from '../../service/MovieService';

class MovieCollectionComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            message: null
        }
        this.deleteClicked  = this.deleteClicked.bind(this)
        this.updateClicked  = this.updateClicked.bind(this)
        this.refresh        = this.refresh.bind(this)
    }

    componentDidMount() {
        this.refresh();
    }

    refresh() {
        MovieService.getAll()
            .then(
                response => {
                    this.setState({ movies: response.data })
                }
            )
    }

    deleteClicked(id) {
        MovieService.delete(id)
            .then(
                response => {
                    this.setState({ message: `Delete of movie successful` })
                    this.refresh()
                }
            )

    }


    updateClicked(id) {
        console.log('update ' + id)
        this.props.history.push({pathname: `/admin/movies/edit`, state: id})
    }

    render() {
        console.log('render')
        return (
            <div>
                <div>
                    <IconButton style={{marginLeft: '550px'}}
                        color="primary" 
                        aria-label="upload picture" 
                        component="span" 
                        onClick={() => this.updateClicked(0)}>
                        <AddCircleIcon />
                    </IconButton>
                </div>
                <div>
                    {
                        this.state.movies.map(
                            movie =>
                                <div style={{marginLeft: '500px', marginTop: '20px', marginBottom: '20px'}}>
                                    
                                    <Card style={{width: '500px', height: '400px'}}>
                                        <CardPrimaryContent>
                                            <h1>{movie.title}</h1>
                                            <CardMedia square imageUrl={movie.imageUrl} />
                                        </CardPrimaryContent>
                                        <CardActions>
                                            <CardActionButtons>
                                                <Button 
                                                    color="secondary" 
                                                    aria-label="upload picture" 
                                                    component="span" 
                                                    onClick={() =>  this.updateClicked(movie.id) }>
                                                    Update 
                                                </Button>
                                            </CardActionButtons>
                                            <CardActionIcons>
                                                <IconButton 
                                                    color="secondary" 
                                                    aria-label="upload picture" 
                                                    component="span" 
                                                    onClick={() =>  this.deleteClicked(movie.id) }>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </CardActionIcons>
                                        </CardActions>
                                    </Card>
                                </div>
                        )  
                    }
                </div>
            </div>
        )
    }
}

export default MovieCollectionComponent