import { FilterType, Responsive, SelectableRows } from 'mui-datatables';
import { globalConstants } from './globalConstants';
import { ISortOrder } from '../components/interfaces';

export const muiDataTablesConstants = {
    FILTER_TYPE: {
        DROPDOWN: 'dropdown' as FilterType,
        CHECKBOX: 'checkbox' as FilterType,
        MULTISELECT: 'multiselect' as FilterType,
        TEXT_FIELD: 'textField' as FilterType,
        CUSTOM: 'custom' as FilterType,
    },
    RESPONSIVE: {
        VERTICAL: 'vertical' as Responsive,
        STANDARD: 'standard' as Responsive,
        SIMPLE: 'simple' as Responsive,
    },
    SELECTABLE_ROWS: {
        MULTIPLE: 'multiple' as SelectableRows,
        SINGLE: 'single' as SelectableRows,
        NONE: 'none' as SelectableRows,
    },
    TABLE_ACTIONS: {
        DELETE_ACTION: 'Delete',
        UPDATE_ACTION: 'Edit',
        CHANGE_PAGE_ACTION: 'changePage',
        CHANGE_ROWS_ACTION: 'changeRowsPerPage',
        SORT_ACTION: 'sort',
        SEARCH_ACTION: 'search',
    },
    TABLE_PAGINATION: {
        paging: true,
        size: 10,
        page: 0,
        orderBy: globalConstants.KEYS.ID,
        orderDirection: globalConstants.SORT_ORDER.DESC as ISortOrder,
    },
};
