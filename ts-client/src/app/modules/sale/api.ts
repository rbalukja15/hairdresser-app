import axios, { AxiosRequestConfig } from 'axios';
import { Pagination } from '../../shared/components/interfaces';
import { genericHelpers } from '../../shared/utils/genericHelpers';

export const getSales = async (pagination: Pagination) => {
    const {
        paging: { page, paging, size, orderBy, orderDirection },
        searchText,
    } = pagination;
    const requestOptions: AxiosRequestConfig = {
        url: '/api/sales',
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
