import { Theme } from '@mui/material';

export interface INavBarProps {
    classes: {
        root: string;
        drawer: string;
        appBar: string;
        menuButton: string;
        menuItem: string;
        selectedMenuItem: string;
        toolbar: string;
        drawerPaper: string;
        content: string;
        typography: string;
        list: string;
        listItem: string;
        selectedListItem: string;
        listItemText: string;
        sectionDesktop: string;
        grow: string;
        changeThemeButton: string;
    };
    window: Window;
    theme: Theme;
    location: {
        pathname: string;
    };
}

export type IPublicNavBar = INavBarProps;
