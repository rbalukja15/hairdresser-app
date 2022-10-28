import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { extraReducer } from './reducer';

export interface IProductSliceSlice {
    loading: boolean;
    products: Array<any>;
    total: number;
}

export const initialState: IProductSliceSlice = {
    loading: false,
    products: [],
    total: 0,
};

export const slice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: extraReducer,
});

export const selectProduct = (state: RootState) => {
    return {
        loading: state.product.loading,
        products: state.product.products,
        total: state.product.total,
    };
};

export default slice.reducer;
