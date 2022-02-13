import React, { FunctionComponent, PropsWithChildren, ReactElement, useCallback, useEffect, useState } from 'react';
import MUIDataTable, { MUIDataTableOptions, MUIDataTableColumnState, MUIDataTableState } from 'mui-datatables';
import { compose } from 'recompose';
import { Paper, withStyles } from '@material-ui/core';
import clsx from 'clsx';
import { IFilters, IPagination, ISortOrder } from '../interfaces';
import { globalConstants } from '../../constants/globalConstants';
import { muiDataTablesConstants } from '../../constants/datatableConstants';
import { generateRequestFilters, getColumnNameAndIndex } from '../../utils/tableHelpers';
import { muiStyles } from '../../styles/muiStyles';

interface OwnProps {
    title: string;
    options: MUIDataTableOptions;
    columns: MUIDataTableColumnState[];
    data: any;
    total: number;
    loading: boolean;
    refreshData: (pagination: IPagination, searchText: string | null, filters?: Array<IFilters>) => Promise<void>;
    classes: {
        NameCell: string;
    };
}

const DynamicTable = (props: PropsWithChildren<OwnProps>): ReactElement<FunctionComponent<OwnProps>> => {
    const [filters, setFilters] = useState<Array<IFilters>>([]);
    const [pagination, setPagination] = useState<IPagination>(muiDataTablesConstants.TABLE_PAGINATION);
    const [searchText, setSearchText] = useState<string | null>(null);
    const { title, options, columns, data, classes, total, refreshData } = props;

    const _refresh = useCallback(async () => {
        await refreshData(pagination, searchText, filters);
    }, [pagination, searchText, filters]);

    useEffect(() => {
        (async () => {
            await refreshData(pagination, searchText, filters);
        })();
    }, [_refresh]);

    const tableOptions = {
        filterType: muiDataTablesConstants.FILTER_TYPE.DROPDOWN,
        responsive: muiDataTablesConstants.RESPONSIVE.VERTICAL,
        selectableRows: muiDataTablesConstants.SELECTABLE_ROWS.MULTIPLE,
        serverSide: true,
        rowsPerPage: pagination?.size,
        count: total,
        searchText,
        onFilterChange: (columnChanged: any, filterList: any): void => {
            const filterState = getColumnNameAndIndex(columnChanged, columns);

            setFilters(generateRequestFilters(filterState, filterList, filters));
        },
        setRowProps: (): { className: string } => {
            return {
                className: clsx({ [classes.NameCell]: true }),
            };
        },
        setCellProps: (): { className: string } => {
            return {
                className: clsx({ [classes.NameCell]: true }),
            };
        },
        ...options,
        onTableChange: (action: any, tableState: MUIDataTableState) => {
            switch (action) {
                case muiDataTablesConstants.TABLE_ACTIONS.CHANGE_PAGE_ACTION:
                    setPagination({
                        ...pagination,
                        page: tableState.page,
                    });
                    break;
                case muiDataTablesConstants.TABLE_ACTIONS.CHANGE_ROWS_ACTION:
                    setPagination({
                        ...pagination,
                        size: tableState.rowsPerPage,
                    });
                    break;
                case muiDataTablesConstants.TABLE_ACTIONS.SEARCH_ACTION:
                    setSearchText(tableState.searchText);
                    setPagination({
                        ...pagination,
                        page: globalConstants.DEFAULT_PAGINATION.page,
                    });
                    break;
                case muiDataTablesConstants.TABLE_ACTIONS.SORT_ACTION:
                    setPagination({
                        ...pagination,
                        orderBy: tableState.sortOrder.name,
                        orderDirection: tableState.sortOrder.direction.toUpperCase() as unknown as ISortOrder,
                    });
                    break;
                default:
                    console.log('action not handled.');
            }
        },
    };

    return (
        <Paper style={{ marginTop: '100px' }}>
            {/* @ts-ignore */}
            <MUIDataTable title={title} options={tableOptions} columns={columns} data={data} />
        </Paper>
    );
};

export default compose<OwnProps, Record<string, unknown>>(withStyles(muiStyles.customStyles))(DynamicTable);
