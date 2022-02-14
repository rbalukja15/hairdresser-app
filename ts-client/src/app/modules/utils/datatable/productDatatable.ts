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
        name: 'kodi',
        label: 'Code',
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: 'cmimBlerje',
        label: 'Buying Price',
        options: {
            display: true,
            filter: false,
            sort: false,
        },
    },
    {
        name: 'prodhuesi',
        label: 'Manufacturer',
        options: {
            display: true,
            filter: false,
            sort: false,
        },
    },
    {
        name: 'shitesi',
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
