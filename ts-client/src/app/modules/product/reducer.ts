import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { IProductSliceSlice, initialState } from './slice';
import { getProducts } from './actions';

export const extraReducer = (builder: ActionReducerMapBuilder<IProductSliceSlice>) => {
    builder
        .addCase(getProducts.pending, (state) => {
            state.loading = true;
        })
        .addCase(getProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
            state.total = action.payload.length;
        })
        .addCase(getProducts.rejected, (state) => {
            state.loading = false;
            state.products = [];
            state.total = 0;
        })
        .addDefaultCase((state) => {
            state = initialState;
        });
};
