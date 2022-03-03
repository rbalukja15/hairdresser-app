import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { getProducts } from './actions';

export interface IProductSliceSlice {
    loading: boolean;
    products: Array<any>;
    total: number;
}

const initialState: IProductSliceSlice = {
    loading: false,
    products: [],
    total: 0,
};

export const slice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
                state.total = 23;
            })
            .addCase(getProducts.rejected, (state) => {
                state.loading = false;
                state.products = [];
            });
    },
});

export const selectProduct = (state: RootState) => {
    return {
        loading: state.product.loading,
        products: state.product.products,
        total: state.product.total,
    };
};

export default slice.reducer;
