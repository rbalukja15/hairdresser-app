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
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux'; //To connect react and redux

//Authentication Modals
import LoginModal from '../auth/LoginModal';
import Logout from '../auth/Logout';

// Styles
import { styles } from './material.styles';
import { muiTheme } from '../../shared/material.theme';

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
                        className={pathname === '/' ? classes.selectedMenuItem : classes.menuItem}
                        to="/"
                        onClick={mobileOpen ? this.handleDrawerToggle : this.dumbFunction}
                    >
                        Kryefaqja
                    </MenuItem>
                    <MenuItem
                        component={Link}
                        className={pathname === '/sales' ? classes.selectedMenuItem : classes.menuItem}
                        to="/sales"
                        onClick={mobileOpen ? this.handleDrawerToggle : this.dumbFunction}
                    >
                        Shitjet
                    </MenuItem>
                    <MenuItem
                        component={Link}
                        className={pathname === '/buyings' ? classes.selectedMenuItem : classes.menuItem}
                        to="/buyings"
                        onClick={mobileOpen ? this.handleDrawerToggle : this.dumbFunction}
                    >
                        Blerjet
                    </MenuItem>
                    <MenuItem
                        component={Link}
                        className={pathname === '/shopping' ? classes.selectedMenuItem : classes.menuItem}
                        to="/shopping"
                        onClick={mobileOpen ? this.handleDrawerToggle : this.dumbFunction}
                    >
                        Produktet
                    </MenuItem>
                    <MenuItem
                        component={Link}
                        className={pathname === '/category' ? classes.selectedMenuItem : classes.menuItem}
                        to="/category"
                        onClick={mobileOpen ? this.handleDrawerToggle : this.dumbFunction}
                    >
                        Kategorite
                    </MenuItem>
                    <MenuItem
                        component={Link}
                        className={pathname === '/clients' ? classes.selectedMenuItem : classes.menuItem}
                        to="/clients"
                        onClick={mobileOpen ? this.handleDrawerToggle : this.dumbFunction}
                    >
                        Klientet
                    </MenuItem>
                    <MenuItem
                        component={Link}
                        className={pathname === '/employees' ? classes.selectedMenuItem : classes.menuItem}
                        to="/employees"
                        onClick={mobileOpen ? this.handleDrawerToggle : this.dumbFunction}
                    >
                        Punetoret
                    </MenuItem>
                </MenuList>
            </div>
        );

        return (
            <MuiThemeProvider theme={muiTheme()}>
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
            </MuiThemeProvider>
        );
    }
}

//Mapping function
//Allow to take the sales state and maps it into a component property
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default compose(withRouter, withStyles(styles, { withTheme: true }), connect(mapStateToProps))(ResponsiveDrawer);
