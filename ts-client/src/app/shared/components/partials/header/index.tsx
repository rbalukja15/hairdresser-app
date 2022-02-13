import React, { FunctionComponent, PropsWithChildren, ReactElement } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { IPublicNavBar } from './header.interfaces';
import Container from './Container';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const PublicNavbar = (props: PropsWithChildren<IPublicNavBar>): ReactElement<FunctionComponent<IPublicNavBar>> => {
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
                <Container theme={theme} />
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default compose<IPublicNavBar, Record<string, unknown>>(withRouter)(PublicNavbar);
