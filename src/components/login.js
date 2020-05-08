import React, { Component } from 'react'

export default class login extends Component {
    
    btnClick() {
        window.open("https://www.google.com");
    }
    render() {
        return (<div>
                <ButtonComponent cssClass='e-link' onClick={this.btnClick.bind(this)}>Go to google</ButtonComponent>
            </div>);
    }
}
