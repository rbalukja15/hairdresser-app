import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import SaveIcon from '@material-ui/icons/Save'
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded'

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
} from '@material-ui/core'
import { Formik } from 'formik'
import * as yup from 'yup'
import PropTypes from 'prop-types' //Whenever you have component property put it inside a proptypes which is a form of validation
//Material-UI Part
import MUIDataTable from 'mui-datatables'
import { customRowIndexColumn } from '../../utils/mui-table'

//Date picker
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'

//Clients Part
import { connect } from 'react-redux' //Allows to get state from redux to react component
import axios from 'axios'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'

//Actions
import { addSale, updateSale } from '../../actions/saleActions'
import { addBuying, updateBuying } from '../../actions/buyingActions'
import { getClients } from '../../actions/clientActions'

export const validationSchema = yup.object().shape({
    code: yup.string().required('Kodi eshte i detyrueshem'),
    description: yup.string().required('Pershkrimi eshte i detyrueshem'),
    unit: yup.string().required('Njesia eshte e detyrueshme'),
    quantity: yup.number().positive('Sasia duhet te jete numer pozitiv').required('Sasia eshte e detyrueshme'),
    price: yup.number().positive('Cmimi duhet te jete numer pozitiv').required('Cmimi eshte i detyrueshem'),
})

const useStyles = makeStyles((theme) => ({
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
        margin: theme.spacing(2, 2),
    },
    datePicker: {
        margin: theme.spacing(3),
    },
    select: {
        margin: theme.spacing(1),
        minWidth: 180,
    },
}))

