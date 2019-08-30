import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import Select from "react-select";
import { connect } from "react-redux"; //Allows to get state from redux to react component
import {
  getEmployees,
  deleteEmployee,
  getEmployeeById,
  updateEmployee
} from "../../actions/employeeActions"; //Import the actions
import PropTypes from "prop-types"; //Whenever you have component property put it inside a proptypes which is a form of validation

//Toastr Part
import { toastr } from "react-redux-toastr"; //Toastr for validation notifications
import "react-redux-toastr/lib/css/react-redux-toastr.min.css"; //CSS for toastr

//Date part
import moment from "moment"; //Moment library for date editting

//Material-UI Part
import MUIDataTable from "mui-datatables";

//
//THE WAY REDUX WORKS
//CARS => COMPONENT->ACTION->REDUCER->STORE

//Select Part
//let select_values = [];

class Employee extends Component {
  state = {
    editModal: false,
    counter: 1,
    editEmployee: {
      _id: "",
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
    }
  };

  //When you bring in an action from redux it is going to be stored as props
  static propTypes = {
    getEmployees: PropTypes.func.isRequired,
    getEmployeeById: PropTypes.func.isRequired,
    updateEmployee: PropTypes.func.isRequired,
    employee: PropTypes.object.isRequired, //Represents our state
    isAuthenticated: PropTypes.bool
  };

  componentWillMount() {
    //Runs when the component mounts
    //Here we run actions
    this._refreshItems();
  }

  //Call the delete action
  onDeleteClick = id => {
    this.props.deleteEmployee(id);
  };

  //Call the update function
  updateEmployee() {

    //Call the update action and pass the item state
    this.props.updateEmployee(this.state.editEmployee);

    //Refresh the data
    this._refreshItems();

    //Reset the state
    this.setState({
      editModal: false,
      editEmployee: {
        _id: "",
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
      }
    });
  }

  //Refresh function for the datas in the table
  _refreshItems() {
    this.props.getEmployees();
  }

  //Edit function to get the data from the table row into the state
  editEmployee(
    _id,
    name,
    surname,
    numerSigurime,
    status,
    gjendjaCivile,
    ditelindja,
    dataFillim,
    dataMbarim,
    pozicioni,
    arsimimi,
    vendlindja,
    adresa
  ) {
    this.setState({
      editEmployee: {
        _id,
        name,
        surname,
        numerSigurime,
        status,
        gjendjaCivile,
        ditelindja,
        dataFillim,
        dataMbarim,
        pozicioni,
        arsimimi,
        vendlindja,
        adresa
      },
      editModal: !this.state.editModal
    });
  }

  //Toggle the edit modal function
  toggleEdit = () => {
    this.setState({
      editModal: !this.state.editModal
    });
  };

