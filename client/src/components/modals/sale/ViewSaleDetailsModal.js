import * as React from 'react';
import PropTypes from 'prop-types';
import {Modal} from "reactstrap";
import {ModalHeader, ModalBody} from "reactstrap";
import {connect} from "react-redux";
import {useEffect, useRef, useState} from "react";
import MUIDataTable from "mui-datatables";
import {getSaleById} from "../../../actions/saleActions";


const ViewSaleDetailsModal = (props) => {
    const [invoice, setInvoice] = useState([]);
    const [rowsForTable, setRowsForTable] = useState([]);
    const componentIsMounted = useRef(true);
    const { selectedInvoice } = props;

    useEffect(() => {
        getSaleById(props.invoiceId);
            if (componentIsMounted.current) {
                console.log(selectedInvoice)
            }
    }, [])

    useEffect(() => {
        if (selectedInvoice !== null) {
            console.log("detaols", selectedInvoice.invoiceData)
            setInvoice(selectedInvoice.invoiceData[0]);
        }
    }, [selectedInvoice]);

    const options = {
        filterType: "dropdown",
        responsive: "scroll",
        selectableRows: "none",
        isRowSelectable: function(dataIndex) {
            return false;
        },
    }

    const invoiceColumns = [
        {
            name: '#',
            options: {
                sort: false,
                filter: false,
                customBodyRender: (value, meta) => {
                    return meta.rowIndex + 1;
                },
            },
        },
        {
            name: 'code',
            label: 'Kodi',
            options: {
                display: false,
            },
        },
    ];

    return (
        <Modal isOpen={props.isOpen} centered={true}>
            <ModalHeader>Sale Data</ModalHeader>
            <ModalBody>
                { invoice.length > 0 ?
                    <MUIDataTable
                        title={"Lista e produkteve"}
                        data={invoice}
                        columns={invoiceColumns}
                        options={options}
                    /> : null
                }
            </ModalBody>
        </Modal>
    );
};

ViewSaleDetailsModal.defaultProps = {
    isOpen: false,
    selectedInvoice: null,
    invoiceId: null,
}

ViewSaleDetailsModal.propsTypes = {
    isOpen: PropTypes.bool.isRequired,
    selectedInvoice: PropTypes.object.isRequired,
    getSaleById: PropTypes.func.isRequired,
    invoiceId: PropTypes.number.isRequired,
}

const mapStateToProps = state => ({
    selectedInvoice: state.sale.sale
})

export default connect(mapStateToProps, {getSaleById})(ViewSaleDetailsModal);