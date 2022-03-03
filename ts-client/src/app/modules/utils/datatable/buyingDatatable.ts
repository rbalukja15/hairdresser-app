import { commonOptions } from './commonDatatableOptions';

export const buyingColumns = [
    ...commonOptions.indexColumn,
    {
        name: '_id',
        label: 'ID',
        options: {
            display: false,
            filter: false,
        },
    },
    {
        name: 'clientName',
        label: 'Client',
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: 'total',
        label: 'Total',
        options: {
            filter: true,
            sort: false,
        },
    },
    ...commonOptions.objectTimestamps,
];
