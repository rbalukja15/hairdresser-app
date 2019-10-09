import React, { Component } from "react";
// import PropTypes from "prop-types";

// Material components
import { Typography } from "@material-ui/core";
import { Paper } from "@material-ui/core";
// Material helpers
// import { withStyles } from "@material-ui/core";

class SalesInfo extends Component {
  render() {
    return (
      <Paper style={{ marginBottom: "2rem", width: "400px" }}>
          <Typography variant="body2">Shpenzimet Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum saepe eos hic unde dolorum aliquid qui ut quis, ab, dolorem neque soluta! Placeat facere quae voluptate quod eligendi odit totam? </Typography>
      </Paper>
    );
  }
}

export default SalesInfo;
