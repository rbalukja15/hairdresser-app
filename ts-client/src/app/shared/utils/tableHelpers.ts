import { genericHelpers } from './genericHelpers';
import { globalConstants } from '../constants/globalConstants';
import { IFilters, IFilterTableState } from '../components/interfaces';

export const customRowIndexColumn = () => {
    return {
        name: '#',
        options: {
            filter: false,
            customBodyRender: (value: any, meta: { rowIndex: number }) => {
                return meta.rowIndex + 1;
            },
        },
    };
};

export const getColumnNameAndIndex = (changedColumn: string, tableColumns: any[]): IFilterTableState => {
    const filterIndex = tableColumns
        .map((column, index) => ({ name: column.name, columnIndex: index }))
        .filter((value, index, self) => self.findIndex((v) => v.name === changedColumn) === index);

    return filterIndex[globalConstants.KEYS.FIRST_ARRAY_INDEX];
};

export const generateRequestFilters = (
    filterState: IFilterTableState,
    filters: string[],
    selectedFilters: Array<IFilters>,
): Array<IFilters> => {
    const camelToSnakeCase = (str: string) => str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

    if (!genericHelpers.isNullOrUndefined(filters) && !genericHelpers.isNullOrUndefined(filterState)) {
        const filteredData = filters
            .map((filter) => ({ name: filter }))
            .filter(
                (value, index, self) => self.findIndex((v) => v.name === value.name) === filterState.columnIndex,
            )[0];

        const checkIfNewFilterExist = selectedFilters.findIndex(
            ({ filterParameterName }) => filterParameterName == camelToSnakeCase(filterState.name),
        );

        return [
            ...selectedFilters,
            {
                filterParameterName: camelToSnakeCase(filterState.name).toString(),
                filterValue: Number(filteredData.name[globalConstants.KEYS.FIRST_ARRAY_INDEX]),
            },
        ].filter(({ filterValue }, index) => filterValue && index != checkIfNewFilterExist);
    }

    return [];
};
