import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import Slide from '@material-ui/core/Slide';
import FormControl from '@material-ui/core/FormControl';
import Grid from "@material-ui/core/Grid";
import Select from "react-select";
import {FormLabel, Input} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Formik} from "formik";
import * as yup from "yup";

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

export default function FullScreenDialog() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState([]);
    const [left, setLeft] = useState([]);
    const [right, setRight] = useState([]);
    const [count, setCount] = useState(0);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

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
                            <h1>Klientet</h1>
                            <Select
                                name="category"
                                id="category"
                                autoFocus
                                simpleValue
                                //options={['Test', 'Test']}
                                value='Klienti'
                            />
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
}
