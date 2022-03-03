export interface IPagination {
    paging: boolean;
    page: number;
    size: number;
    orderBy: string;
    orderDirection: ISortOrder;
}

export interface IRowsDeleted {
    lookup: { [dataIndex: number]: boolean };
    data: Array<{ index: number; dataIndex: number }>;
}

enum FilterTypes {
    checkbox = 'checkbox',
    dropdown = 'dropdown',
    multiselect = 'multiselect',
    textField = 'textField',
    custom = 'custom',
    chip = 'chip',
    reset = 'reset',
}

export interface IFilters {
    filterParameterName: string;
    filterValue: number;
}

export interface IFilterTableState {
    name: string;
    columnIndex: number;
}

export interface ISort {
    changedColumn: string;
    direction: string;
}

export type ISortOrder = 'ASC' | 'DESC';

export type Pagination = {
    paging: IPagination;
    searchText: string | null;
    filters: IFilters[];
};
