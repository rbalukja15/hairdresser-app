import { makeStyles } from '@material-ui/core/styles';

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
    modalButton: {
        marginBottom: 2,
        color: '#fff',
        backgroundColor: '#8a85ff',
    },
}));

export default useStyles;
