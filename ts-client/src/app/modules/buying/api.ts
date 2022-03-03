import axios, { AxiosRequestConfig } from 'axios';
import { Pagination } from '../../shared/components/interfaces';
import { genericHelpers } from '../../shared/utils/genericHelpers';

export const getBuyings = async (pagination: Pagination) => {
    const {
        paging: { page, paging, size, orderBy, orderDirection },
        searchText,
    } = pagination;
    const requestOptions: AxiosRequestConfig = {
        url: '/api/buyings',
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

export const deleteBuying = async (buyingId: string) => {
    const requestOptions: AxiosRequestConfig = {
        url: `/api/buyings/${buyingId}`,
        method: 'DELETE',
    };

    const response = await axios(requestOptions);

    return response.data;
};
