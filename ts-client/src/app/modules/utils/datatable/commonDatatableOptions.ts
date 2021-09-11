import moment from 'moment';
import { MUIDataTableMeta } from 'mui-datatables';

const indexColumn = [
    {
        name: '#',
        options: {
            sort: false,
            filter: false,
            customBodyRender(value: unknown, meta: MUIDataTableMeta): number {
                return meta.rowIndex + 1;
            },
        },
    },
];

const objectTimestamps = [
    {
        name: 'createdAt',
        label: 'Created at',
        options: {
            filter: false,
            sort: false,
            customBodyRender(value: moment.MomentInput): string {
                return moment(value).calendar();
            },
        },
    },
    {
        name: 'modifiedAt',
        label: 'Modified at',
        options: {
            filter: false,
            sort: false,
            customBodyRender(value: moment.MomentInput): string {
                return moment(value).calendar();
            },
        },
    },
];

export const commonOptions = {
    indexColumn,
    objectTimestamps,
};
