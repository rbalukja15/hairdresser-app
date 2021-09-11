import axios, { AxiosRequestConfig } from 'axios';
import { IFilters, IPagination } from '../../shared/components/interfaces';
import { genericHelpers } from '../../shared/utils/genericHelpers';

const getProducts = async (paging: IPagination, searchText?: string, filters?: IFilters) => {
    const requestOptions: AxiosRequestConfig = {
        url: '/api/items',
        method: 'GET',
        params: {
            page: paging.page,
            paging: paging.paging,
            size: paging.size,
            orderBy: genericHelpers.camelToSnakeCase(paging.orderBy),
            orderDirection: paging.orderDirection,
            searchText,
        },
    };

    const response = await axios(requestOptions);

    return response.data;
};

export const productService = {
    getProducts,
};
