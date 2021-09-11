import React from 'react';
import DynamicTable from '../../../shared/components/generics/DynamicTable';
import { productDataTables } from '../../utils/datatable/productDatatable';
import { IFilters, IPagination, IRowsDeleted } from '../../../shared/components/interfaces';
import { globalConstants } from '../../../shared/constants/globalConstants';

const Product = (props: {
    deleteIngredient?: any;
    getIngredients?: any;
    ingredients?: any;
    total?: any;
    loading?: any;
}) => {
    const { ingredients, total, loading } = props;

    const tableColumns = [...productDataTables.productColumns];

    const options = {
        onRowsDelete: async (rowsDeleted: IRowsDeleted): Promise<void> => {
            const ingredientsToRemoveIndex = rowsDeleted.data.map((item) => item.index);
            const ingredientToRemoveLength = ingredientsToRemoveIndex.length;

            ingredientsToRemoveIndex.map(async (ingredientIndex, index) => {
                const ingredientId = ingredients[ingredientIndex].id;
                const completed = ingredientToRemoveLength === index + 1;
                await props.deleteIngredient(ingredientId, completed);
                completed && (await _refreshProducts(globalConstants.DEFAULT_PAGINATION));
            });
        },
    };

    const _refreshProducts = async (
        pagination: IPagination,
        searchText?: string,
        filters?: IFilters,
    ): Promise<void> => {
        await props.getIngredients(pagination, searchText, filters);
    };
    return (
        <DynamicTable
            title={'Produktet'}
            options={options}
            columns={tableColumns}
            data={ingredients}
            total={total}
            loading={loading}
            refreshData={_refreshProducts}
        />
    );
};

export default Product;
