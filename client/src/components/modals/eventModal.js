import 'date-fns';
import React from "react";
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

// import moment from "moment"; //Moment library for date editting

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import { connect } from "react-redux"; //To connect react and redux
import { getEvents, addEvent } from "../../actions/eventActions"; //Import the action to add the item
import PropTypes from "prop-types";

//Toastr Part
import { toastr } from "react-redux-toastr"; //Toastr for validation notifications
import "react-redux-toastr/lib/css/react-redux-toastr.min.css"; //CSS for toastr

function MaterialUIPickers(props) {

  // The states declared for the Pickers
  const [selectedStartDate, setSelectedStartDate] = React.useState(Date.now);
  const [selectedEndDate, setSelectedEndDate] = React.useState(Date.now);
  const [modal, setModal] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [startDate, setStartDate] = React.useState(Date.now);
  const [endDate, setEndDate] = React.useState(Date.now);

  function handleStartDateChange(date) {
    //console.log(date);
    // setSelectedDate(moment(date).format('DD MM YYYY h:mm:ss'));
    setSelectedStartDate(date);
    // setStartDate(moment(startDate).format('DD MM YYYY h:mm:ss'));
    setStartDate(date);
  }

  function handleEndDateChange(date) {
    //console.log(date);
    // setSelectedDate(moment(date).format('DD MM YYYY h:mm:ss'));
    setSelectedEndDate(date);
    // setEndDate(moment(endDate).format('DD MM YYYY h:mm:ss'));
    setEndDate(date);
  }

  MaterialUIPickers.propTypes = {
    isAuthenticated: PropTypes.bool,
    addEvent: PropTypes.func.isRequired,
    getEvents: PropTypes.func.isRequired
  };

  //Toggle the modal function
  function toggle() {
    //console.log(modal);
    // setState({
    //   modal: !this.state.modal
    // });
    setModal(!modal);
  };

  //Set the state of name when the input event is fired off
  function onChange(e) {
    //We can add multiple input changes here
    //setState({ [e.target.name]: e.target.value });
    setTitle( e.target.value );
  };

  //Add the item
  function onSubmit(e) {
    e.preventDefault(); //To prevent the form from submitting naturally

    //Define the new event
    const newEvent = {
      title: title,
      startDate: startDate,
      endDate: endDate
    };

    if(startDate >= endDate)
      {
        toastr.error('Gabim', 'Data e fillimit nuk mund te jete me e madhe se data e mbarimit ose e njejte');
        return;
      }

    //Add Event via addEvent Action
    props.addEvent(newEvent);

    //Close the modal
    toggle();

    toastr.success('Shtim', 'Eventi u shtua me sukses');
    // window.location.reload(false);
  };

  return (
    <div>
      {props.isAuthenticated ? (
        <Button
          color="success"
          outline
          style={{ marginBottom: "2rem" }}
          onClick={toggle.bind(this)}
        >
          Shto Event
          </Button>
      ) : (
          <h4 className="mb-3 ml-4">Ju lutem logohuni qe te shtoni evente</h4>
        )}

      <Modal isOpen={modal} toggle={toggle} centered={true}>
        <ModalHeader toggle={toggle}>Shto te Eventet</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="title">Eventi</Label>
              <Input
                type="text"
                name="title"
                id="event"
                required={true}
                placeholder="Eventi..."
                onChange={onChange}
                className="mb-2"
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils} centered={true}>
                <Grid container>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Data fillimit"
                    format="MM/dd/yyyy"
                    value={selectedStartDate}
                    onChange={handleStartDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    className="mr-5 ml-2"
                  />
                  <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    ampm={false}
                    label="Koha e fillimit te eventit"
                    value={selectedStartDate}
                    onChange={handleStartDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change time',
                    }}
                  />
                </Grid>
                <Grid container>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Data mbarimit"
                    format="MM/dd/yyyy"
                    value={selectedEndDate}
                    onChange={handleEndDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    className="mr-5 ml-2"
                  />
                  <KeyboardTimePicker
                    margin="normal"
                    ampm={false}
                    id="time-picker"
                    label="Koha e mbarimit te eventit"
                    value={selectedEndDate}
                    onChange={handleEndDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change time',
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
              <Button color="info" outline style={{ marginTop: "2rem" }} block>
                Shto Event
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
      {modal}
    </div>
  );
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
  { getEvents, addEvent }
)(MaterialUIPickers); //Because we are using connect