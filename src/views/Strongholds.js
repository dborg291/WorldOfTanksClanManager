import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

export default class Strongholds extends Component {

    style = {
        Paper: {padding: 20, margin: 10}
    }

    getReserves()
    {
        axios.get('https://api.worldoftanks.com/wot/stronghold/clanreserves/?application_id=3ccd22879504be63b4ae8813635ce3d8&access_token=624f91091c815526608e899b4f597988e2938dc3', {
            application_id: '3ccd22879504be63b4ae8813635ce3d8',
            access_token: localStorage.getItem('access_token')
          })
          .then((response) => {
            var data = response.data.data;
            // return data.forEach((element) => (
            //     console.log(element.name)
            // ));
            this.setState({reserve: data})
            console.log(data)
          }, (error) => {
            console.log(error);
          });
    }

    componentDidMount(){
        this.getReserves()
        console.log(this.state)
    }

    render() {
        return (
            <div>
                <Grid container>
                    <Grid item sm>
                        <Paper style={this.style.Paper}>Hello</Paper>
                    </Grid>
                    <Grid item sm>
                        <Paper style={this.style.Paper}>WOW</Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}