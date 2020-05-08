import React, { Component } from 'react';
// import logo from './logo.svg';
import NavigationDrawer from './components/NavigationDrawer';
import './App.css';
// import axios from 'axios';

class App extends Component{

    state = {
            access_token: null,
            nickname: null,
            account_id: null,
    }


    checkLoginStatus(){
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        if(urlParams.get('status') === 'ok')
        {
            var accessToken = urlParams.get('access_token');
            var name = urlParams.get('nickname');
            var accountID = urlParams.get('account_id');
            this.setState({
                access_token: accessToken,
                nickname: name,
                account_id: accountID
            })
            window.history.pushState('','', '/');
        }else
        {

        }
    }

    componentDidMount()
    {
        this.checkLoginStatus()
    }

    render(){
        return(
            <div className="App">
                <NavigationDrawer userInfo = {this.state}/>
            </div>
          );
        }
}

export default App;