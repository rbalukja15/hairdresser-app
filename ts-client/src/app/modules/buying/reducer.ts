import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { IBuyingSliceSlice, initialState } from './slice';
import { fetchBuyings, removeBuying } from './action';

export const extraReducer = (builder: ActionReducerMapBuilder<IBuyingSliceSlice>) => {
    builder
        .addCase(fetchBuyings.pending, (state) => {
            state.loading = true;
        })
        .addCase(removeBuying.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchBuyings.fulfilled, (state, action) => {
            state.loading = false;
            state.buyings = action.payload;
            state.total = action.payload.length;
        })
        .addCase(removeBuying.fulfilled, (state, action) => {
            state.loading = false;
        })
        .addCase(fetchBuyings.rejected, (state) => {
            state.loading = false;
            state.buyings = [];
        })
        .addCase(removeBuying.rejected, (state) => {
            state.loading = false;
            state.error = true;
            state.errorMessage = 'Error deleting buying';
        })
        .addDefaultCase((state) => {
            state = initialState;
        });
};
