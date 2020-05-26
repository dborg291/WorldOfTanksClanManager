import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {
    AppBar, Button, CssBaseline, Divider, Drawer, Hidden, IconButton, List, ListItem, ListItemIcon,
    ListItemText, makeStyles, Toolbar, Typography, useTheme
} from '@material-ui/core';
import { AssignmentInd, AssistantPhoto, Menu as MenuIcon } from '@material-ui/icons';

import { Strongholds } from '../views/Strongholds';

const drawerWidth: number = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0
        }
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            zIndex: theme.zIndex.drawer + 1
        }
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        }
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    }
}));

export function NavigationDrawer(props: any): ReactElement {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    function isLoggedIn(): ReactElement {
        if (localStorage.length === 0) {
            console.log(localStorage.length);
            return <Button variant="contained" color="default" href="https://api.worldoftanks.com/wot/auth/login/?application_id=3ccd22879504be63b4ae8813635ce3d8&redirect_uri=https://www.wotclanmanager.com/" disableElevation>Login</Button>;
        } else {
            return (
                <div>``
                    <Button variant="contained" style={{ backgroundColor: '#fff' }} href="" disableElevation>
                        {
                        localStorage.getItem('nickname')
                        ?.substring(0, 17)
                        }
                    </Button>
                    <Button color="secondary" href="/" onClick={() => { localStorage.clear(); }} disableElevation>Signout</Button>
                </div>
            );
        }
    }

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            {isLoggedIn()}
            <Divider />
            <List>
                {['Dashboard', 'Strongholds', 'Clan Wars'].map((text, index) => (
                    <ListItem button key={text} component="a" href={`/${text.toLowerCase()}`}>
                        <ListItemIcon >{index === 0 ? <AssignmentInd /> : <AssistantPhoto />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;
    const direction: "bottom" | "left" | "right" | "top" | undefined = theme.direction === 'rtl' ? 'right' : 'left';
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar} >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton} >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Clan Manager
                    </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={direction}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{paper: classes.drawerPaper}
                        } ModalProps={{ keepMounted: true }} > {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer classes={{ paper: classes.drawerPaper }} variant="permanent" open > {drawer} </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <div style={{ textAlign: 'left' }}>
                    <Router>
                        <Switch>
                            <Route path='/dashboard'>
                                <h1>Dashboard</h1>
                            </Route>
                            <Route path='/strongholds'>
                                <Strongholds />
                            </Route>
                            <Route path='/clan Wars'>
                                <h1>Clan Wars</h1>
                            </Route>
                        </Switch>
                    </Router>
                </div>
            </main>
        </div>
    );
}
