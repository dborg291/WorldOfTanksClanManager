import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssistantPhotoIcon from '@material-ui/icons/AssistantPhoto';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import Strongholds from '../views/Strongholds';
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            zIndex: theme.zIndex.drawer + 1,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));
function NavigationDrawer(props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    function isLoggedIn() {
        if (localStorage.length === 0) {
            console.log(localStorage.length);
            return React.createElement(Button, { variant: "contained", color: "default", href: "https://api.worldoftanks.com/wot/auth/login/?application_id=3ccd22879504be63b4ae8813635ce3d8&redirect_uri=http://localhost:3000/Dashboard", disableElevation: true }, "Login");
        }
        else {
            return (React.createElement("div", null,
                React.createElement(Button, { variant: "contained", style: { backgroundColor: '#fff' }, href: "", disableElevation: true }, localStorage.getItem('nickname').substring(0, 17)),
                React.createElement(Button, { color: "secondary", href: "/", onClick: () => { localStorage.clear(); }, disableElevation: true }, "Signout")));
        }
    }
    ;
    const drawer = (React.createElement("div", null,
        React.createElement("div", { className: classes.toolbar }),
        isLoggedIn(),
        React.createElement(Divider, null),
        React.createElement(List, null, ['Dashboard', 'Strongholds', 'Clan Wars'].map((text, index) => (React.createElement(ListItem, { button: true, key: text, component: "a", href: "/" + text },
            React.createElement(ListItemIcon, null, index === 0 ? React.createElement(AssignmentIcon, null) : React.createElement(AssistantPhotoIcon, null)),
            React.createElement(ListItemText, { primary: text }))))),
        React.createElement(Divider, null)));
    const container = window !== undefined ? () => window().document.body : undefined;
    return (React.createElement("div", { className: classes.root },
        React.createElement(CssBaseline, null),
        React.createElement(AppBar, { position: "fixed", className: classes.appBar },
            React.createElement(Toolbar, null,
                React.createElement(IconButton, { color: "inherit", "aria-label": "open drawer", edge: "start", onClick: handleDrawerToggle, className: classes.menuButton },
                    React.createElement(MenuIcon, null)),
                React.createElement(Typography, { variant: "h6", noWrap: true }, "Clan Manager"))),
        React.createElement("nav", { className: classes.drawer, "aria-label": "mailbox folders" },
            React.createElement(Hidden, { smUp: true, implementation: "css" },
                React.createElement(Drawer, { container: container, variant: "temporary", anchor: theme.direction === 'rtl' ? 'right' : 'left', open: mobileOpen, onClose: handleDrawerToggle, classes: {
                        paper: classes.drawerPaper,
                    }, ModalProps: {
                        keepMounted: true,
                    } }, drawer)),
            React.createElement(Hidden, { xsDown: true, implementation: "css" },
                React.createElement(Drawer, { classes: {
                        paper: classes.drawerPaper,
                    }, variant: "permanent", open: true }, drawer))),
        React.createElement("main", { className: classes.content },
            React.createElement("div", { className: classes.toolbar }),
            React.createElement("div", { style: { textAlign: 'left' } },
                React.createElement(Router, null,
                    React.createElement(Switch, null,
                        React.createElement(Route, { path: '/Dashboard' },
                            React.createElement("h1", null, "Dashboard")),
                        React.createElement(Route, { path: '/Strongholds' },
                            React.createElement(Strongholds, null)),
                        React.createElement(Route, { path: '/Clan Wars' },
                            React.createElement("h1", null, "Clan Wars"))))))));
}
export default NavigationDrawer;
//# sourceMappingURL=NavigationDrawer.js.map