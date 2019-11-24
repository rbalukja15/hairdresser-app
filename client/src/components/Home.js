import React, { Component } from "react";
import { Container } from "reactstrap";
//import Calendar from "react-material-ui-calendar";
//import Background from '../images/homeBcg';
//Date part
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import '../sass/styles.scss'

//Toastr Part
import { toastr } from "react-redux-toastr"; //Toastr for validation notifications
import "react-redux-toastr/lib/css/react-redux-toastr.min.css"; //CSS for toastr

//Events Part
import { connect } from "react-redux"; //Allows to get state from redux to react component
import {
  getEvents,
  deleteEvent,
  getEventById,
  updateEvent
} from "../actions/eventActions"; //Import the actions
import PropTypes from "prop-types"; //Whenever you have component property put it inside a proptypes which is a form of validation

//Event Modal
// import MaterialUIPickers from "./modals/testModal";
import MaterialUIPickers from "./modals/event/eventModal";

const containerStyle = {
  marginTop: "40px",
  marginLeft: "10px",
  height: "800px"
};

const localizer = momentLocalizer(moment)
class Home extends Component {

  state = {
    event: {
      title: "",
      start: "",
      end: ""
    }
  }

  componentWillMount() {
    //Runs when the component mounts
    //Here we run actions
    this._refreshEvents();
  }

  //Refresh function for the datas in the table
  _refreshEvents() {
    this.props.getEvents();
  }

  //When you bring in an action from redux it is going to be stored as props
  static propTypes = {
    getEvents: PropTypes.func.isRequired,
    getEventById: PropTypes.func.isRequired,
    updateEvent: PropTypes.func.isRequired,
    event: PropTypes.object.isRequired, //Represents our state
    isAuthenticated: PropTypes.bool
  };

  callBackFunction = value => {
    console.log("The selection is  -> ", value);
  };

  render() {
    
    const { events } = this.props.event;

    const myEventsList = [];

    events.map(
      ({ _id, title, startDate, endDate }) => 
          myEventsList.push(
            {
              'title':title,
              'start':new Date(startDate),
              'end':new Date(endDate),
              
            }
          )
    );

    return (
      <Container style={containerStyle}>
        <MaterialUIPickers />
        <Calendar
          popup
          localizer={localizer}
          events={myEventsList}
          onSelectEvent={ event => {
              toastr.info(event.title + "    " + moment(event.start).format('DD-MM-YYYY hh:mm:ss'));
              this.setState({
                event: event
              });
          }}
          startAccessor="start"
          endAccessor="end"
          defaultView="day"
        />
      </Container>
    );
  }
}

//Mapping function
//Allow to take the items state and maps it into a component property
const mapStateToProps = state => ({
  event: state.event,
  isAuthenticated: state.auth.isAuthenticated
});

//Connect takes as parameters the action and our mapping function
export default connect(
  mapStateToProps,
  { getEvents, deleteEvent, getEventById, updateEvent}
)(Home);
