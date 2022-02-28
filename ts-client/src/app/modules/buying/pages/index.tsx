import React from 'react';
import DynamicTable from '../../../shared/components/generics/DynamicTable';
import { productDataTables } from '../../utils/datatable/productDatatable';
import { IRowsDeleted, Pagination } from '../../../shared/components/interfaces';
import { globalConstants } from '../../../shared/constants/globalConstants';
import { buyingSelector } from '../slice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchBuyings, removeBuying } from '../action';

const Buying = () => {
    const { buyings, loading, total } = useAppSelector(buyingSelector);
    const dispatch = useAppDispatch();

    const tableColumns = [...productDataTables.productColumns];

    const options = {
        onRowsDelete: async (rowsDeleted: IRowsDeleted): Promise<void> => {
            const buyingToRemoveIndex = rowsDeleted.data.map((item) => item.index);
            const buyingToRemoveLength = buyingToRemoveIndex.length;

            buyingToRemoveIndex.map(async (buyingIndex, index) => {
                const buyingId = buyings[buyingIndex].id;
                const completed = buyingToRemoveLength === index + 1;
                await removeBuying(buyingId);
                completed && (await _refreshItems(globalConstants.DEFAULT_REFRESH_PARAMS));
            });
        },
    };

    const _refreshItems = async (pagination: Pagination): Promise<void> => {
        dispatch(fetchBuyings(pagination));
    };
    return (
        <DynamicTable
            title={'Blerjet'}
            options={options}
            columns={tableColumns}
            data={buyings}
            total={total}
            loading={loading}
            refreshData={_refreshItems}
        />
    );
};

export default Buying;
