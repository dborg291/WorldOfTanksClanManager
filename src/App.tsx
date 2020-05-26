import React, { Component, ReactElement } from 'react';

import { NavigationDrawer } from './components/NavigationDrawer';
import { getUrlParam } from './utils/getUrlParam';

interface IAccountDetails {
    accessToken: string;
    nickname: string;
    accountId: string;
    expiresAt: string;
}

export class App extends Component {

    public componentDidMount(): void {
        this.checkLoginStatus();
        this.checkTokenExpiration();
    }

    public render(): ReactElement {
        return (
            <div className="App">
                <NavigationDrawer />
            </div>

        );
    }

    private checkLoginStatus(): void {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        if (urlParams.get('status') === 'ok') {

            const accountDetails: IAccountDetails = {
                accessToken: getUrlParam(urlParams, 'access_token'),
                nickname: getUrlParam(urlParams, 'nickname'),
                accountId: getUrlParam(urlParams, 'account_id'),
                expiresAt: getUrlParam(urlParams, 'expires_at')
            };

            window.history.pushState('', '', '/Dashboard');

            localStorage.setItem('access_token', accountDetails.accessToken);
            localStorage.setItem('nickname', accountDetails.nickname);
            localStorage.setItem('account_id', accountDetails.accountId);
            localStorage.setItem('expires_at', accountDetails.expiresAt);
        }
    }

    private checkTokenExpiration(): void {
        const currentTime = Math.floor(new Date().getTime() / 1000);
        const expireTime = parseInt(localStorage.getItem('expires_at') ?? '', 10);

        if (currentTime > expireTime) {
            localStorage.clear();
        }
    }
}
