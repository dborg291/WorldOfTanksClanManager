import React, { Component, Fragment } from 'react'
import AdditionalBriefing from '../images/additional_briefing.png';
import BattlePayents from '../images/battle_payments.png'
import MilitaryManeuvers from '../images/military_maneuvers.png'
import TacticalTraining from '../images/tactical_training.png'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';


export default class Reserve extends Component {

    activateReserve(level, type,)
    {
        axios.post('https://api.worldoftanks.com/wot/stronghold/activateclanreserve/?application_id=3ccd22879504be63b4ae8813635ce3d8&access_token=' + localStorage.getItem('access_token') + '&reserve_level=' + level + '&reserve_type=' + type)
            .then(response =>
                console.log(response.data))
            .catch(error => console.log(error))
    }

    render() {
        return (
            <Paper style={{margin: 8}}>
                <div>
                    <div style={{textAlign: "center", paddingTop: 8, fontSize: 20}}>
                        <strong>{this.props.reserve.name}</strong>
                    </div>
                    {(() => {
                        switch (this.props.reserve.name) {
                        case "Additional Briefing": return <img src={AdditionalBriefing} alt= "Additional Briefing" style={{display: 'block', marginLeft:'auto', marginRight: 'auto'}}/>;
                        case "Battle Payments": return <img src={BattlePayents} alt= "Battle Payments"/>;
                        case "Military Maneuvers": return <img src={MilitaryManeuvers} alt= "Military Maneuvers"/>;
                        case "Tactical Training": return <img src={TacticalTraining} alt= "Tactical Training"/>;
                        default: return null;
                        }
                    })()}
                    <div style= {{textAlign: 'center'}}>
                        {
                            this.props.reserve.in_stock.map((element, i) => (
                            <Fragment>
                                <div style= {{fontSize: 16}}>
                                    <Divider />
                                    <div id = {this.props.reserve.name + '.' + i} style={{padding:8}}>
                                    Level: {element.level} <br/>
                                    Bonuses<br/>
                                    {
                                        element.bonus_values.map((bonus) => (
                                            <div>
                                                {bonus.battle_type}:
                                                <div>
                                                    {bonus.value * 100}%
                                                </div>
                                            </div>
                                            
                                        ))
                                    }
                                    Amount in Stock: {element.amount}<br/>
                                    </div>
                                    {(() => {
                                        if(element.status === "active")
                                        {
                                            return <div style={{color: 'green'}}>ACTIVE NOW</div>
                                        }else if(element.status === "ready_to_activate")
                                            return <Button color="primary" onClick ={() => {this.activateReserve(element.level, this.props.reserve.type)}} disableElevation>Activate</Button>
                                        else if(element.status === "cannot_be_activated")
                                            return <div style={{color: 'red'}}>Cannot be Activated</div>
                                    })()}
                                </div>
                            </Fragment>
                            ))
                        }
                    </div>
                </div>

            </Paper>
        )
    }
}
