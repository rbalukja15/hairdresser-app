import React, { Component } from 'react';
import { Container } from 'reactstrap';
//Date part
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import '../sass/styles.scss';

//Toastr Part
import { toastr } from 'react-redux-toastr'; //Toastr for validation notifications
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'; //CSS for toastr

//Events Part
import { connect } from 'react-redux'; //Allows to get state from redux to react component
import { getEvents, deleteEvent, getEventById, updateEvent } from '../actions/eventActions'; //Import the actions
import PropTypes from 'prop-types'; //Whenever you have component property put it inside a proptypes which is a form of validation

//Event Modal
import MaterialUIPickers from './modals/event/eventModal';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

//Toastr confirm options
const toastrConfirmOptions = {
    buttons: [
        {
            text: 'Fshi',
            className: 'btn btn-outline-danger',
            handler: () => {},
        },
        {
            cancel: true, // move the cancel button to the end
        },
    ],
    disableCancel: true,
    style: {
        fontSize: '26px',
    },
};

const containerStyle = {
    marginTop: '40px',
    marginLeft: '10px',
    height: '800px',
};

const localizer = momentLocalizer(moment);

class Home extends Component {
    state = {
        event: {
            id: '',
            title: '',
            start: '',
            end: '',
        },
    };

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
        isAuthenticated: PropTypes.bool,
    };

    callBackFunction = (value) => {
        console.log('The selection is  -> ', value);
    };

    handleEventClick = (event) => {
        toastr.confirm(<span style={{ fontSize: 20 }}>{event.title}</span>, toastrConfirmOptions);
        toastrConfirmOptions.buttons[0].handler = () => {
            this.props.deleteEvent(event.id);
            toastr.success('Eventi u fshi me sukses');
        };
    };

    render() {
        const { events } = this.props.event;

        const myEventsList = [];

        events.map(({ _id, title, startDate, endDate }) =>
            myEventsList.push({
                id: _id,
                title: title,
                start: new Date(startDate),
                end: new Date(endDate),
            }),
        );

        return (
            <Grid container>
                <Grid item xs={12}>
                    <Paper style={{ width: `calc(100vw - 288px)` }}>
                        <MaterialUIPickers name="mario" />
                        <Calendar
                            popup
                            localizer={localizer}
                            events={myEventsList}
                            onSelectEvent={(event) => {
                                this.setState({
                                    event: event,
                                });
                                this.handleEventClick(event);
                            }}
                            startAccessor="start"
                            endAccessor="end"
                            defaultView="day"
                        />
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

//Mapping function
//Allow to take the items state and maps it into a component property
const mapStateToProps = (state) => ({
    event: state.event,
    isAuthenticated: state.auth.isAuthenticated,
});

//Connect takes as parameters the action and our mapping function
export default connect(mapStateToProps, { getEvents, deleteEvent, getEventById, updateEvent })(Home);
