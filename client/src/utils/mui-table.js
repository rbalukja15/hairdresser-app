export const customRowIndexColumn = () => {
    return {
        name: '#',
        options: {
            filter: false,
            customBodyRender: (value, meta) => {
                return meta.rowIndex + 1;
            },
        },
    };
};

const tableFilterTypes = {
    DROPDOWN: 'dropdown',
};

const tableResponsiveness = {
    STANDARD: 'standard',
};

const selectableRows = {
    NONE: 'none',
};

const tableOptions = {
    tableFilterTypes,
    tableResponsiveness,
    selectableRows,
};

export default tableOptions;
