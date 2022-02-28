import React from 'react';
import { CssBaseline, Drawer, Hidden, Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { createStyles } from '@mui/styles';
import { muiStyles } from '../../../styles/muiStyles';
import { useAppSelector } from '../../../../hooks';
import { selectAuth } from '../../../../modules/auth/authSlice';
import CustomDrawer from './Drawer';
import CustomAppBar from './AppBar';

const useStyles = makeStyles((theme: Theme) => createStyles(muiStyles.navBarStyles(theme)));

type OwnProps = {
    theme: Theme;
};

const Container: React.FC<OwnProps> = ({ theme, children }) => {
    const { loggedIn } = useAppSelector(selectAuth);
    const [mobileOpen, setMobileOpen] = React.useState<boolean>(false);
    const classes = useStyles();

    const handleDrawerToggle = (): void => {
        setMobileOpen(!mobileOpen);
    };

    const container = window !== undefined ? () => window.document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <CustomAppBar />
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
                                <CustomDrawer />
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
                                <CustomDrawer />
                            </Drawer>
                        </Hidden>
                    </React.Fragment>
                ) : null}
            </nav>
            <main className={classes.content}>{children}</main>
        </div>
    );
};

export default Container;
