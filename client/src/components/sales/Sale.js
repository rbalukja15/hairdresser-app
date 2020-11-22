import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from 'reactstrap';
import { getSales, deleteSale, getSaleById, updateSale } from '../../actions/saleActions'; //Import the actions
import PropTypes from 'prop-types'; //Whenever you have component property put it inside a proptypes which is a form of validation
import { connect } from 'react-redux'; //To connect react and redux
//Material-UI Part
import MUIDataTable from 'mui-datatables';
import moment from 'moment'; //Moment library for date editting
import tableOptions from '../../utils/mui-table';
import InvoiceModal from '../invoice/Invoice';

//Toastr Part
// import { toastr } from "react-redux-toastr"; //Toastr for validation notifications
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import tableColumns from '../mui-datatables/table.columns';

//
//THE WAY REDUX WORKS
//CARS => COMPONENT->ACTION->REDUCER->STORE

class Sale extends Component {
    state = {
        editModal: false,
        editSale: {
            _id: '',
            clientName: '',
            clientSurname: '',
            productName: '',
            sasia: '',
            cmimi: '',
            kodi: '',
        },
    };

    //When you bring in an action from redux it is going to be stored as props
    static propTypes = {
        getSales: PropTypes.func.isRequired,
        getSaleById: PropTypes.func.isRequired,
        updateSale: PropTypes.func.isRequired,
        sale: PropTypes.object.isRequired, //Represents our state
        isAuthenticated: PropTypes.bool,
        isLoading: PropTypes.bool.isRequired,
    };

    componentWillMount() {
        //Runs when the component mounts
        //Here we run actions
        this._refreshSales();
    }

    //Call the delete action
    onDeleteClick = (id) => {
        this.props.deleteSale(id);
    };

    //Call the update function
    updateSale() {
        //console.log(this.state.editSale._id);

        //Call the update action and pass the sale state
        this.props.updateSale(this.state.editSale);

        //Refresh the data
        this._refreshSales();

        //For repeating items
        this.componentWillMount();

        //Reset the state
        this.setState({
            editModal: false,
            _id: '',
            clientName: '',
            clientSurname: '',
            productName: '',
            sasia: '',
            cmimi: '',
            kodi: '',
        });
    }

    //Refresh function for the datas in the table
    _refreshSales() {
        this.props.getSales();
    }

    //Edit function called to get the data from the table row into the state
    editSale(_id, clientName, clientSurname, productName, sasia, cmimi, kodi) {
        this.setState({
            editSale: {
                _id,
                clientName,
                clientSurname,
                productName,
                sasia,
                cmimi,
                kodi,
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
        const { sales } = this.props.sale; //Pull the sales
        const columns = tableColumns.saleColumns;
        const data = [];

        sales.map(({ _id, clientName, total, date, invoiceData }) =>
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
                    invoiceTitle="Shitje"
                    invoiceType={1}
                    invoiceData={invoiceData}
                    client={clientName}
                    transactionId={_id}
                    refreshData={this._refreshSales.bind(this)}
                />,
            ]),
        );

        const options = {
            filterType: tableOptions.tableFilterTypes.DROPDOWN,
            responsive: tableOptions.tableResponsiveness.STANDARD,
            selectableRows: tableOptions.selectableRows.NONE,
            isRowSelectable: function (dataIndex) {
                return false;
            },
        };

        return (
            <div style={{ width: '100%' }}>
                <InvoiceModal invoiceTitle="Shitje" invoiceType={1} />
                {this.props.isAuthenticated && !this.props.isLoading ? (
                    <MUIDataTable title={'Lista e Shitjeve'} data={data} columns={columns} options={options} />
                ) : null}
            </div>
        );
    }
}

//Mapping function
//Allow to take the sales state and maps it into a component property
const mapStateToProps = (state) => ({
    sale: state.sale,
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.sale.loading,
});

//Connect takes as parameters the action and our mapping function
export default connect(mapStateToProps, { getSales, deleteSale, getSaleById, updateSale })(Sale);
