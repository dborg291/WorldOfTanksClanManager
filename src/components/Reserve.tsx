import { Card } from '@material-ui/core';
import axios from 'axios';
import { PrimaryButton, Separator, Text } from 'office-ui-fabric-react';
import React, { Component } from 'react';
import AdditionalBriefing from '../images/additional_briefing.png';
import BattlePayents from '../images/battle_payments.png';
import MilitaryManeuvers from '../images/military_maneuvers.png';
import TacticalTraining from '../images/tactical_training.png';
import { IReserveCard } from '../views/Strongholds';

export interface IReserve {
    action_time: number;
    activatedAt?: string;
    activeTill?: string;
    amount: number;
    bonus_values: IBonusValue[];
    level: number;
    status: string;
    x_level_only: boolean;
}

export interface IBonusValue {
    value: number;
    battle_type: string;
}

export class Reserve extends Component<IReserveCard> {

    public render(): React.ReactElement {
        console.log('reserve render func', this.props);
        return (
            <div style={{width: 280}}>
                    <Card style= {{margin: 6}}>
                    <Text variant='xLarge' style={{marginLeft: 8, marginTop: 4}}>{this.props.name}<br/></Text>
                    {(() => {
                            switch (this.props.name) {
                                case "Additional Briefing": return <img src={AdditionalBriefing} alt="Additional Briefing" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />;
                                case "Battle Payments": return <img src={BattlePayents} alt="Battle Payments" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}/>;
                                case "Military Maneuvers": return <img src={MilitaryManeuvers} alt="Military Maneuvers" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}/>;
                                case "Tactical Training": return <img src={TacticalTraining} alt="Tactical Training" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}/>;
                                default: return undefined;
                            }
                        })()}
                            {
                                this.props.inStock.map((reserve: IReserve, i: number) => (
                                    <div style={{ fontSize: 16 }} key={i}>
                                        <Separator />
                                        <div style={{marginLeft: 8}}>
                                            <Text variant='mediumPlus'>Level: {reserve.level} <br /></Text>
                                            <Text variant='mediumPlus'>Bonuses:<br /></Text>
                                            {
                                                reserve.bonus_values?.map((bonus: IBonusValue) => (
                                                    <ul style={{paddingLeft: 20, margin: 0, marginRight: 8}} key={bonus.battle_type+'.'+i}>
                                                        <li><Text>{bonus.battle_type}: {bonus.value * 100}%</Text></li>
                                                    </ul>
                                                ))
                                            }
                                            <Text variant= 'mediumPlus'>Durration: {reserve.action_time / 3600} hours <br /></Text>
                                            <Text variant='mediumPlus'>Amount in Stock: {reserve.amount}<br /></Text>
                                        </div>
                                        {(() => {
                                            if (reserve.status === "active") {
                                                return <Text variant='large' style={{marginLeft: '55%', marginTop: 8, marginBottom: 6}} >Currently Active</Text>;
                                            } else if (reserve.status === "ready_to_activate") {
                                                return <PrimaryButton style={{marginLeft: '55%', marginTop: 8, marginBottom: 6}} text="Activate" onClick={() => { this.activateReserve(reserve.level, this.props.reserveType); }} allowDisabledFocus />;
                                            } else if (reserve.status === "cannot_be_activated") {
                                                return <PrimaryButton style={{marginLeft: '55%', marginTop: 8, marginBottom: 6}} text="Activate" onClick={() => { this.activateReserve(reserve.level, this.props.reserveType); }} allowDisabledFocus disabled={true} />;
                                            } else {
                                                return;
                                            }
                                        })()}
                                    </div>
                                ))
                            }
                    </Card>
            </div>
        );
    }

    private activateReserve(level: number, reserveType: string): void {
        axios.post('https://api.worldoftanks.com/wot/stronghold/activateclanreserve/?application_id=3ccd22879504be63b4ae8813635ce3d8&access_token=' + localStorage.getItem('access_token') + '&reserve_level=' + level + '&reserve_type=' + reserveType)
            .then(response =>
                console.log(response.data))
            .catch(error => console.log(error));
    }
}
