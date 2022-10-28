import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Container from './Container';
import { muiStyles } from '../../../styles/muiStyles';

export const ColorModeContext = React.createContext({ toggleColorMode: () => {}, color: 'light' });

type OwnProps = RouteComponentProps & {
    children: React.ReactNode;
};

const PublicNavbar = ({ children }: OwnProps) => {
    const [mode, setMode] = React.useState<'light' | 'dark'>('light');
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );
    // @ts-ignore
    const theme = createTheme(muiStyles.getMuiTheme(mode));

    return (
        <ColorModeContext.Provider value={{ toggleColorMode: colorMode.toggleColorMode, color: mode }}>
            <ThemeProvider theme={theme}>
                <Container theme={theme}>{children}</Container>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

PublicNavbar.displayName = 'NavigationBar';

export default withRouter(PublicNavbar);
