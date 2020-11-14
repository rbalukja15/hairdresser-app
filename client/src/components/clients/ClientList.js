import React, { Component } from 'react';
import { connect } from 'react-redux'; //Allows to get state from redux to react component
import { getClients, deleteClient, getClientById, updateClient } from '../../actions/clientActions'; //Import the actions
import PropTypes from 'prop-types'; //Whenever you have component property put it inside a proptypes which is a form of validation

import moment from 'moment'; //Moment library for date editting

//Reactstrap part
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from 'reactstrap';

//Material-UI Part
import MUIDataTable from 'mui-datatables';

//Toastr Part
import { toastr } from 'react-redux-toastr'; //Toastr for validation notifications
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'; //CSS for toastr

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

class ClientList extends Component {
    state = {
        editModal: false,
        counter: 1,
        editClient: {
            _id: '',
            name: '',
            surname: '',
        },
    };

    //When you bring in an action from redux it is going to be stored as props
    static propTypes = {
        getClients: PropTypes.func.isRequired,
        getClientById: PropTypes.func.isRequired,
        updateClient: PropTypes.func.isRequired,
        client: PropTypes.object.isRequired, //Represents our state
        isAuthenticated: PropTypes.bool,
    };

    componentWillMount() {
        //Runs when the component mounts
        //Here we run actions
        this._refreshClients();
    }

    //Call the delete action
    onDeleteClick = (id) => {
        toastr.confirm('Je e sigurte ?', toastrConfirmOptions);
        toastrConfirmOptions.onOk = () => {
            this.props.deleteClient(id);
            console.log('Client Deleted');
            toastr.success('Klienti u fshi me sukses');
        };
    };

    //Call the update function
    updateClient() {
        //Call the update action and pass the client state
        this.props.updateClient(this.state.editClient);

        toastr.success('Modifikim', `Klienti ${this.state.editClient.name} u modifikua me sukses`);

        //Refresh the data
        this._refreshClients();

        this.componentWillMount();

        //Reset the state
        this.setState({
            editModal: false,
            counter: 1,
            editClient: {
                _id: '',
                name: '',
                surname: '',
            },
        });
    }

    //Refresh function for the datas in the table
    _refreshClients() {
        this.props.getClients();
    }

    //Edit function called to get the data from the table row into the state
    editClient(_id, name, surname) {
        this.setState({
            editClient: {
                _id,
                name,
                surname,
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
        const { clients } = this.props.client; //Pull the clients

        //Counter for rows
        let counter = this.state.counter;

        const columns = ['Nr', 'Emer', 'Mbiemer', 'Data Regjistrimit', 'Delete'];
        const data = [];

        clients.map(({ _id, name, surname, date }) =>
            data.push([
                counter++,
                name,
                surname,
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
                        onClick={this.editClient.bind(this, _id, name, surname)}
                    >
                        Modifiko
                    </Button>
                </div>,
            ]),
        );

        const options = {
            filterType: 'dropdown',
            responsive: 'standard',
            selectableRows: 'none',
            isRowSelectable: function (dataIndex) {
                return false;
            },
        };

        return (
            <div>
                {/* Edit Modal Part */}
                <Modal isOpen={this.state.editModal} toggle={this.toggleEdit.bind(this)} centered={true}>
                    <ModalHeader toggle={this.toggleEdit.bind(this)}>Modifiko Klientin</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="name">Emri Klientit</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={this.state.editClient.name}
                                    onChange={(e) => {
                                        let { editClient } = this.state;
                                        editClient.name = e.target.value;
                                        this.setState({ editClient });
                                    }}
                                    style={{ marginBottom: '1rem' }}
                                />
                                <Label for="surname">Mbiemri Klientit</Label>
                                <Input
                                    type="text"
                                    name="surname"
                                    id="surname"
                                    value={this.state.editClient.surname}
                                    onChange={(e) => {
                                        let { editClient } = this.state;
                                        editClient.surname = e.target.value;
                                        this.setState({ editClient });
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
                            onClick={this.updateClient.bind(this)}
                        >
                            Modifiko Produkt
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
                    <MUIDataTable title={'Lista e Klienteve'} data={data} columns={columns} options={options} />
                ) : (
                    ''
                )}
            </div>
        );
    }
}

//Mapping function
//Allow to take the items state and maps it into a component property
const mapStateToProps = (state) => ({
    client: state.client,
    isAuthenticated: state.auth.isAuthenticated,
});

//Connect takes as parameters the action and our mapping function
export default connect(mapStateToProps, { getClients, deleteClient, getClientById, updateClient })(ClientList);
