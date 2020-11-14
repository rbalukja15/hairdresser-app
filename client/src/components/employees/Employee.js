import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from 'reactstrap';
import { connect } from 'react-redux'; //Allows to get state from redux to react component
import { getEmployees, deleteEmployee, getEmployeeById, updateEmployee } from '../../actions/employeeActions'; //Import the actions
import PropTypes from 'prop-types'; //Whenever you have component property put it inside a proptypes which is a form of validation

//Toastr Part
import { toastr } from 'react-redux-toastr'; //Toastr for validation notifications
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'; //CSS for toastr

//Date part
import moment from 'moment'; //Moment library for date editting

//Material-UI Part
import MUIDataTable from 'mui-datatables';

//
//THE WAY REDUX WORKS
//CARS => COMPONENT->ACTION->REDUCER->STORE

//Toastr confirm options
const toastrConfirmOptions = {
    onOk: () => {},
    onCancel: () => {
        console.log('CANCEL: clicked');
        return;
    },
};

class Employee extends Component {
    state = {
        editModal: false,
        counter: 1,
        editEmployee: {
            _id: '',
            name: '',
            surname: '',
            numerSigurime: '',
            pozicioni: '',
            adresa: '',
            paga: 0,
        },
    };

    //When you bring in an action from redux it is going to be stored as props
    static propTypes = {
        getEmployees: PropTypes.func.isRequired,
        getEmployeeById: PropTypes.func.isRequired,
        updateEmployee: PropTypes.func.isRequired,
        employee: PropTypes.object.isRequired, //Represents our state
        isAuthenticated: PropTypes.bool,
    };

    componentWillMount() {
        //Runs when the component mounts
        //Here we run actions
        this._refreshItems();
    }

    //Call the delete action
    onDeleteClick = (id) => {
        toastr.confirm('Je e sigurte ?', toastrConfirmOptions);
        toastrConfirmOptions.onOk = () => {
            this.props.deleteEmployee(id);
            console.log('Employee Deleted');
            toastr.success('Punetori u fshi me sukses');
        };
    };

    //Call the update function
    updateEmployee() {
        //Call the update action and pass the item state
        this.props.updateEmployee(this.state.editEmployee);

        //Refresh the data
        this._refreshItems();

        this.componentWillMount();

        toastr.success('Modifikim', `Punetori ${this.state.editEmployee.name} u modifikua me sukses`);

        //Reset the state
        this.setState({
            editModal: false,
            counter: 1,
            editEmployee: {
                _id: '',
                name: '',
                surname: '',
                numerSigurime: '',
                pozicioni: '',
                adresa: '',
                paga: 0,
            },
        });
    }

    //Refresh function for the datas in the table
    _refreshItems() {
        this.props.getEmployees();
    }

    //Edit function to get the data from the table row into the state
    editEmployee(_id, name, surname, numerSigurime, pozicioni, adresa, paga) {
        this.setState({
            editEmployee: {
                _id,
                name,
                surname,
                numerSigurime,
                pozicioni,
                adresa,
                paga,
            },
            editModal: !this.state.editModal,
        });
    }

    //Toggle the edit modal function
    toggleEdit = () => {
        this.setState({
            editModal: !this.state.editModal,
        });
    };

