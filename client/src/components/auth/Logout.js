import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import PropTypes from 'prop-types';
import Button from "reactstrap/es/Button";

export class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  };

  render() {
    return (
      <Fragment>
        <Button color="inherit" onClick={this.props.logout} href='#' style={{color: 'white', fontSize: 16}}>
          Logout
        </Button>
      </Fragment>
    );
  }
}

export default connect(
  null,
  { logout }
)(Logout);