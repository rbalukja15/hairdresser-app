import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
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

const validationSchema = yup.object().shape({
    description: yup
            .string()
            .nullable()
            .required('Pershkrimi eshte i detyrueshem')
    // unit: yup.string().nullable().required('Pershkrimi eshte i detyrueshem'),
    // quantity: yup.string().nullable().required('Pershkrimi eshte i detyrueshem'),
    // price: yup.string().nullable().required('Pershkrimi eshte i detyrueshem'),
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

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
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
    const [open, setOpen] = React.useState(false);
    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState([0, 1, 2, 3]);
    const [right, setRight] = React.useState([4, 5, 6, 7]);

    const leftChecked = intersection(checked, left);

    // const handleToggle = value => () => {
    //     const currentIndex = checked.indexOf(value);
    //     const newChecked = [...checked];
    //
    //     if (currentIndex === -1) {
    //         newChecked.push(value);
    //     } else {
    //         newChecked.splice(currentIndex, 1);
    //     }
    //
    //     setChecked(newChecked);
    // };

    const handleCheckedRight = () => {
        rows.push(createData(leftChecked, '', '', '', ''));
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const customList = items => (
        <Paper className={classes.paper}>
            <Formik
                initialValues={{ description: '' }}
                validate={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({
                      values,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      isValid,
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
                                name="unit.value"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.description}
                            />
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
                                name="quantity.value"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.description}
                            />
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
                                name="price.value"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.description}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <Button variant="contained" color="secondary" onClick={handleCheckedRight} disabled={!isValid || isSubmitting}>
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
                        <Button autoFocus color="inherit" onClick={handleClose}>
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
                                            <TableCell>Pershkrimi</TableCell>
                                            <TableCell align="right">Njesia</TableCell>
                                            <TableCell align="right">Sasia</TableCell>
                                            <TableCell align="right">Cmimi</TableCell>
                                            <TableCell align="right">Vlefta</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map(row => (
                                            <TableRow key={row.name}>
                                                <TableCell component="th" scope="row">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="right">{row.calories}</TableCell>
                                                <TableCell align="right">{row.fat}</TableCell>
                                                <TableCell align="right">{row.carbs}</TableCell>
                                                <TableCell align="right">{row.protein}</TableCell>
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
