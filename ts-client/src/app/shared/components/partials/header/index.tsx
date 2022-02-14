import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Container from './Container';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

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
    const theme = createTheme();

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <Container theme={theme}>{children}</Container>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

PublicNavbar.displayName = 'NavigationBar';

export default withRouter(PublicNavbar);
