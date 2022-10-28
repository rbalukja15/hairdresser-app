import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { ISaleSliceSlice, initialState } from './slice';
import { fetchSales } from './action';

export const extraReducer = (builder: ActionReducerMapBuilder<ISaleSliceSlice>) => {
    builder
        .addCase(fetchSales.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchSales.fulfilled, (state, action) => {
            state.loading = false;
            state.sales = action.payload;
            state.total = action.payload.length;
        })

        .addCase(fetchSales.rejected, (state) => {
            state.loading = false;
            state.sales = [];
        })
        .addDefaultCase((state) => {
            state = initialState;
        });
};