    render() {
        const { employees } = this.props.employee; //Pull the employees

        let counter = this.state.counter;

        const columns = [
            'Nr',
            'Emri',
            'Mbiemri',
            'Nr.Sigurimesh',
            'Pozicioni',
            'Adresa',
            'Paga',
            'Data Regjistrimit',
            'Fshi/Modifiko',
        ];
        const data = [];

        employees.map(({ _id, name, surname, numerSigurime, pozicioni, adresa, paga, date }) =>
            data.push([
                counter++,
                name,
                surname,
                numerSigurime,
                pozicioni,
                adresa,
                paga,
                moment(date).calendar(),
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
                            pozicioni,
                            adresa,
                            paga,
                        )}
                    >
                        Modifiko
                    </Button>
                </div>,
            ]),
        );

        //MUI-Table options
        const options = {
            filterType: 'dropdown',
            selectableRows: 'none',
            responsive: 'standard',
            isRowSelectable: function (dataIndex) {
                return false;
            },
        };

        return (
            <div>
                {/* Edit Modal Part */}
                <Modal isOpen={this.state.editModal} toggle={this.toggleEdit.bind(this)} centered={true}>
                    <ModalHeader toggle={this.toggleEdit.bind(this)}>Modifiko punetore</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="name">Emri</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={this.state.editEmployee.name}
                                    onChange={(e) => {
                                        let { editEmployee } = this.state;
                                        editEmployee.name = e.target.value;
                                        this.setState({ editEmployee });
                                    }}
                                    style={{ marginBottom: '1rem' }}
                                />
                                <Label for="surname">Mbiemri</Label>
                                <Input
                                    type="text"
                                    name="surname"
                                    id="surname"
                                    value={this.state.editEmployee.surname}
                                    onChange={(e) => {
                                        let { editEmployee } = this.state;
                                        editEmployee.surname = e.target.value;
                                        this.setState({ editEmployee });
                                    }}
                                    style={{ marginBottom: '1rem' }}
                                />
                                <Label for="numerSigurime">Numri Sigurimeve</Label>
                                <Input
                                    type="text"
                                    name="numerSigurime"
                                    id="numerSigurime"
                                    value={this.state.editEmployee.numerSigurime}
                                    onChange={(e) => {
                                        let { editEmployee } = this.state;
                                        editEmployee.numerSigurime = e.target.value;
                                        this.setState({ editEmployee });
                                    }}
                                    style={{ marginBottom: '1rem' }}
                                />
                                <Label for="pozicioni">Pozicioni</Label>
                                <Input
                                    type="text"
                                    name="pozicioni"
                                    id="pozicioni"
                                    value={this.state.editEmployee.pozicioni}
                                    onChange={(e) => {
                                        let { editEmployee } = this.state;
                                        editEmployee.pozicioni = e.target.value;
                                        this.setState({ editEmployee });
                                    }}
                                    style={{ marginBottom: '1rem' }}
                                />
                                <Label for="adresa">Adresa</Label>
                                <Input
                                    type="text"
                                    name="adresa"
                                    id="adresa"
                                    value={this.state.editEmployee.adresa}
                                    onChange={(e) => {
                                        let { editEmployee } = this.state;
                                        editEmployee.adresa = e.target.value;
                                        this.setState({ editEmployee });
                                    }}
                                    style={{ marginBottom: '1rem' }}
                                />
                                <Label for="paga">Paga</Label>
                                <Input
                                    type="number"
                                    name="paga"
                                    id="paga"
                                    value={this.state.editEmployee.paga}
                                    onChange={(e) => {
                                        let { editEmployee } = this.state;
                                        editEmployee.paga = e.target.value;
                                        this.setState({ editEmployee });
                                    }}
                                    style={{ marginBottom: '1rem' }}
                                />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="info"
                            style={{ marginTop: '2rem' }}
                            block
                            outline
                            onClick={this.updateEmployee.bind(this)}
                        >
                            Modifiko Punetor
                        </Button>{' '}
                        <Button
                            color="danger"
                            style={{ marginTop: '2rem' }}
                            block
                            outline
                            onClick={this.toggleEdit.bind(this)}
                        >
                            Mbyll
                        </Button>
                    </ModalFooter>
                </Modal>
                {this.props.isAuthenticated ? (
                    <MUIDataTable title={'Lista e punetoreve'} data={data} columns={columns} options={options} />
                ) : (
                    ''
                )}
            </div>
        );
    }
}

//Mapping function
//Allow to take the employees state and maps it into a component property
const mapStateToProps = (state) => ({
    employee: state.employee,
    isAuthenticated: state.auth.isAuthenticated,
});

//Connect takes as parameters the action and our mapping function
export default connect(mapStateToProps, { getEmployees, deleteEmployee, getEmployeeById, updateEmployee })(Employee);
