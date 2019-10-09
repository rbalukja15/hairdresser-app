import React, { Component } from "react";
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
//import Select from "react-select";
import { connect } from "react-redux"; //To connect react and redux
import { addEmployee } from "../../../actions/employeeActions"; //Import the action to add the item
import PropTypes from "prop-types";

//Materia-Ui Design
// const styles = theme => ({
//   root: {
//     justifyContent: "center",
//     marginLeft: 10
//   },
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2)
//   },
//   fab: {
//     margin: theme.spacing(1),
//     justifyContent: "center"
//   },
//   modal: {
//     marginBottom: theme.spacing(2),
//     marginTop: 30,
//     size: "md"
//   },
//   div: {
//     marginLeft: "50%"
//   }
// });

class EmployeeModal extends Component {
  //Define the states
  state = {
    modal: false, //Determine the state of the modal
    name: "",
    surname: "",
    numerSigurime: "",
    status: "",
    gjendjaCivile: "",
    ditelindja: "",
    dataFillim: "",
    dataMbarim: "",
    pozicioni: "",
    arsimimi: "",
    vendlindja: "",
    adresa: ""
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  componentWillMount() {
    //Runs when the component mounts
    //Here we run actions
  }

  //Toggle the modal function
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  //Set the state of name when the input event is fired off
  onChange = e => {
    //We can add multiple input changes here
    this.setState({ [e.target.name]: e.target.value });
  };

  //Add the item
  onSubmit = e => {
    e.preventDefault(); //To prevent the form from submitting naturally

    //Define the new item
    const newEmployee = {
      name: this.state.name,
      kodi: this.state.kodi,
      cmimBlerje: this.state.cmimBlerje,
      prodhuesi: this.state.prodhuesi,
      shitesi: this.state.shitesi,
      category: this.state.category
    };

    //Add Item via addItem Action
    this.props.addEmployee(newEmployee);

    //Close the modal
    this.toggle();
  };

  //Handle select input option
  handleChange = category => {
    this.setState({ category: category.value });
    //console.log(`Option selected:`, category.value);
  };

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Button
            style={{ marginBottom: "2rem" }}
            onClick={this.toggle.bind(this)}
            outline
            color="success"
          >
            Shto Punetor
          </Button>
        ) : (
          <h4 className="mb-3 ml-4">Logohu qe te shtosh punetor</h4>
        )}

        <Modal isOpen={this.state.modal} toggle={this.toggle} centered={true}>
          <ModalHeader toggle={this.toggle}>Shto punetor</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">Emri</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Emri..."
                  onChange={this.onChange}
                  required
                  style={{ marginBottom: "1rem" }}
                />
                <Label for="surname">Mbiemri</Label>
                <Input
                  type="text"
                  name="surname"
                  id="surname"
                  placeholder="Mbiemri..."
                  onChange={this.onChange}
                  required
                  style={{ marginBottom: "1rem" }}
                />
                <Label for="numerSigurime">Numri Sigurimeve</Label>
                <Input
                  type="text"
                  name="numerSigurime"
                  id="numerSigurime"
                  placeholder="Numri sigurimeve..."
                  onChange={this.onChange}
                  required
                  style={{ marginBottom: "1rem" }}
                />
                <Label for="status">Statusi</Label>
                <Input
                  type="text"
                  name="status"
                  id="status"
                  placeholder="Statusi punes..."
                  onChange={this.onChange}
                  required
                  style={{ marginBottom: "1rem" }}
                />
                <Label for="gjendjaCivile">Gjendja Civile</Label>
                <Input
                  type="text"
                  name="gjendjaCivile"
                  id="gjendjaCivile"
                  placeholder="Gjendja civile..."
                  onChange={this.onChange}
                  required
                  style={{ marginBottom: "1rem" }}
                />
                <Label for="ditelindje">Ditelindja</Label>
                <Input
                  type="text"
                  name="ditelindje"
                  id="ditelindje"
                  placeholder="Ditelindja..."
                  onChange={this.onChange}
                  required
                  style={{ marginBottom: "1rem" }}
                />
                <Label for="datafillim">Data fillim</Label>
                <Input
                  type="text"
                  name="datafillim"
                  id="datafillim"
                  placeholder="Datafillim..."
                  onChange={this.onChange}
                  required
                  style={{ marginBottom: "1rem" }}
                />
                <Label for="pozicioni">Pozicioni</Label>
                <Input
                  type="text"
                  name="pozicioni"
                  id="pozicioni"
                  placeholder="Pozicioni..."
                  onChange={this.onChange}
                  required
                  style={{ marginBottom: "1rem" }}
                />
                <Label for="arsimimi">Arsimimi</Label>
                <Input
                  type="text"
                  name="arsimimi"
                  id="arsimimi"
                  placeholder="Arsimimi..."
                  onChange={this.onChange}
                  required
                  style={{ marginBottom: "1rem" }}
                />
                <Label for="vendlindja">Vendlindja</Label>
                <Input
                  type="text"
                  name="vendlindja"
                  id="vendlindja"
                  placeholder="Vendlindja..."
                  onChange={this.onChange}
                  required
                  style={{ marginBottom: "1rem" }}
                />
                <Label for="adresa">Adresa</Label>
                <Input
                  type="text"
                  name="adresa"
                  id="adresa"
                  placeholder="Adresa..."
                  onChange={this.onChange}
                  required
                  style={{ marginBottom: "1rem" }}
                />
                <Button
                  color="info"
                  style={{ marginTop: "2rem" }}
                  block
                  outline
                >
                  Shto Punetor
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

//Mapping function
//Allow to take the employees state and maps it into a component property
const mapStateToProps = state => ({
  employee: state.employee,
  isAuthenticated: state.auth.isAuthenticated
});

//Connect takes as parameters the action and our mapping function
export default connect(
  mapStateToProps,
  { addEmployee }
)(EmployeeModal); //Because we are using connect
