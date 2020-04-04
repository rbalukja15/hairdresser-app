import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import AddCircleOutlineRoundedIcon  from '@material-ui/icons/AddCircleOutlineRounded';

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
} from "@material-ui/core";
import {Formik} from "formik";
import * as yup from "yup";
import PropTypes from "prop-types"; //Whenever you have component property put it inside a proptypes which is a form of validation
//Material-UI Part
import MUIDataTable from "mui-datatables";
import {customRowIndexColumn} from "../../utils/mui-table"

//Date picker
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

//Clients Part
import { connect } from "react-redux"; //Allows to get state from redux to react component
import axios from "axios";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

export const validationSchema = yup.object().shape({
    code: yup
        .string()
        .required('Kodi eshte i detyrueshem'),
    description: yup
            .string()
            .required('Pershkrimi eshte i detyrueshem'),
    unit: yup
        .string()
        .required('Njesia eshte e detyrueshme'),
    quantity: yup
        .number()
        .positive("Sasia duhet te jete numer pozitiv")
        .required('Sasia eshte e detyrueshme'),
    price: yup
        .number()
        .positive("Cmimi duhet te jete numer pozitiv")
        .required('Cmimi eshte i detyrueshem')
});

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    formControl: {
        margin: theme.spacing(3),
        minWidth: 200,
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    table: {
        minWidth: 650,
        margin: theme.spacing(2,2),

    },
    datePicker: {
        margin: theme.spacing(3),
    },
    select: {
        margin: theme.spacing(1),
        minWidth: 180
    },
}));

function createData(values) {
    let total = values.quantity * values.price;
    return [ values.id, values.code, values.description, values.unit, values.quantity, values.price, total];
}

const options = {
    filterType: "dropdown",
    responsive: "scroll",
    pagination: false,
};

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const InvoiceModal = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [rows, setRows] = useState([]);

    const [clients, setClients] = useState([]);
    const [selectClient, setSelectClient] = useState("");

    //Navigation
    const [tabValue, setTabValue] = useState(0);

    // The states declared for the Pickers
    const [startDate, setStartDate] = useState(Date.now);

    //MUI-Table consts
    const [columns, setColumns] = useState([customRowIndexColumn(), "Kodi", "Pershkrimi", "Njesia", "Sasia", "Cmimi", "Vlefta"]);

    const handleTabChange = (event, newValue) => {
        if (newValue === 1)
            setColumns([customRowIndexColumn(), "Pershkrimi", "Njesia", "Sasia", "Cmimi", "Vlera pa TVSH", "TVSH", "Vlefta"]);
        else
            setColumns([customRowIndexColumn(), "Kodi", "Pershkrimi", "Njesia", "Sasia", "Cmimi", "Vlefta"]);
        setTabValue(newValue);
    };

    const handleDateChange = date => {
        setStartDate(date);
    };

    const fetchClient = async () => {
        const response = await axios
            .get("/api/clients");
        setClients(response.data);
    };

    //Check if the modal is open, then fetch client data
    useEffect( () => {
        if (open) {
            fetchClient();
        }
    }, [open]);

    //Move data from the form to the data table
    const handleSubmit = values => {
        setRows([...rows, createData(values)]);
    };

    const customForm = tabValue => (
        <Paper className={classes.paper}>
            <Formik
                initialValues={{ code: '', description: '', unit: '', quantity: '', price: '' }}
                validationSchema={validationSchema}
                onSubmit={(values,{resetForm}) => {
                    handleSubmit(values);
                    resetForm();
                }}
            >
                {({
                      values,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      isValid,
                      dirty,
                      errors,
                      touched,
                      resetForm,
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <div>
                            {tabValue !== 1 ?
                            <FormControl className={classes.formControl}>
                                <FormLabel
                                    component="legend"
                                >
                                    Kodi
                                </FormLabel>
                                <Input
                                    className="mb-2"
                                    type="text"
                                    name="code"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.code}
                                />
                                {(errors.code && touched.code) ? errors.code : ''}
                            </FormControl>
                            : ''}
                        </div>
                        <div>
                            <FormControl className={classes.formControl}>
                                <FormLabel
                                    component="legend"
                                >
                                    Pershkrimi
                                </FormLabel>
                                <Input
                                    className="mb-2"
                                    type="text"
                                    name="description"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.description}
                                />
                                {(errors.description && touched.description) ? errors.description : ''}
                            </FormControl>
                        </div>
                        <div>
                            <FormControl className={classes.formControl}>
                                <FormLabel
                                    component="legend"
                                >
                                    Njesia
                                </FormLabel>
                                <Input
                                    className="mb-2"
                                    type="text"
                                    name="unit"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.unit}
                                />
                                {(errors.unit && touched.unit) ? errors.unit : ''}
                            </FormControl>
                        </div>
                        <div>
                            <FormControl className={classes.formControl}>
                                <FormLabel
                                    component="legend"
                                >
                                    Sasia
                                </FormLabel>
                                <Input
                                    className="mb-2"
                                    type="number"
                                    name="quantity"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.quantity}
                                />
                                {(errors.quantity && touched.quantity) ? errors.quantity : ''}
                            </FormControl>
                        </div>
                        <div>
                            <FormControl className={classes.formControl}>
                                <FormLabel
                                    component="legend"
                                >
                                    Cmimi
                                </FormLabel>
                                <Input
                                    className="mb-2"
                                    type="number"
                                    name="price"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.price}
                                />
                                {(errors.price && touched.price) ? errors.price : ''}
                            </FormControl>
                        </div>
                        <FormControl className={classes.formControl}>
                            <Button
                                variant="contained"
                                type="submit"
                                color="secondary"
                                //disabled={!(isValid && dirty) || isSubmitting} TODO: set disabled after finishing UI design
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
        rows.length = 0;
        setOpen(false);
        setSelectClient("");
    };

    return (
        <div>
            <Button
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
                endIcon={<AddCircleOutlineRoundedIcon  />}
            >
                Shto Fature
            </Button>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar style={{ display: 'flex' }}>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>Fature</Typography>
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
                                    onChange={ e => { setSelectClient(e.target.value)} }
                                >
                                    {clients.map( client => (
                                        <MenuItem
                                            key={client._id}
                                            value={client._id}
                                        >
                                            {client.name}
                                        </MenuItem>
                                    ) )}
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
                                style={{float: "right"}}
                                color="secondary"
                                onClick={handleClose}
                                startIcon={<SaveIcon />}
                            >
                                Ruaj
                            </Button>
                            <Divider orientation="vertical"/>
                        </Grid>
                        <Grid item xs={4}>
                            <Grid item>
                                {customForm(tabValue)}
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={classes.table}>
                                <MUIDataTable
                                    title={"Fature"}
                                    data={rows}
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
    client: PropTypes.object.isRequired,
};

//Mapping function
//Allow to take the items state and maps it into a component property
const mapStateToProps = state => ({
    client: state.client,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
)(InvoiceModal);
