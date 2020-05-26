import Axios from 'axios';
import React, { Component, ReactElement } from 'react';

import { IReserve, Reserve } from '../components/Reserve';

export interface IReserveCard {
    name: string;
    bonusType: string;
    disposable: string;
    inStock: IReserve[];
    reserveType: string;
}

interface IState {
    reserveCards: IReserveCard[];
    isLoading: boolean;
    errors: Error[];
    activeReserves: IReserve[];
}

export class Strongholds extends Component {

    public state: IState = {
        reserveCards: [],
        isLoading: true,
        errors: [],
        activeReserves: []
    };

    public componentDidMount(): void {
        Axios.get(`https://api.worldoftanks.com/wot/stronghold/clanreserves/?application_id=3ccd22879504be63b4ae8813635ce3d8&access_token=${localStorage.getItem('access_token')}`)
            .then(response =>
                // tslint:disable-next-line
                response.data.data.map((reserveCard: any): IReserveCard => (
                    {
                        name: reserveCard.name,
                        bonusType: reserveCard.bonus_type,
                        disposable: reserveCard.disposable,
                        inStock: reserveCard.in_stock,
                        reserveType: reserveCard.type
                    }
                )))
            .then((reserves: IReserveCard[]) => {
                const newState: IState = {
                    reserveCards: reserves,
                    isLoading: false,
                    errors: [],
                    activeReserves: []
                };
                this.setState(newState);
                console.log(reserves);
            })
            .catch(error => this.setState({ error, isLoading: false }));
    }

    public render(): ReactElement {
        return (
            <div>
                {this.state.reserveCards.map((reserveCard: IReserveCard) => { console.log('creating card...', reserveCard); return (<Reserve {...reserveCard} />); })}
            </div>
        );
    }
}
