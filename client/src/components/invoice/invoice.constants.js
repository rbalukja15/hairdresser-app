const invoiceTableColumns = [
    {
        name: '#',
        options: {
            sort: false,
            filter: false,
            customBodyRender: (value, meta) => {
                return meta.rowIndex + 1;
            },
        },
    },
    {
        name: 'code',
        label: 'Kodi',
        options: {
            sort: false,
            filter: false,
        },
    },
    {
        name: 'description',
        label: 'Pershkrimi',
        options: {
            sort: false,
            filter: false,
        },
    },
    {
        name: 'unit',
        label: 'Njesia',
        options: {
            sort: false,
            filter: false,
        },
    },
    {
        name: 'quantity',
        label: 'Sasia',
        options: {
            sort: false,
            filter: false,
        },
    },
    {
        name: 'price',
        label: 'Cmimi',
        options: {
            sort: false,
            filter: false,
        },
    },
    {
        name: 'total',
        label: 'Vlefta',
        options: {
            sort: false,
            filter: false,
        },
    },
];

const invoiceConstants = {
    invoiceTableColumns,
};

export default invoiceConstants;