function createData(count, values) {
    let total = values.quantity * values.price
    return {
        rowId: count,
        code: values.code,
        description: values.description,
        unit: values.unit,
        quantity: values.quantity,
        price: values.price,
        total,
    }
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

const reorderRowIds = (rows) => {
    let rowsToReorder = []

    rows.forEach((row, index) => {
        rowsToReorder[index] = row
        rowsToReorder[index].rowId = index
    })

    return rowsToReorder
}

const InvoiceModal = (props) => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [rowsToSave, setRowsToSave] = useState([])
    const [rowsForTable, setRowsForTable] = useState([])

    const [clients, setClients] = useState([])
    const [selectClient, setSelectClient] = useState('')

    //Navigation
    const [tabValue, setTabValue] = useState(0)

    // The states declared for the Pickers
    const [startDate, setStartDate] = useState(Date.now)

    //MUI-Table consts
    const [columns, setColumns] = useState([
        {
            name: '#',
            options: {
                sort: false,
                filter: false,
                customBodyRender: (value, meta) => {
                    return meta.rowIndex + 1
                },
            },
        },
        {
            name: 'code',
            label: 'Kodi',
            options: {
                sort: false,
                filter: false,
            },
        },
        {
            name: 'description',
            label: 'Pershkrimi',
            options: {
                sort: false,
                filter: false,
            },
        },
        {
            name: 'unit',
            label: 'Njesia',
            options: {
                sort: false,
                filter: false,
            },
        },
        {
            name: 'quantity',
            label: 'Sasia',
            options: {
                sort: false,
                filter: false,
            },
        },
        {
            name: 'price',
            label: 'Cmimi',
            options: {
                sort: false,
                filter: false,
            },
        },
        {
            name: 'total',
            label: 'Vlefta',
            options: {
                sort: false,
                filter: false,
            },
        },
    ])

    const handleDateChange = (date) => {
        setStartDate(date)
    }

    const fetchData = () => {
        props.getClients().then((response) => setClients(response))
        setRowsForTable(
            props.invoiceData.map((data, index) => {
                return [index, data.code, data.description, data.unit, data.quantity, data.price, data.total]
            }),
        )
        setRowsToSave(props.invoiceData)
        setSelectClient(props.client)
    }

    //Check if the modal is open, then fetch client data
    useEffect(() => {
        if (open) {
            fetchData()
        } else {
            setRowsToSave([])
            setRowsForTable([])
        }
    }, [open])

    const options = {
        filterType: 'dropdown',
        responsive: 'standard',
        pagination: false,
        onRowsDelete: (rowsDeleted, newData) => {
            const rowId = rowsForTable[rowsDeleted.data[0].index][0]
            setRowsToSave(rowsToSave.filter((row) => row.rowId !== rowId))
            setRowsForTable(newData)
        },
    }

    //Move data from the form to the data table
    const handleFormSubmit = (values) => {
        const createdData = createData(rowsToSave.length, values)

        setRowsToSave([...rowsToSave, createdData])
        ;[createdData].map((value, index) => {
            setRowsForTable([
                ...rowsForTable,
                [index, value.code, value.description, value.unit, value.quantity, value.price, value.total],
            ])
        })
    }

    //Submit the data of the invoice
    const handleInvoiceSubmit = () => {
        let total = 0

        rowsToSave.forEach((row) => {
            total += row.total
        })

        const transaction = {
            clientName: selectClient,
            invoiceType: props.invoiceType,
            rows: reorderRowIds(rowsToSave),
            total,
        }

        props.invoiceType === 0 ? handleBuyingActions(transaction) : handleSaleActions(transaction)
    }

    const handleSaleActions = (transaction) => {
        const saleToUpdate = {
            _id: props.saleId,
            clientName: transaction.clientName,
            invoiceType: transaction.invoiceType,
            rows: transaction.rows,
            total: transaction.total,
        }
        props.saleId ? props.updateSale(saleToUpdate) : props.addSale(transaction)
        props.refreshData()
        handleClose()
    }
    const handleBuyingActions = (transaction) => {
        const buyingToUpdate = {
            _id: props.saleId,
            clientName: transaction.clientName,
            invoiceType: transaction.invoiceType,
            rows: transaction.rows,
            total: transaction.total,
        }
        props.saleId ? props.updateBuying(buyingToUpdate) : props.addBuying(transaction)
        props.refreshData()
        handleClose()
    }

    const customForm = (tabValue) => (
        <Paper className={classes.paper}>
            <Formik
                initialValues={{ code: '', description: '', unit: '', quantity: '', price: '' }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                    handleFormSubmit(values)
                    resetForm()
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
                            {tabValue !== 1 ? (
                                <FormControl className={classes.formControl}>
                                    <FormLabel component="legend">Kodi</FormLabel>
                                    <Input
                                        className="mb-2"
                                        type="text"
                                        name="code"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.code}
                                    />
                                    {errors.code && touched.code ? errors.code : ''}
                                </FormControl>
                            ) : (
                                ''
                            )}
                        </div>
                        <div>
                            <FormControl className={classes.formControl}>
                                <FormLabel component="legend">Pershkrimi</FormLabel>
                                <Input
                                    className="mb-2"
                                    type="text"
                                    name="description"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.description}
                                />
                                {errors.description && touched.description ? errors.description : ''}
                            </FormControl>
                        </div>
                        <div>
                            <FormControl className={classes.formControl}>
                                <FormLabel component="legend">Njesia</FormLabel>
                                <Input
                                    className="mb-2"
                                    type="text"
                                    name="unit"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.unit}
                                />
                                {errors.unit && touched.unit ? errors.unit : ''}
                            </FormControl>
                        </div>
                        <div>
                            <FormControl className={classes.formControl}>
                                <FormLabel component="legend">Sasia</FormLabel>
                                <Input
                                    className="mb-2"
                                    type="number"
                                    name="quantity"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.quantity}
                                />
                                {errors.quantity && touched.quantity ? errors.quantity : ''}
                            </FormControl>
                        </div>
                        <div>
                            <FormControl className={classes.formControl}>
                                <FormLabel component="legend">Cmimi</FormLabel>
                                <Input
                                    className="mb-2"
                                    type="number"
                                    name="price"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.price}
                                />
                                {errors.price && touched.price ? errors.price : ''}
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
    )

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        setSelectClient('')
    }

    return (
        <div>
            <Button
                variant="outlined"
                color="primary"
                className="mb-2"
                onClick={handleClickOpen}
                endIcon={props.saleId ? null : <AddCircleOutlineRoundedIcon />}
            >
                {props.saleId ? 'Modifiko' : 'Shto Fature'}
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
                                        setSelectClient(e.target.value)
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
                            >
                                Ruaj
                            </Button>
                            <Divider orientation="vertical" />
                        </Grid>
                        <Grid item xs={4}>
                            <Grid item>{customForm(tabValue)}</Grid>
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
    )
}

InvoiceModal.propTypes = {
    clients: PropTypes.array.isRequired,
    client: PropTypes.string.isRequired,
    addSale: PropTypes.func.isRequired,
    updateSale: PropTypes.func.isRequired,
    addBuying: PropTypes.func.isRequired,
    updateBuying: PropTypes.func.isRequired,
    getClients: PropTypes.func.isRequired,
    invoiceTitle: PropTypes.string.isRequired,
    invoiceType: PropTypes.number.isRequired,
    invoiceData: PropTypes.array,
    saleId: PropTypes.string,
    refreshData: PropTypes.func.isRequired,
}

InvoiceModal.defaultProps = {
    invoiceTitle: 'Fature',
    invoiceType: 0,
    invoiceData: [],
    client: '',
    saleId: null,
    refreshData: () => {},
}

//Mapping function
//Allow to take the items state and maps it into a component property
const mapStateToProps = (state) => ({
    clients: state.client.clients,
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { addSale, addBuying, updateSale, updateBuying, getClients })(InvoiceModal)
