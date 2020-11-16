//Styled Classes
import red from '@material-ui/core/colors/red';

const drawerWidth = 240;
const contentHeight = 1000;

export const styles = (theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#1c2025',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        //alignItems: "flex",
        backgroundColor: '#282c34',
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
        float: 'left',
    },
    menuItem: {
        minHeight: '60px',
    },
    icon: {
        margin: theme.spacing(2, 2),
    },
    iconHover: {
        margin: theme.spacing(2, 2),
        '&:hover': {
            color: red[800],
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        color: '#fff',
        backgroundColor: '#282c34',
    },
    content: {
        [theme.breakpoints.down('sm')]: {
            marginLeft: 10,
            marginTop: 5,
            width: `calc(100% - ${drawerWidth}px - 10px)`,
            height: '100%',
        },
        [theme.breakpoints.up('md')]: {
            marginTop: 10,
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px - 20px)`,
            height: contentHeight,
        },
        [theme.breakpoints.up('lg')]: {
            marginTop: 10,
            width: `calc(100% - ${drawerWidth}px - 20px)`,
            height: `${contentHeight}px + 200px`,
        },
    },
    auth: {
        borderRadius: 7,
        width: '50px',
        color: 'white',
    },
    avatar: {
        float: 'right',
        marginRight: 0,
    },
    typography: {
        float: 'left',
        flexGrow: 1,
    },
});
