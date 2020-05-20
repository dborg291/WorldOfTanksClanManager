import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Reserve from '../components/Reserve'
import { Paper } from '@material-ui/core';

export default class Strongholds extends Component {

    state = {
        reserves: [],
        isLoading: true,
        errors: null,
        activeReserves: []

    };

    constructor(props)
    {
        super(props);

        axios.get('https://api.worldoftanks.com/wot/stronghold/clanreserves/?application_id=3ccd22879504be63b4ae8813635ce3d8&access_token=' + localStorage.getItem('access_token'))
          .then(response =>
            response.data.data.map(reserve => ({
                name: `${reserve.name}`,
                bonus_type: `${reserve.bonus_type}`,
                disposable: `${reserve.disposable}`,
                in_stock: reserve.in_stock,
                type: `${reserve.type}`,
              }))
          ).then(reserves => {
              this.setState({
                  reserves,
                  isLoading: false
              })
          })
          .catch(error => this.setState({ error, isLoading: false }));
    }

    renderReserves()
    {
        return this.state.reserves.map((element) => (
            <div>
                {(() => {
                    if(["Additional Briefing", "Battle Payments", "Military Maneuvers", "Tactical Training"].includes(element.name))
                    {
                        console.log(element)
                        return <Reserve reserve={ element } />;
                    }
                })()}
            </div>
        
        ));
            // Additional Briefing
            // Airstrike
            // Artillery Strike
            // Battle Payments
    }

    render() {
        return (
            <div >
                <div style = {{display: 'inline-block'}}>
                {(() => {
                        if(this.state.activeReserves.length === 0) 
                        {
                            return(
                            <Paper style={{ backgroundColor : '#90EE90', padding:8}}>
                                Wow
                            </Paper>)
                        }
                    })()}
                </div>
                <Grid container style={{justifyContent: 'center'}}>
                    {/* <Reserves reserves= {this.state}/> */}
                    {this.renderReserves()}
                </Grid>
            </div>
        );
    }
}