import { customRowIndexColumn } from '../../utils/mui-table';

const saleColumns = [
    customRowIndexColumn(),
    {
        name: 'Emri Klientit',
        options: {
            sort: true,
            filter: true,
        },
    },
    {
        name: 'Totali',
        options: {
            sort: true,
            filter: true,
        },
    },
    {
        name: 'Data Regjistrimit',
        options: {
            sort: true,
            filter: true,
        },
    },
    {
        name: 'Detajet',
        options: {
            sort: false,
            filter: false,
        },
    },
    {
        name: 'Fshi',
        options: {
            sort: false,
            filter: false,
        },
    },
];

const tableColumns = {
    saleColumns,
};

export default tableColumns;
