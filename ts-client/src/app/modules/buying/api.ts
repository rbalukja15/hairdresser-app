import axios, { AxiosRequestConfig } from 'axios';
import { IFilters, IPagination, Pagination } from '../../shared/components/interfaces';
import { genericHelpers } from '../../shared/utils/genericHelpers';

export const getBuyings = async (paging: IPagination, searchText?: string, filters?: IFilters) => {
    const requestOptions: AxiosRequestConfig = {
        url: '/api/buyings',
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

export const deleteBuying = async (buyingId: string) => {
    const requestOptions: AxiosRequestConfig = {
        url: `/api/buyings/${buyingId}`,
        method: 'DELETE',
    };

    const response = await axios(requestOptions);

    return response.data;
};
