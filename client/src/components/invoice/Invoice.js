import React, { useEffect, useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';

import {
    AppBar,
    FormControl,
    FormLabel,
    Input,
    Paper,
    Slide,
    Grid,
    Select,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Dialog,
    Divider,
    MenuItem,
    InputLabel,
} from '@material-ui/core';
import { Formik } from 'formik';
import PropTypes from 'prop-types'; //Whenever you have component property put it inside a proptypes which is a form of validation
//Material-UI Part
import MUIDataTable from 'mui-datatables';

//Date picker
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

//Clients Part
import { connect } from 'react-redux'; //Allows to get state from redux to react component

//Actions
import { addSale, updateSale } from '../../actions/saleActions';
import { addBuying, updateBuying } from '../../actions/buyingActions';
import { getClients } from '../../actions/clientActions';
import validationSchemas from './formModel/validation.schemas';
import useStyles from './material.styles';
import invoiceConstants from './invoice.constants';
import tableOptions from '../../utils/mui-table';
import formModels from './formModel/invoice.form.model';
import { formInitialValues } from './formModel/form.initial.values';

function createData(count, values) {
    let total = values.quantity * values.price;
    return {
        rowId: count,
        code: values.code,
        description: values.description,
        unit: values.unit,
        quantity: values.quantity,
        price: values.price,
        total,
    };
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const reorderRowIds = (rows) => {
    let rowsToReorder = [];

    rows.forEach((row, index) => {
        rowsToReorder[index] = row;
        rowsToReorder[index].rowId = index;
    });

    return rowsToReorder;
};

const InvoiceModal = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [rowsToSave, setRowsToSave] = useState([]);
    const [rowsForTable, setRowsForTable] = useState([]);
    const [clients, setClients] = useState([]);
    const [selectClient, setSelectClient] = useState('');
    const [startDate, setStartDate] = useState(Date.now);
    const [columns, setColumns] = useState(invoiceConstants.invoiceTableColumns);
    const {
        formField: { code, description, unit, quantity, price },
    } = formModels.invoiceFormModel;

    // Mui-Datatables options
    const options = {
        filterType: tableOptions.tableFilterTypes.DROPDOWN,
        responsive: tableOptions.tableResponsiveness.STANDARD,
        pagination: false,
        onRowsDelete: (rowsDeleted, newData) => {
            const rowId = rowsForTable[rowsDeleted.data[0].index][0];
            setRowsToSave(rowsToSave.filter((row) => row.rowId !== rowId));
            setRowsForTable(newData);
        },
    };

    //Check if the modal is open, then fetch client data
    useEffect(() => {
        if (open) {
            fetchData();
        } else {
            setRowsToSave([]);
            setRowsForTable([]);
        }
    }, [open]);

    const fetchData = () => {
        props.getClients().then((response) => setClients(response));
        setRowsForTable(
            props.invoiceData.map((data, index) => {
                return [index, data.code, data.description, data.unit, data.quantity, data.price, data.total];
            }),
        );
        setRowsToSave(props.invoiceData);
        setSelectClient(props.client);
    };

    const handleDateChange = (date) => {
        setStartDate(date);
    };

    //Move data from the form to the data table
    const handleFormSubmit = (values) => {
        const createdData = createData(rowsToSave.length, values);

        setRowsToSave([...rowsToSave, createdData]);
        [createdData].map((value, index) => {
            setRowsForTable([
                ...rowsForTable,
                [index, value.code, value.description, value.unit, value.quantity, value.price, value.total],
            ]);
        });
    };

    //Submit the data of the invoice
    const handleInvoiceSubmit = () => {
        let total = 0;

        // Calculate the sum of all table row total
        rowsToSave.forEach((row) => {
            total += row.total;
        });

        const transaction = {
            clientName: selectClient,
            invoiceType: props.invoiceType,
            rows: reorderRowIds(rowsToSave),
            total,
        };

        props.invoiceType === 0 ? handleBuyingActions(transaction) : handleSaleActions(transaction);
    };

    const handleSaleActions = (transaction) => {
        const saleToUpdate = {
            _id: props.transactionId,
            clientName: transaction.clientName,
            invoiceType: transaction.invoiceType,
            rows: transaction.rows,
            total: transaction.total,
        };
        props.transactionId ? props.updateSale(saleToUpdate) : props.addSale(transaction);
        props.refreshData();
        handleClose();
    };
    const handleBuyingActions = (transaction) => {
        const buyingToUpdate = {
            _id: props.transactionId,
            clientName: transaction.clientName,
            invoiceType: transaction.invoiceType,
            rows: transaction.rows,
            total: transaction.total,
        };
        props.transactionId ? props.updateBuying(buyingToUpdate) : props.addBuying(transaction);
        props.refreshData();
        handleClose();
    };

    const customForm = () => (
        <Paper className={classes.paper}>
            <Formik
                initialValues={formInitialValues.invoice}
                validationSchema={validationSchemas.invoiceSchema}
                onSubmit={(values, { resetForm }) => {
                    handleFormSubmit(values);
                    resetForm();
                }}
            >
                {(props) => (
                    <form onSubmit={props.handleSubmit}>
                        <FormControl className={classes.formControl}>
                            <FormLabel component="legend">{code.label}</FormLabel>
                            <Input
                                className="mb-2"
                                type="text"
                                name={code.name}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.code}
                            />
                            {props.errors.code && props.touched.code ? props.errors.code : ''}
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <FormLabel component="legend">{description.label}</FormLabel>
                            <Input
                                className="mb-2"
                                type="text"
                                name={description.name}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.description}
                            />
                            {props.errors.description && props.touched.description ? props.errors.description : ''}
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <FormLabel component="legend">{unit.label}</FormLabel>
                            <Input
                                className="mb-2"
                                type="text"
                                name={unit.name}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.unit}
                            />
                            {props.errors.unit && props.touched.unit ? props.errors.unit : ''}
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <FormLabel component="legend">{quantity.label}</FormLabel>
                            <Input
                                className="mb-2"
                                type="number"
                                name={quantity.name}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.quantity}
                            />
                            {props.errors.quantity && props.touched.quantity ? props.errors.quantity : ''}
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <FormLabel component="legend">{price.label}</FormLabel>
                            <Input
                                className="mb-2"
                                type="number"
                                name={price.name}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.price}
                            />
                            {props.errors.price && props.touched.price ? props.errors.price : ''}
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <Button
                                variant="contained"
                                type="submit"
                                color="secondary"
                                disabled={!(props.isValid && props.dirty) || props.isSubmitting}
                            >
                                Shto &gt;
                            </Button>
                        </FormControl>
                    </form>
                )}
            </Formik>
        </Paper>
    );

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectClient('');
    };

    return (
        <div>
            <Button
                variant="outlined"
                color="primary"
                className="mb-2"
                onClick={handleClickOpen}
                endIcon={props.transactionId ? null : <AddCircleOutlineRoundedIcon />}
            >
                {props.transactionId ? 'Modifiko' : 'Shto Fature'}
            </Button>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar style={{ display: 'flex' }}>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {props.invoiceTitle}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs={2}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="client-select-label">Klientet</InputLabel>
                                <Select
                                    className={classes.select}
                                    labelId="client-select-label"
                                    id="client-select"
                                    value={selectClient}
                                    onChange={(e) => {
                                        setSelectClient(e.target.value);
                                    }}
                                >
                                    {clients.map((client) => (
                                        <MenuItem key={client._id} value={client.name}>
                                            {client.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <MuiPickersUtilsProvider utils={DateFnsUtils} centered={true}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    variant="inline"
                                    id="date-picker-dialog"
                                    label="Data fillimit"
                                    format="dd/MM/yyyy"
                                    value={startDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    className={classes.datePicker}
                                />
                            </MuiPickersUtilsProvider>
                            <Button
                                autoFocus
                                variant="contained"
                                style={{ float: 'right' }}
                                color="secondary"
                                onClick={handleInvoiceSubmit}
                                startIcon={<SaveIcon />}
                                disabled={rowsToSave.length > 0}
                            >
                                Ruaj
                            </Button>
                            <Divider orientation="vertical" />
                        </Grid>
                        <Grid item xs={4}>
                            <Grid item>{customForm()}</Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={classes.table}>
                                <MUIDataTable
                                    title={'Fature'}
                                    data={rowsForTable}
                                    columns={columns}
                                    options={options}
                                />
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </Dialog>
        </div>
    );
};

InvoiceModal.propTypes = {
    clients: PropTypes.array.isRequired,
    addSale: PropTypes.func.isRequired,
    updateSale: PropTypes.func.isRequired,
    addBuying: PropTypes.func.isRequired,
    updateBuying: PropTypes.func.isRequired,
    getClients: PropTypes.func.isRequired,
    invoiceTitle: PropTypes.string.isRequired,
    invoiceType: PropTypes.number.isRequired,
    invoiceData: PropTypes.array,
    transactionId: PropTypes.string,
    refreshData: PropTypes.func.isRequired,
};

InvoiceModal.defaultProps = {
    invoiceTitle: 'Fature',
    invoiceType: 0,
    invoiceData: [],
    client: '',
    transactionId: null,
    refreshData: () => {},
};

const mapStateToProps = (state) => ({
    clients: state.client.clients,
    isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
    addSale,
    addBuying,
    updateSale,
    updateBuying,
    getClients,
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceModal);
