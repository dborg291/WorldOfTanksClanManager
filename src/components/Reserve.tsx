import axios from 'axios';
import React, { Component, Fragment } from 'react';
import { IReserveCard } from 'views/Strongholds';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';

import AdditionalBriefing from '../images/additional_briefing.png';
import BattlePayents from '../images/battle_payments.png';
import MilitaryManeuvers from '../images/military_maneuvers.png';
import TacticalTraining from '../images/tactical_training.png';

export interface IReserve {
    actionTime: number;
    activatedAt?: string;
    activeTill?: string;
    amount: number;
    bonusValues: IBonusValue[];
    level: number;
    status: string;
    x_level_only: boolean;
}

export interface IBonusValue {
    value: number;
    battleType: string;
}

export class Reserve extends Component<IReserveCard> {

    public render(): React.ReactElement {
        console.log('reserve render func', this.props);
        return (
            <Paper style={{ margin: 8 }}>
                <div>
                    <div style={{ textAlign: "center", paddingTop: 8, fontSize: 20 }}>
                        <strong>{this.props.name}</strong>
                    </div>
                    {(() => {
                        switch (this.props.name) {
                            case "Additional Briefing": return <img src={AdditionalBriefing} alt="Additional Briefing" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />;
                            case "Battle Payments": return <img src={BattlePayents} alt="Battle Payments" />;
                            case "Military Maneuvers": return <img src={MilitaryManeuvers} alt="Military Maneuvers" />;
                            case "Tactical Training": return <img src={TacticalTraining} alt="Tactical Training" />;
                            default: return undefined;
                        }
                    })()}
                    <div style={{ textAlign: 'center' }}>
                        {
                            this.props.inStock.map((reserve: IReserve, i: number) => (
                                <Fragment>
                                    <div style={{ fontSize: 16 }}>
                                        <Divider />
                                        <div id={this.props.name + '.' + i} style={{ padding: 8 }}>
                                            Level: {reserve.level} <br />
                                            Bonuses<br />
                                            {
                                                reserve.bonusValues?.map((bonus: IBonusValue) => (
                                                    <div>
                                                        {bonus.battleType}:
                                                        <div>
                                                            {bonus.value * 100}%
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                    Amount in Stock: {reserve.amount}<br />
                                        </div>
                                        {(() => {
                                            if (reserve.status === "active") {
                                                return <div style={{ color: 'green' }}>ACTIVE NOW</div>;
                                            } else if (reserve.status === "ready_to_activate") {
                                                return <Button color="primary" onClick={() => { this.activateReserve(reserve.level, this.props.reserveType) }} disableElevation>Activate</Button>
                                            } else if (reserve.status === "cannot_be_activated") {
                                                return <div style={{ color: 'red' }}>Cannot be Activated</div>;
                                            } else {
                                                return;
                                            }
                                        })()}
                                    </div>
                                </Fragment>
                            ))
                        }
                    </div>
                </div>
            </Paper>
        );
    }

    private activateReserve(level: number, reserveType: string): void {
        axios.post('https://api.worldoftanks.com/wot/stronghold/activateclanreserve/?application_id=3ccd22879504be63b4ae8813635ce3d8&access_token=' + localStorage.getItem('access_token') + '&reserve_level=' + level + '&reserve_type=' + reserveType)
            .then(response =>
                console.log(response.data))
            .catch(error => console.log(error));
    }
}
