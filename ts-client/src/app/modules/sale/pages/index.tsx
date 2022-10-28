import React from 'react';
import DynamicTable from '../../../shared/components/generics/DynamicTable';
import { IRowsDeleted, Pagination } from '../../../shared/components/interfaces';
import { globalConstants } from '../../../shared/constants/globalConstants';
import { saleSelector } from '../slice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchSales } from '../action';
import { saleColumns } from '../../utils/datatable/saleDatatable';

const Sale = () => {
    const { sales, loading, total } = useAppSelector(saleSelector);
    const dispatch = useAppDispatch();

    // const options = {
    //     onRowsDelete: async (rowsDeleted: IRowsDeleted): Promise<void> => {
    //         const buyingToRemoveIndex = rowsDeleted.data.map((item) => item.index);
    //         const buyingToRemoveLength = buyingToRemoveIndex.length;
    //
    //         buyingToRemoveIndex.map(async (buyingIndex, index) => {
    //             const buyingId = buyings[buyingIndex].id;
    //             const completed = buyingToRemoveLength === index + 1;
    //             await removeBuying(buyingId);
    //             completed && (await _refreshItems(globalConstants.DEFAULT_REFRESH_PARAMS));
    //         });
    //     },
    // };

    const _refreshItems = async (pagination: Pagination): Promise<void> => {
        dispatch(fetchSales(pagination));
    };
    return (
        <DynamicTable
            title={'Shitjet'}
            // options={options}
            columns={saleColumns}
            data={sales}
            total={total}
            loading={loading}
            refreshData={_refreshItems}
        />
    );
};

export default Sale;
