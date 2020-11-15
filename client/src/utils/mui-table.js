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

const tableOptions = {
    tableFilterTypes,
    tableResponsiveness,
};

export default tableOptions;
