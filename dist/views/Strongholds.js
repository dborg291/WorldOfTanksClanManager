import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Reserve from '../components/Reserve';
import { Paper } from '@material-ui/core';
export default class Strongholds extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reserves: [],
            isLoading: true,
            errors: null,
            activeReserves: []
        };
        axios.get('https://api.worldoftanks.com/wot/stronghold/clanreserves/?application_id=3ccd22879504be63b4ae8813635ce3d8&access_token=' + localStorage.getItem('access_token'))
            .then(response => response.data.data.map(reserve => ({
            name: `${reserve.name}`,
            bonus_type: `${reserve.bonus_type}`,
            disposable: `${reserve.disposable}`,
            in_stock: reserve.in_stock,
            type: `${reserve.type}`,
        }))).then(reserves => {
            this.setState({
                reserves,
                isLoading: false
            });
        })
            .catch(error => this.setState({ error, isLoading: false }));
    }
    renderReserves() {
        return this.state.reserves.map((element) => (React.createElement("div", null, (() => {
            if (["Additional Briefing", "Battle Payments", "Military Maneuvers", "Tactical Training"].includes(element.name)) {
                console.log(element);
                return React.createElement(Reserve, { reserve: element });
            }
        })())));
    }
    render() {
        return (React.createElement("div", null,
            React.createElement("div", { style: { display: 'inline-block' } }, (() => {
                if (this.state.activeReserves.length === 0) {
                    return (React.createElement(Paper, { style: { backgroundColor: '#90EE90', padding: 8 } }, "Wow"));
                }
            })()),
            React.createElement(Grid, { container: true, style: { justifyContent: 'center' } }, this.renderReserves())));
    }
}
//# sourceMappingURL=Strongholds.js.map