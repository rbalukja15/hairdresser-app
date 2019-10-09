import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";
import SvgIcon from "@material-ui/core/SvgIcon";
import red from "@material-ui/core/colors/red";
//import grey from "@material-ui/core/colors/grey";

//import LetterAvatars from "../admin/avatar"; //Import avatar Icons

//Authentication Modals
import LoginModal from "../auth/LoginModal";
import Logout from "../auth/Logout"; //

const drawerWidth = 240;

//Styled Classes
const styles = theme => ({
  root: {
    //display: "flex",
    //alignItems: "flex-end"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    //alignItems: "flex",
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up("sm")]: {
      display: "none"
    },
    float: "left",
  },
  icon: {
    margin: theme.spacing.unit * 2
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    "&:hover": {
      color: red[800]
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: drawerWidth + 10,
      marginTop: 5,
      width: `calc(100% - ${drawerWidth}px - 10px)`,
      height: "100%"
    },
    [theme.breakpoints.up("md")]: {
      marginTop: 10,
      width: `calc(100% - ${drawerWidth}px - 20px)`,
      height: 1000
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: 10,
      width: `calc(100% - ${drawerWidth}px - 20px)`,
      height: "100%"
    }
  },
  auth: {
    //backgroundColor: grey[400],
    borderRadius: 7
  }
  ,
  avatar: {
    float: 'right',
    marginRight: 0
  },
  typography: {
    float: "left",
  }
});

//Create the home icon svg
function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

class ResponsiveDrawer extends Component {
  state = {
    mobileOpen: false
  };

  static propTypes = {
    //auth: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    // Injected by the documentation to work in an iframe.
    // You won't need it on your project.
    container: PropTypes.object,
    theme: PropTypes.object.isRequired
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const {
      classes,
      //children,
      location: { pathname }
    } = this.props;
    //const { mobileOpen } = this.state;
    //const { isAuthenticated, user } = this.props.auth;

    const drawer = (
      <div>
        <Hidden smDown implementation="css">
          <div className={classes.toolbar} />
        </Hidden>
        <MenuList>
          <MenuItem
            component={Link}
            to="/"
            onClick={this.state.mobileOpen ? this.handleDrawerToggle : ""}
            selected={"/" === pathname}
          >
            Kryefaqja{" "}
            <HomeIcon
              className={classes.iconHover}
              color="error"
              style={{ fontSize: 30, float: "right" }}
            />
          </MenuItem>
          <MenuItem
            component={Link}
            to="/sales"
            onClick={this.state.mobileOpen ? this.handleDrawerToggle : ""}
            selected={"/sales" === pathname}
          >
            Shitjet
          </MenuItem>
          <MenuItem
            component={Link}
            to="/buyings"
            onClick={this.state.mobileOpen ? this.handleDrawerToggle : ""}
            selected={"/buyings" === pathname}
          >
            Blerjet
          </MenuItem>
          <MenuItem
            component={Link}
            to="/shopping"
            onClick={this.state.mobileOpen ? this.handleDrawerToggle : ""}
            selected={"/shopping" === pathname}
          >
            Produktet
          </MenuItem>
          <MenuItem
            component={Link}
            to="/about"
            onClick={this.state.mobileOpen ? this.handleDrawerToggle : ""}
            selected={"/about" === pathname}
          >
            Rreth Firmes
          </MenuItem>
          <MenuItem
            component={Link}
            to="/category"
            onClick={this.state.mobileOpen ? this.handleDrawerToggle : ""}
            selected={"/category" === pathname}
          >
            Kategorite
          </MenuItem>
          <MenuItem
            component={Link}
            to="/clients"
            onClick={this.state.mobileOpen ? this.handleDrawerToggle : ""}
            selected={"/clients" === pathname}
          >
            Klientet
          </MenuItem>
          <MenuItem
            component={Link}
            to="/employees"
            onClick={this.state.mobileOpen ? this.handleDrawerToggle : ""}
            selected={"/employees" === pathname}
          >
            Punetoret
          </MenuItem>
          <MenuItem
            onClick={this.state.mobileOpen ? this.handleDrawerToggle : ""}
            className={classes.auth}
          >
            <LoginModal />
          </MenuItem>
          <MenuItem
            onClick={this.state.mobileOpen ? this.handleDrawerToggle : ""}
            className={classes.auth}
          >
            <Logout />
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
              {/* <div  className={classes.avatar}>
                <LetterAvatars/>
              </div> */}
            </Toolbar>
          </AppBar>
          <nav className={classes.drawer}>
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

            <Hidden smUp implementation="css">
              <Drawer
                container={this.props.container}
                variant="temporary"
                open={this.state.mobileOpen}
                onClose={this.handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
              <Drawer
                classes={{
                  paper: classes.drawerPaper
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
            {this.props.children}
          </main>
        </div>
      </Fragment>
    );
  }
}

export default compose(
  withRouter,
  withStyles(styles, { withTheme: true })
)(ResponsiveDrawer);