  render() {
    const { employees } = this.props.employee; //Pull the employees

    const columns = [
      "Nr",
      "Emri",
      "Mbiemri",
      "Nr.Sigurimesh",
      "Status Pune",
      "Gjendja Civile",
      "Ditelindja",
      "Data Fillim",
      "Data Mbarim",
      "Pozicioni",
      "Arsimimi",
      "Vendlindja",
      "Adresa",
      "Fshi/Modifiko"
    ];
    const data = [];

    employees.map(
      ({
        _id,
        name,
        surname,
        numerSigurime,
        status,
        gjendjaCivile,
        ditelindja,
        dataFillim,
        dataMbarim,
        pozicioni,
        arsimimi,
        vendlindja,
        adresa,
        date
      }) =>
        data.push([
          this.state.counter,
          name,
          surname,
          numerSigurime,
          status,
          gjendjaCivile,
          ditelindja,
          dataFillim,
          dataMbarim,
          pozicioni,
          arsimimi,
          vendlindja,
          adresa,
          //moment(date).calendar(),
          <div>
            <Button
              className="remove-btn mb-2"
              outline
              color="danger"
              size="sm"
              onClick={this.onDeleteClick.bind(this, _id)}
            >
              Fshi
            </Button>
            <Button
              className="edit-btn"
              outline
              color="warning"
              size="sm"
              onClick={this.editEmployee.bind(
                this,
                _id,
                name,
                surname,
                numerSigurime,
                status,
                gjendjaCivile,
                ditelindja,
                dataFillim,
                dataMbarim,
                pozicioni,
                arsimimi,
                vendlindja,
                adresa
              )}
            >
              Modifiko
            </Button>
          </div>
        ])
    );

    //MUI-Table options
    const options = {
      filterType: "dropdown",
      selectableRows: "none",
      responsive: "scroll",
      isRowSelectable: function(dataIndex) {
        return false;
      }
    };

    return (
      <div>
        {/* Edit Modal Part */}
        <Modal
          isOpen={this.state.editModal}
          toggle={this.toggleEdit.bind(this)}
          centered={true}
        >
          <ModalHeader toggle={this.toggleEdit.bind(this)}>
            Modifiko punetore
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="name">Emri</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  value={this.state.editEmployee.name}
                  onChange={e => {
                    let { editEmployee } = this.state;
                    editEmployee.name = e.target.value;
                    this.setState({ editEmployee });
                  }}
                  style={{ marginBottom: "1rem" }}
                />
                <Label for="surname">Mbiemri</Label>
                <Input
                  type="text"
                  name="surname"
                  id="surname"
                  value={this.state.editEmployee.surname}
                  onChange={e => {
                    let { editEmployee } = this.state;
                    editEmployee.surname = e.target.value;
                    this.setState({ editEmployee });
                  }}
                  style={{ marginBottom: "1rem" }}
                />
                <Label for="numerSigurime">Numri Sigurimeve</Label>
                <Input
                  type="text"
                  name="numerSigurime"
                  id="numerSigurime"
                  value={this.state.editEmployee.numerSigurime}
                  onChange={e => {
                    let { editEmployee } = this.state;
                    editEmployee.numerSigurime = e.target.value;
                    this.setState({ editEmployee });
                  }}
                  style={{ marginBottom: "1rem" }}
                />
                <Label for="status">Statusi</Label>
                <Input
                  type="text"
                  name="status"
                  id="status"
                  value={this.state.editEmployee.status}
                  onChange={e => {
                    let { editEmployee } = this.state;
                    editEmployee.status = e.target.value;
                    this.setState({ editEmployee });
                  }}
                  style={{ marginBottom: "1rem" }}
                />
                <Label for="gjendjaCivile">Gjendja Civile</Label>
                <Input
                  type="text"
                  name="gjendjaCivile"
                  id="gjendjaCivile"
                  value={this.state.editEmployee.gjendjaCivile}
                  onChange={e => {
                    let { editEmployee } = this.state;
                    editEmployee.gjendjaCivile = e.target.value;
                    this.setState({ editEmployee });
                  }}
                  style={{ marginBottom: "1rem" }}
                />
                <Label for="ditelindje">Ditelindja</Label>
                <Input
                  type="text"
                  name="ditelindje"
                  id="ditelindje"
                  value={this.state.editEmployee.ditelindje}
                  onChange={e => {
                    let { editEmployee } = this.state;
                    editEmployee.ditelindje = e.target.value;
                    this.setState({ editEmployee });
                  }}
                  style={{ marginBottom: "1rem" }}
                />
                <Label for="datafillim">Data fillim</Label>
                <Input
                  type="text"
                  name="datafillim"
                  id="datafillim"
                  value={this.state.editEmployee.datafillim}
                  onChange={e => {
                    let { editEmployee } = this.state;
                    editEmployee.datafillim = e.target.value;
                    this.setState({ editEmployee });
                  }}
                  style={{ marginBottom: "1rem" }}
                />
                <Label for="datambarim">Data mbarim</Label>
                <Input
                  type="text"
                  name="datambarim"
                  id="datambarim"
                  value={this.state.editEmployee.datambarim}
                  onChange={e => {
                    let { editEmployee } = this.state;
                    editEmployee.datambarim = e.target.value;
                    this.setState({ editEmployee });
                  }}
                  style={{ marginBottom: "1rem" }}
                />
                <Label for="pozicioni">Pozicioni</Label>
                <Input
                  type="text"
                  name="pozicioni"
                  id="pozicioni"
                  value={this.state.editEmployee.pozicioni}
                  onChange={e => {
                    let { editEmployee } = this.state;
                    editEmployee.pozicioni = e.target.value;
                    this.setState({ editEmployee });
                  }}
                  style={{ marginBottom: "1rem" }}
                />
                <Label for="arsimimi">Arsimimi</Label>
                <Input
                  type="text"
                  name="arsimimi"
                  id="arsimimi"
                  value={this.state.editEmployee.arsimimi}
                  onChange={e => {
                    let { editEmployee } = this.state;
                    editEmployee.arsimimi = e.target.value;
                    this.setState({ editEmployee });
                  }}
                  style={{ marginBottom: "1rem" }}
                />
                <Label for="vendlindja">Vendlindja</Label>
                <Input
                  type="text"
                  name="vendlindja"
                  id="vendlindja"
                  value={this.state.editEmployee.vendlindja}
                  onChange={e => {
                    let { editEmployee } = this.state;
                    editEmployee.vendlindja = e.target.value;
                    this.setState({ editEmployee });
                  }}
                  style={{ marginBottom: "1rem" }}
                />
                <Label for="adresa">Adresa</Label>
                <Input
                  type="text"
                  name="adresa"
                  id="adresa"
                  value={this.state.editEmployee.adresa}
                  onChange={e => {
                    let { editEmployee } = this.state;
                    editEmployee.adresa = e.target.value;
                    this.setState({ editEmployee });
                  }}
                  style={{ marginBottom: "1rem" }}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              color="info"
              style={{ marginTop: "2rem" }}
              block
              outline
              onClick={this.updateEmployee.bind(this)}
            >
              Modifiko Punetor
            </Button>{" "}
            <Button
              color="danger"
              style={{ marginTop: "2rem" }}
              block
              outline
              onClick={this.toggleEdit.bind(this)}
            >
              Mbyll
            </Button>
          </ModalFooter>
        </Modal>
        {this.props.isAuthenticated ? (
          <MUIDataTable
            title={"Lista e punetoreve"}
            data={data}
            columns={columns}
            options={options}
          />
        ) : (
          ""
        )}
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
  { getEmployees, deleteEmployee, getEmployeeById, updateEmployee }
)(Employee);
