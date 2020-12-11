import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { getSales, deleteSale, getSaleById, updateSale } from '../../actions/saleActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MUIDataTable from 'mui-datatables';
import moment from 'moment';
import tableOptions from '../../utils/mui-table';
import InvoiceModal from '../invoice/Invoice';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import tableColumns from '../mui-datatables/table.columns';

class Sale extends Component {
    static propTypes = {
        getSales: PropTypes.func.isRequired,
        getSaleById: PropTypes.func.isRequired,
        updateSale: PropTypes.func.isRequired,
        sale: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,
        isLoading: PropTypes.bool.isRequired,
    };

    componentWillMount() {
        this._refreshSales();
    }

    onDeleteClick = (id) => {
        this.props.deleteSale(id);
    };

    _refreshSales() {
        this.props.getSales();
    }

    render() {
        const { sales } = this.props.sale;
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
            isRowSelectable: function () {
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

const mapStateToProps = (state) => ({
    sale: state.sale,
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.sale.loading,
});

export default connect(mapStateToProps, { getSales, deleteSale, getSaleById, updateSale })(Sale);
