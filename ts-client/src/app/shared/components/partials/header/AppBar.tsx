import React from 'react';
import { Button, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { useAppSelector } from '../../../../hooks';
import { selectAuth } from '../../../../modules/auth/authSlice';
import { styleConstants } from '../../../constants/styleConstants';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness3Icon from '@mui/icons-material/Brightness3';

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const DRAWER_WIDTH = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        marginLeft: `${DRAWER_WIDTH}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
    background: styleConstants.COLORS.BLACK_LOW,
    width: '100%',
    zIndex: theme.zIndex.drawer + 1,
}));

const StyledTypography = styled(Typography)(() => ({
    fontFamily: styleConstants.ROBOTO_MEDIUM,
}));

const StyledDummyDiv = styled('div')(() => ({
    flexGrow: 1,
}));

const StyledDiv = styled('div')(({ theme }) => ({
    display: 'none',
    color: styleConstants.COLORS.WHITE,
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

const StyledButton = styled(Button)(() => ({
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '0 !important',
    color: styleConstants.COLORS.WHITE,
}));

const CustomAppBar = () => {
    const [appliedTheme, setAppliedTheme] = React.useState<boolean>(false);
    const [open, setOpen] = React.useState<boolean>(false);

    const { loggedIn } = useAppSelector(selectAuth);

    const icon = !appliedTheme ? <Brightness7Icon /> : <Brightness3Icon />;

    const handleDrawerToggle = (): void => {
        setOpen(!open);
    };

    return (
        <AppBar position="fixed">
            <Toolbar>
                {loggedIn ? (
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                        onClick={handleDrawerToggle}
                    >
                        <MenuIcon />
                    </IconButton>
                ) : null}
                <StyledTypography variant="h5" noWrap>
                    C&apos;est Chic
                </StyledTypography>
                <StyledDummyDiv />
                <StyledDiv>
                    <StyledButton startIcon={icon} onClick={() => setAppliedTheme(!appliedTheme)}>
                        Change Theme
                    </StyledButton>
                </StyledDiv>
            </Toolbar>
        </AppBar>
    );
};

export default CustomAppBar;
