import React, { Component } from "react";

//Redux Part
import { connect } from "react-redux"; //Allows to get state from redux to react component
import { getItems, deleteItem } from "../../actions/itemActions"; //Import the actions
import PropTypes from "prop-types"; //Whenever you have component property put it inside a proptypes which is a form
// import { compose } from "recompose";

//Import the needed components
import Expenses from "./aboutComponents/Expenses";
import SalesInfo from "./aboutComponents/SalesInfo"; 

//Material-UI Part
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const smWidth = 340;

//Styling classes
const useStyles = theme => ({
  root: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${smWidth}px - 20px)`,
      flexShrink: 0
    }
    //flexGrow: 1
  },
  paperGrid: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${smWidth}px - 20px)`,
      flexShrink: 0
    },
    padding: theme.spacing.unit * 3
  },
  paper: {
    padding: theme.spacing.unit * 3,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

class about_component extends Component {
  //When you bring in an action from redux it is going to be stored as props
  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  render() {
    const classes = useStyles;

    return (
      <Grid  smUp container spacing={3} style={{ margin: "1rem , auto" }} className={classes.root}>
        <Grid smUp item xs={6} className={classes.paperGrid}>
          <Expenses className={classes.paper} />
        </Grid>
        <Grid smUp item xs={6} className={classes.paperGrid}>
          <SalesInfo className={classes.paper} />
        </Grid>
      </Grid>
    );
  }
}

//Mapping function
//Allow to take the items state and maps it into a component property
const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

//Connect takes as parameters the action and our mapping function
export default connect(
  mapStateToProps,
  { getItems, deleteItem },
  withStyles(useStyles, { withTheme: true })
)(about_component);
