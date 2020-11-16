import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import red from '@material-ui/core/colors/red';

import { connect } from 'react-redux'; //To connect react and redux

//Authentication Modals
import LoginModal from '../auth/LoginModal';
import Logout from '../auth/Logout';

const drawerWidth = 240;
const contentHeight = 1000;

//Styled Classes
const styles = (theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#1c2025',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        //alignItems: "flex",
        backgroundColor: '#282c34',
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
        float: 'left',
    },
    menuItem: {
        minHeight: '60px',
    },
    icon: {
        margin: theme.spacing(2, 2),
    },
    iconHover: {
        margin: theme.spacing(2, 2),
        '&:hover': {
            color: red[800],
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        color: '#fff',
        backgroundColor: '#282c34',
    },
    content: {
        [theme.breakpoints.down('sm')]: {
            marginLeft: 10,
            marginTop: 5,
            width: `calc(100% - ${drawerWidth}px - 10px)`,
            height: '100%',
        },
        [theme.breakpoints.up('md')]: {
            marginTop: 10,
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px - 20px)`,
            height: contentHeight,
        },
        [theme.breakpoints.up('lg')]: {
            marginTop: 10,
            width: `calc(100% - ${drawerWidth}px - 20px)`,
            height: `${contentHeight}px + 200px`,
        },
    },
    auth: {
        borderRadius: 7,
        width: '50px',
        color: 'white',
    },
    avatar: {
        float: 'right',
        marginRight: 0,
    },
    typography: {
        float: 'left',
        flexGrow: 1,
    },
});

class ResponsiveDrawer extends Component {
    state = {
        mobileOpen: false,
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        classes: PropTypes.object.isRequired,
        // Injected by the documentation to work in an iframe.
        // You won't need it on your project.
        container: PropTypes.object,
        theme: PropTypes.object.isRequired,
    };

    handleDrawerToggle = () => {
        this.setState((state) => ({ mobileOpen: !state.mobileOpen }));
    };

    //To avoid passing string in the function onClick
    dumbFunction = () => {};

    render() {
        const {
            classes,
            children,
            location: { pathname },
            isAuthenticated,
        } = this.props;

        const { mobileOpen } = this.state;

        const drawer = (
            <div>
                <Hidden smDown implementation="css">
                    <div className={classes.toolbar} />
                </Hidden>
                <MenuList className={classes.menuList}>
                    <MenuItem
                        component={Link}
                        className={classes.menuItem}
                        to="/"
                        onClick={mobileOpen ? this.handleDrawerToggle : this.dumbFunction}
                        selected={'/' === pathname}
                    >
                        Kryefaqja
                    </MenuItem>
                    <MenuItem
                        component={Link}
                        className={classes.menuItem}
                        to="/sales"
                        onClick={mobileOpen ? this.handleDrawerToggle : this.dumbFunction}
                        selected={'/sales' === pathname}
                    >
                        Shitjet
                    </MenuItem>
                    <MenuItem
                        component={Link}
                        className={classes.menuItem}
                        to="/buyings"
                        onClick={mobileOpen ? this.handleDrawerToggle : this.dumbFunction}
                        selected={'/buyings' === pathname}
                    >
                        Blerjet
                    </MenuItem>
                    <MenuItem
                        component={Link}
                        className={classes.menuItem}
                        to="/shopping"
                        onClick={mobileOpen ? this.handleDrawerToggle : this.dumbFunction}
                        selected={'/shopping' === pathname}
                    >
                        Produktet
                    </MenuItem>
                    <MenuItem
                        component={Link}
                        className={classes.menuItem}
                        to="/category"
                        onClick={mobileOpen ? this.handleDrawerToggle : this.dumbFunction}
                        selected={'/category' === pathname}
                    >
                        Kategorite
                    </MenuItem>
                    <MenuItem
                        component={Link}
                        className={classes.menuItem}
                        to="/clients"
                        onClick={mobileOpen ? this.handleDrawerToggle : this.dumbFunction}
                        selected={'/clients' === pathname}
                    >
                        Klientet
                    </MenuItem>
                    <MenuItem
                        component={Link}
                        className={classes.menuItem}
                        to="/employees"
                        onClick={mobileOpen ? this.handleDrawerToggle : this.dumbFunction}
                        selected={'/employees' === pathname}
                    >
                        Punetoret
                    </MenuItem>
                </MenuList>
            </div>
        );

        return (
            <Fragment>
                <CssBaseline />
                <div className={classes.root}>
                    <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.handleDrawerToggle}
                                className={classes.menuButton}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit" noWrap className={classes.typography}>
                                C'est Chic Saloon
                            </Typography>

                            {!isAuthenticated ? (
                                <div className={classes.auth}>
                                    <LoginModal />
                                </div>
                            ) : (
                                <div className={classes.auth}>
                                    <Logout />
                                </div>
                            )}
                        </Toolbar>
                    </AppBar>
                    <nav className={classes.drawer}>
                        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

                        <Hidden smUp implementation="css">
                            <Drawer
                                variant="temporary"
                                open={mobileOpen}
                                onClose={this.handleDrawerToggle}
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                        <Hidden smDown implementation="css">
                            <Drawer
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                                variant="permanent"
                                open
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                    </nav>
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        {isAuthenticated ? children : ''}
                    </main>
                </div>
            </Fragment>
        );
    }
}

//Mapping function
//Allow to take the sales state and maps it into a component property
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default compose(withRouter, withStyles(styles, { withTheme: true }), connect(mapStateToProps))(ResponsiveDrawer);
