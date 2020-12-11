import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { colors } from './color.constants';

export const muiTheme = () => {
    return createMuiTheme({
        palette: {
            type: 'dark',
        },
    });
};
