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
import ShowtimeService from '../../service/ShowtimeService';

class ShowtimeCollectionComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showtimes: [],
            message: null, 
            options: { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' },
            optionsEnd: {hour: 'numeric', minute: 'numeric'}
        }
        this.deleteClicked  = this.deleteClicked.bind(this)
        this.updateClicked  = this.updateClicked.bind(this)
        this.refresh        = this.refresh.bind(this)
    }

    componentDidMount() {
        this.refresh();
    }

    refresh() {
        ShowtimeService.getAll()
            .then(
                response => {
                    this.setState({ showtimes: response.data })
                }
            )
    }

    deleteClicked(id) {
        ShowtimeService.delete(id)
            .then(
                response => {
                    this.setState({ message: `Delete of showtime successful` })
                    this.refresh()
                }
            )

    }


    updateClicked(id) {
        console.log('update ' + id)
        this.props.history.push({pathname: `/admin/showtimes/edit`, state: id})
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
                        this.state.showtimes.map(
                            showtime =>
                                <div style={{marginLeft: '500px', marginTop: '20px', marginBottom: '20px'}}>
                                    
                                    <Card style={{width: '500px', height: '400px'}}>
                                        <CardPrimaryContent>
                                            <h1>{showtime.movie.title}</h1>
                                            <CardMedia square imageUrl={showtime.movie.imageUrl} />
                                            <h1>{showtime.startTime}</h1>
                                        </CardPrimaryContent>
                                        
                                        <h5>Start: {new Date(showtime.startTime).toLocaleDateString("en-US",this.state.options)} 
                                        - {new Date(showtime.endTime).toLocaleDateString("en-US",this.state.optionsEnd).slice(11)}
                                        [   {showtime.type.type} ]</h5>
                                        
                                        <CardActions>
                                            <CardActionButtons>
                                                <Button 
                                                    color="secondary" 
                                                    aria-label="upload picture" 
                                                    component="span" 
                                                    onClick={() =>  this.updateClicked(showtime.id) }>
                                                    Update 
                                                </Button>
                                            </CardActionButtons>
                                            <CardActionIcons>
                                                <IconButton 
                                                    color="secondary" 
                                                    aria-label="upload picture" 
                                                    component="span" 
                                                    onClick={() =>  this.deleteClicked(showtime.id) }>
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

export default ShowtimeCollectionComponent