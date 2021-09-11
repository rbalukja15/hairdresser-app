import React, { FunctionComponent, PropsWithChildren, ReactElement } from 'react';
import {
    AppBar,
    CssBaseline,
    Divider,
    Drawer,
    Hidden,
    IconButton,
    Toolbar,
    Typography,
    List,
    ListItem,
    ListItemText,
    ThemeOptions,
    Button,
    Collapse,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { Link, withRouter } from 'react-router-dom';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import { IPublicNavBar } from './header.interfaces';
import { useAppSelector } from '../../../../hooks';
import { selectAuth } from '../../../../modules/auth/authSlice';
import { muiStyles } from '../../../styles/muiStyles';
import CategoryIcon from '@material-ui/icons/Category';

const PublicNavbar = (props: PropsWithChildren<IPublicNavBar>): ReactElement<FunctionComponent<IPublicNavBar>> => {
    const { loggedIn } = useAppSelector(selectAuth);
    const {
        window,
        classes,
        theme,
        children,
        location: { pathname },
    } = props;
    const [mobileOpen, setMobileOpen] = React.useState<boolean>(false);
    const [menuListOpen, setMenuListOpen] = React.useState<boolean>(true);
    const [appliedTheme, setAppliedTheme] = React.useState<boolean>(false);
    const icon = !appliedTheme ? <Brightness7Icon /> : <Brightness3Icon />;
    const applyTheme = () =>
        muiStyles.getMuiTheme(
            appliedTheme ? (muiStyles.lightTheme as ThemeOptions) : (muiStyles.darkTheme as ThemeOptions),
        );

    const handleClick = (): void => {
        setMenuListOpen(!menuListOpen);
    };

    const handleDrawerToggle = (): void => {
        setMobileOpen(!mobileOpen);
    };

    const drawer: JSX.Element = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List component="nav" aria-labelledby="nested-list-subheader" className={classes.list}>
                <ListItem button onClick={handleClick} className={classes.menuItem}>
                    <ListItemText primary={'Actions'} />
                    {menuListOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={menuListOpen} timeout="auto" unmountOnExit>
                    <List component={'div'} disablePadding>
                        <ListItem
                            component={Link}
                            className={pathname === '/products' ? classes.selectedListItem : classes.listItem}
                            to={'/products'}
                        >
                            <CategoryIcon />
                            <ListItemText primary={'Products'} className={classes.listItemText} />
                        </ListItem>
                    </List>
                </Collapse>
            </List>
        </div>
    );

    const container = window !== undefined ? () => window.document.body : undefined;

    return (
        <MuiThemeProvider theme={applyTheme()}>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h5" noWrap className={classes.typography}>
                            C&apos;est Chic
                        </Typography>
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            <Button
                                className={classes.changeThemeButton}
                                startIcon={icon}
                                onClick={() => setAppliedTheme(!appliedTheme)}
                            >
                                Change Theme
                            </Button>
                        </div>
                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer} aria-label="mailbox folders">
                    {loggedIn ? (
                        <React.Fragment>
                            <Hidden smUp implementation="css">
                                <Drawer
                                    container={container}
                                    variant="temporary"
                                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                                    open={mobileOpen}
                                    onClose={handleDrawerToggle}
                                    classes={{
                                        paper: classes.drawerPaper,
                                    }}
                                    ModalProps={{
                                        keepMounted: true,
                                    }}
                                >
                                    {drawer}
                                </Drawer>
                            </Hidden>
                            <Hidden xsDown implementation="css">
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
                        </React.Fragment>
                    ) : null}
                </nav>
                <main className={classes.content}>{children}</main>
            </div>
        </MuiThemeProvider>
    );
};

export default compose<IPublicNavBar, Record<string, unknown>>(
    withRouter,
    withStyles(muiStyles.navBarStyles, { withTheme: true }),
)(PublicNavbar);
