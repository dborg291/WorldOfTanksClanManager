import React, { Component, ReactElement } from 'react';

// import logo from './logo.svg';
import NavigationDrawer from './components/NavigationDrawer';
import { getUrlParam } from './utils/getUrlParam';

interface IAccountDetails {
    accessToken: string;
    nickname: string;
    accountId: string;
    expiresAt: string;
}


class App extends Component {

    checkLoginStatus(): void {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        if (urlParams.get('status') === 'ok') {

            const accountDetails: IAccountDetails = {
                accessToken: getUrlParam(urlParams, 'access_token'),
                nickname: getUrlParam(urlParams, 'nickname'),
                accountId: getUrlParam(urlParams, 'account_id'),
                expiresAt: getUrlParam(urlParams, 'expires_at')
            }

            window.history.pushState('', '', '/Dashboard');

            localStorage.setItem('access_token', accountDetails.accessToken);
            localStorage.setItem('nickname', accountDetails.nickname);
            localStorage.setItem('account_id', accountDetails.accountId);
            localStorage.setItem('expires_at', accountDetails.expiresAt);
        }
    }

    checkTokenExpiration(): void {
        var currentTime = Math.floor(new Date().getTime() / 1000);
        var expireTime = parseInt(localStorage.getItem('expires_at') ?? '', 10);

        if (currentTime > expireTime)
            localStorage.clear()
    }

    componentDidMount(): void {
        this.checkLoginStatus()
        this.checkTokenExpiration();
    }

    render(): ReactElement {
        return (
            <div className="App">
                <NavigationDrawer />
            </div>

        );
    }
}

export default App;