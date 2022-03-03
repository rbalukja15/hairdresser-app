import React from 'react';
import DynamicTable from '../../../shared/components/generics/DynamicTable';
import { productDataTables } from '../../utils/datatable/productDatatable';
import { IRowsDeleted, Pagination } from '../../../shared/components/interfaces';
import { globalConstants } from '../../../shared/constants/globalConstants';
import { selectProduct } from '../slice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getProducts } from '../actions';

const Product = (props: {
    deleteIngredient?: any;
    getIngredients?: any;
    ingredients?: any;
    total?: any;
    loading?: any;
}) => {
    const { products, loading } = useAppSelector(selectProduct);
    const dispatch = useAppDispatch();
    const { ingredients, total } = props;

    const tableColumns = [...productDataTables.productColumns];

    const options = {
        onRowsDelete: async (rowsDeleted: IRowsDeleted): Promise<void> => {
            const ingredientsToRemoveIndex = rowsDeleted.data.map((item) => item.index);
            const ingredientToRemoveLength = ingredientsToRemoveIndex.length;

            ingredientsToRemoveIndex.map(async (ingredientIndex, index) => {
                const ingredientId = ingredients[ingredientIndex].id;
                const completed = ingredientToRemoveLength === index + 1;
                await props.deleteIngredient(ingredientId, completed);
                completed && (await _refreshProducts(globalConstants.DEFAULT_REFRESH_PARAMS));
            });
        },
    };

    const _refreshProducts = async (pagination: Pagination): Promise<void> => {
        dispatch(getProducts(pagination));
    };
    return (
        <DynamicTable
            title={'Produktet'}
            options={options}
            columns={tableColumns}
            data={products}
            total={total}
            loading={loading}
            refreshData={_refreshProducts}
        />
    );
};

export default Product;
