import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from 'reactstrap'; //Allows to get state from redux to react component
import { getBuyings, deleteBuying, getBuyingById, updateBuying } from '../../actions/buyingActions'; //Import the actions
import PropTypes from 'prop-types'; //Whenever you have component property put it inside a proptypes which is a form of validation
import { connect } from 'react-redux'; //To connect react and redux
//Material-UI Part
import MUIDataTable from 'mui-datatables';
import moment from 'moment';
import { customRowIndexColumn } from '../../utils/mui-table'; //Moment library for date editting
import InvoiceModal from '../invoice/Invoice';

//
//THE WAY REDUX WORKS
//CARS => COMPONENT->ACTION->REDUCER->STORE

class Buying extends Component {
    state = {
        editModal: false,
        editBuying: {
            _id: '',
            name: '',
            kodi: '',
            cmimBlerje: '',
            prodhuesi: '',
            shitesi: '',
            sasia: '',
        },
    };

    //When you bring in an action from redux it is going to be stored as props
    static propTypes = {
        getBuyings: PropTypes.func.isRequired,
        getBuyingById: PropTypes.func.isRequired,
        updateBuying: PropTypes.func.isRequired,
        buying: PropTypes.object.isRequired, //Represents our state
        isAuthenticated: PropTypes.bool,
        isLoading: PropTypes.bool.isRequired,
    };

    componentWillMount() {
        //Runs when the component mounts
        //Here we run actions
        this._refreshBuyings();
    }

    //Call the delete action
    onDeleteClick = (id) => {
        this.props.deleteBuying(id);
    };

    //Call the update function
    updateSale() {
        //Call the update action and pass the sale state
        this.props.updateBuying(this.state.editBuying);

        //Refresh the data
        this._refreshBuyings();

        this.componentWillMount();

        //Reset the state
        this.setState({
            editModal: false,
            _id: '',
            name: '',
            kodi: '',
            cmimBlerje: '',
            prodhuesi: '',
            shitesi: '',
            sasia: '',
        });
    }

    //Refresh function for the datas in the table
    _refreshBuyings() {
        this.props.getBuyings();
    }

    //Edit function called to get the data from the table row into the state
    editBuying(_id, name, kodi, cmimBlerje, prodhuesi, shitesi, sasia) {
        this.setState({
            editBuying: {
                _id,
                name,
                kodi,
                cmimBlerje,
                prodhuesi,
                shitesi,
                sasia,
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
        const { buyings } = this.props.buying; //Pull the buyings

        const columns = [
            customRowIndexColumn(),
            'Emri Furnitorit',
            'Totali',
            // "Data", //TODO add date from invoice
            'Data Regjistrimit',
            'Fshi',
            'Modifiko',
        ];
        const data = [];

        buyings.map(({ _id, clientName, invoiceData, total, date }) =>
            data.push([
                _id,
                clientName,
                total,
                moment(date).calendar(),
                <Button
                    className="remove-btn mb-2"
                    outline
                    color="danger"
                    size="sm"
                    onClick={this.onDeleteClick.bind(this, _id)}
                >
                    Fshi
                </Button>,
                <InvoiceModal
                    invoiceTitle="Blerje"
                    invoiceType={0}
                    invoiceData={invoiceData}
                    client={clientName}
                    saleId={_id}
                    refreshData={this._refreshBuyings.bind(this)}
                />,
            ]),
        );

        const options = {
            filterType: 'dropdown',
            responsive: 'standard',
            selectableRows: 'none',
            isRowSelectable: function (dataIndex) {
                return false;
            },
            setRowProps: () => ({
                onDoubleClick: (row, dataIndex) => {
                    this.setState({
                        openAction: true,
                    });
                },
            }),
        };

        return (
            <div>
                <InvoiceModal invoiceTitle="Blerje" invoiceType={0} />

                {/* Edit Modal Part */}
                <Modal isOpen={this.state.editModal} toggle={this.toggleEdit.bind(this)} centered={true}>
                    <ModalHeader toggle={this.toggleEdit.bind(this)}>Modifiko Blerjen</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="name">Emri</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    required
                                    value={this.state.editBuying.name}
                                    onChange={(e) => {
                                        let { editBuying } = this.state;
                                        editBuying.name = e.target.value;
                                        this.setState({ editBuying });
                                    }}
                                    style={{ marginBottom: '1rem' }}
                                />
                                <Label for="kodi">Kodi</Label>
                                <Input
                                    type="text"
                                    name="kodi"
                                    id="kodi"
                                    required
                                    value={this.state.editBuying.kodi}
                                    onChange={(e) => {
                                        let { editBuying } = this.state;
                                        editBuying.kodi = e.target.value;
                                        this.setState({ editBuying });
                                    }}
                                    style={{ marginBottom: '1rem' }}
                                />
                                <Label for="cmimBlerje">Cmimi Blerjes</Label>
                                <Input
                                    type="number"
                                    name="cmimBlerje"
                                    id="cmimBlerje"
                                    required
                                    value={this.state.editBuying.cmimBlerje}
                                    onChange={(e) => {
                                        let { editBuying } = this.state;
                                        editBuying.cmimBlerje = e.target.value;
                                        this.setState({ editBuying });
                                    }}
                                    style={{ marginBottom: '1rem' }}
                                />
                                <Label for="prodhuesi">Prodhuesi</Label>
                                <Input
                                    type="text"
                                    name="prodhuesi"
                                    id="prodhuesi"
                                    required
                                    value={this.state.editBuying.prodhuesi}
                                    onChange={(e) => {
                                        let { editBuying } = this.state;
                                        editBuying.prodhuesi = e.target.value;
                                        this.setState({ editBuying });
                                    }}
                                    style={{ marginBottom: '1rem' }}
                                />
                                <Label for="shitesi">Shitesi</Label>
                                <Input
                                    type="text"
                                    name="shitesi"
                                    id="shitesi"
                                    required
                                    value={this.state.editBuying.shitesi}
                                    onChange={(e) => {
                                        let { editBuying } = this.state;
                                        editBuying.shitesi = e.target.value;
                                        this.setState({ editBuying });
                                    }}
                                    style={{ marginBottom: '1rem' }}
                                />
                                <Label for="category">Kategori</Label>
                                <Input
                                    type="text"
                                    name="category"
                                    id="category"
                                    required
                                    value={this.state.editBuying.category}
                                    onChange={(e) => {
                                        let { editBuying } = this.state;
                                        editBuying.category = e.target.value;
                                        this.setState({ editBuying });
                                    }}
                                    style={{ marginBottom: '1rem' }}
                                />
                                <Label for="sasia">sasia</Label>
                                <Input
                                    type="number"
                                    name="sasia"
                                    id="sasia"
                                    required
                                    value={this.state.editBuying.sasia}
                                    onChange={(e) => {
                                        let { editBuying } = this.state;
                                        editBuying.sasia = e.target.value;
                                        this.setState({ editBuying });
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
                            onClick={this.updateSale.bind(this)}
                        >
                            Modifiko Blerjen
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
                {this.props.isAuthenticated && !this.props.isLoading ? (
                    <MUIDataTable title={'Lista e Blerjeve'} data={data} columns={columns} options={options} />
                ) : (
                    ''
                )}
            </div>
        );
    }
}

//Mapping function
//Allow to take the sales state and maps it into a component property
const mapStateToProps = (state) => ({
    buying: state.buying,
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.buying.loading,
});

//Connect takes as parameters the action and our mapping function
export default connect(mapStateToProps, { getBuyings, deleteBuying, getBuyingById, updateBuying })(Buying);
