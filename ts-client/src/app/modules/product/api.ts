import axios, { AxiosRequestConfig } from 'axios';
import { Pagination } from '../../shared/components/interfaces';
import { genericHelpers } from '../../shared/utils/genericHelpers';

const getProducts = async (pagination: Pagination) => {
    const {
        paging: { page, paging, size, orderBy, orderDirection },
        searchText,
    } = pagination;
    const requestOptions: AxiosRequestConfig = {
        url: '/api/items',
        method: 'GET',
        params: {
            page: page,
            paging: paging,
            size: size,
            orderBy: genericHelpers.camelToSnakeCase(orderBy),
            orderDirection: orderDirection,
            searchText,
        },
    };

    const response = await axios(requestOptions);

    return response.data;
};

export const productService = {
    getProducts,
};
