import { commonOptions } from './commonDatatableOptions';

const productColumns = [
    ...commonOptions.indexColumn,
    {
        name: 'id',
        label: 'ID',
        options: {
            display: false,
            filter: false,
        },
    },
    {
        name: 'name',
        label: 'Name',
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: 'code',
        label: 'Code',
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: 'buyingPrice',
        label: 'Buying Price',
        options: {
            display: false,
            filter: false,
            sort: false,
        },
    },
    {
        name: 'manufacturer',
        label: 'Manufacturer',
        options: {
            display: false,
            filter: false,
            sort: false,
        },
    },
    {
        name: 'distributor',
        label: 'Distributor',
        options: {
            filter: true,
            sort: false,
        },
    },
    {
        name: 'category',
        label: 'Category',
        options: {
            filter: true,
            sort: false,
        },
    },
    ...commonOptions.objectTimestamps,
];

export const productDataTables = {
    productColumns,
};
