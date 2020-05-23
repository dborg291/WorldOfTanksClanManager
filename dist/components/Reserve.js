import React, { Component, Fragment } from 'react';
import AdditionalBriefing from '../images/additional_briefing.png';
import BattlePayents from '../images/battle_payments.png';
import MilitaryManeuvers from '../images/military_maneuvers.png';
import TacticalTraining from '../images/tactical_training.png';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
export default class Reserve extends Component {
    activateReserve(level, type) {
        axios.post('https://api.worldoftanks.com/wot/stronghold/activateclanreserve/?application_id=3ccd22879504be63b4ae8813635ce3d8&access_token=' + localStorage.getItem('access_token') + '&reserve_level=' + level + '&reserve_type=' + type)
            .then(response => console.log(response.data))
            .catch(error => console.log(error));
    }
    render() {
        return (React.createElement(Paper, { style: { margin: 8 } },
            React.createElement("div", null,
                React.createElement("div", { style: { textAlign: "center", paddingTop: 8, fontSize: 20 } },
                    React.createElement("strong", null, this.props.reserve.name)),
                (() => {
                    switch (this.props.reserve.name) {
                        case "Additional Briefing": return React.createElement("img", { src: AdditionalBriefing, alt: "Additional Briefing", style: { display: 'block', marginLeft: 'auto', marginRight: 'auto' } });
                        case "Battle Payments": return React.createElement("img", { src: BattlePayents, alt: "Battle Payments" });
                        case "Military Maneuvers": return React.createElement("img", { src: MilitaryManeuvers, alt: "Military Maneuvers" });
                        case "Tactical Training": return React.createElement("img", { src: TacticalTraining, alt: "Tactical Training" });
                        default: return null;
                    }
                })(),
                React.createElement("div", { style: { textAlign: 'center' } }, this.props.reserve.in_stock.map((element, i) => (React.createElement(Fragment, null,
                    React.createElement("div", { style: { fontSize: 16 } },
                        React.createElement(Divider, null),
                        React.createElement("div", { id: this.props.reserve.name + '.' + i, style: { padding: 8 } },
                            "Level: ",
                            element.level,
                            " ",
                            React.createElement("br", null),
                            "Bonuses",
                            React.createElement("br", null),
                            element.bonus_values.map((bonus) => (React.createElement("div", null,
                                bonus.battle_type,
                                ":",
                                React.createElement("div", null,
                                    bonus.value * 100,
                                    "%")))),
                            "Amount in Stock: ",
                            element.amount,
                            React.createElement("br", null)),
                        (() => {
                            if (element.status === "active") {
                                return React.createElement("div", { style: { color: 'green' } }, "ACTIVE NOW");
                            }
                            else if (element.status === "ready_to_activate")
                                return React.createElement(Button, { color: "primary", onClick: () => { this.activateReserve(element.level, this.props.reserve.type); }, disableElevation: true }, "Activate");
                            else if (element.status === "cannot_be_activated")
                                return React.createElement("div", { style: { color: 'red' } }, "Cannot be Activated");
                        })()))))))));
    }
}
//# sourceMappingURL=Reserve.js.map