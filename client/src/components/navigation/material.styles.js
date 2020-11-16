//Styled Classes
import red from '@material-ui/core/colors/red';
import { colors } from '../../shared/color.constants';

const drawerWidth = 240;
const contentHeight = 1000;

export const styles = (theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: colors.DARK_BLUE,
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
        backgroundColor: colors.DARK_BLUE,
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
        '&:hover': {
            textDecoration: 'none',
            color: colors.WHITE,
            backgroundColor: colors.LIGHT_GRAY,
        },
    },
    selectedMenuItem: {
        minHeight: '60px',
        textDecoration: 'none',
        color: colors.WHITE,
        background: colors.LIGHT_GRAY,
        '&:hover': {
            textDecoration: 'none',
            color: colors.WHITE,
            backgroundColor: colors.LIGHT_GRAY,
        },
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
        backgroundColor: colors.GRAY,
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
        color: colors.WHITE,
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
