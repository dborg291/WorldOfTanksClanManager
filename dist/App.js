import React, { Component } from 'react';
import NavigationDrawer from './components/NavigationDrawer';
import './App.css';
class App extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            access_token: null,
            nickname: null,
            account_id: null,
        };
    }
    checkLoginStatus() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        if (urlParams.get('status') === 'ok') {
            var accessToken = urlParams.get('access_token');
            var name = urlParams.get('nickname');
            var accountID = urlParams.get('account_id');
            var expiresAt = urlParams.get('expires_at');
            window.history.pushState('', '', '/Dashboard');
            localStorage.setItem('access_token', accessToken);
            localStorage.setItem('nickname', name);
            localStorage.setItem('account_id', accountID);
            localStorage.setItem('expires_at', expiresAt);
        }
    }
    checkTokenExpiration() {
        var currentTime = Math.floor(new Date().getTime() / 1000);
        var expireTime = parseInt(localStorage.getItem('expires_at'), 10);
        if (currentTime > expireTime)
            localStorage.clear();
    }
    componentDidMount() {
        this.checkLoginStatus();
        this.checkTokenExpiration();
    }
    render() {
        return (React.createElement("div", { className: "App" },
            React.createElement(NavigationDrawer, null)));
    }
}
export default App;
//# sourceMappingURL=App.js.map