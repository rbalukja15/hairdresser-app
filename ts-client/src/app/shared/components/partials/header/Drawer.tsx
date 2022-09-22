import React from 'react';
import { Collapse, Divider, List, ListItem, ListItemText, Theme } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Link, withRouter } from 'react-router-dom';
import { createStyles } from '@mui/styles';
import CategoryIcon from '@mui/icons-material/Category';
import makeStyles from '@mui/styles/makeStyles';
import { muiStyles } from '../../../styles/muiStyles';

const useStyles = makeStyles((theme: Theme) => createStyles(muiStyles.navBarStyles(theme)));

const CustomDrawer = (props: any) => {
    const [menuListOpen, setMenuListOpen] = React.useState<boolean>(true);
    const classes = useStyles();

    const handleClick = (): void => {
        setMenuListOpen(!menuListOpen);
    };

    return (
        <>
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
                            className={
                                props.location.pathname === '/buyings' ? classes.selectedListItem : classes.listItem
                            }
                            to={'/buyings'}
                        >
                            <CategoryIcon />
                            <ListItemText primary={'Buyings'} className={classes.listItemText} />
                        </ListItem>
                        <ListItem
                            component={Link}
                            className={
                                props.location.pathname === '/products' ? classes.selectedListItem : classes.listItem
                            }
                            to={'/products'}
                        >
                            <CategoryIcon />
                            <ListItemText primary={'Products'} className={classes.listItemText} />
                        </ListItem>
                    </List>
                </Collapse>
            </List>
        </>
    );
};

export default withRouter(CustomDrawer);
