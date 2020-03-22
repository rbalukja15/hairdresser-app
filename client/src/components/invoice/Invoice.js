import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';

import {
    AppBar,
    FormControl,
    FormLabel,
    Input,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Slide,
    Grid,
    Select,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Dialog,
    Divider
} from "@material-ui/core";
import {Formik} from "formik";
import * as yup from "yup";
import PropTypes from "prop-types"; //Whenever you have component property put it inside a proptypes which is a form of validation

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
import InputLabel from "@material-ui/core/InputLabel"; //Import the actions

export const validationSchema = yup.object().shape({
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
        minWidth: 120,
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
        marginRight: theme.spacing(3)

    },
    datePicker: {
        margin: theme.spacing(3),
    },
    select: {
        margin: theme.spacing(1),
        minWidth: 180
    },
}));

function createData(id, description, unit, quantity, price) {
    let total = quantity * price;
    return { id, description, unit, quantity, price, total};
}

const rows = [];

function not(a, b) {
    return a.filter(value => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter(value => b.indexOf(value) !== -1);
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const InvoiceModal = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState([]);
    const [left, setLeft] = useState([]);
    const [right, setRight] = useState([]);
    const [count, setCount] = useState(0);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const [clients, setClients] = useState([]);
    const [selectClient, setSelectClient] = useState("");

    // The states declared for the Pickers
    const [startDate, setStartDate] = React.useState(Date.now);

    const handleDateChange = date => {
        setStartDate(date);
    };

    const fetchClient = async () => {
        const response = await axios
            .get("/api/clients");
        setClients(response.data);
    };

    useEffect( () => {
        if (open) {
            fetchClient();
        }
    }, [open]);

    const handleCheckedRight = values => {
        setCount(count+1);
        rows.push(createData(count, values.description, values.unit, values.quantity, values.price));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = id => {
        console.log(id);
        rows.splice(id, 1);
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const customList = () => (
        <Paper className={classes.paper}>
            <Formik
                initialValues={{ description: '', unit: '', quantity: '', price: '' }}
                validationSchema={validationSchema}
                onSubmit={(values,{resetForm}) => {
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
                        <FormControl className={classes.formControl}>
                            <Button
                                variant="contained"
                                type="submit"
                                color="secondary"
                                onClick={() => handleCheckedRight(values)}
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
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Open full-screen dialog
            </Button>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Fature
                        </Typography>
                        <Button
                            autoFocus
                            color="inherit"
                            onClick={handleClose}
                        >
                            Ruaj
                        </Button>
                    </Toolbar>
                </AppBar>
                <div className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs={2}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">Klientet</InputLabel>
                                <Select
                                    className={classes.select}
                                    id="demo-simple-select"
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
                            <Divider orientation="vertical"/>
                        </Grid>
                        <Grid item xs={4}>
                            <Grid item>
                                {customList(left)}
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper className={classes.paper}>
                                <Table className={classes.table} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Fshi</TableCell>
                                            <TableCell>Nr.</TableCell>
                                            <TableCell>Pershkrimi</TableCell>
                                            <TableCell align="right">Njesia</TableCell>
                                            <TableCell align="right">Sasia</TableCell>
                                            <TableCell align="right">Cmimi</TableCell>
                                            <TableCell align="right">Vlefta</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map(row => (
                                            <TableRow key={row.id}>
                                                <TableCell>
                                                    <DeleteIcon
                                                        color="secondary"
                                                        onClick={() => handleCheckedLeft(row.id)}
                                                    />
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {row.id + 1}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {row.description}
                                                </TableCell>
                                                <TableCell align="right">{row.unit}</TableCell>
                                                <TableCell align="right">{row.quantity}</TableCell>
                                                <TableCell align="right">{row.price}</TableCell>
                                                <TableCell align="right">{row.total}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Paper>
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
