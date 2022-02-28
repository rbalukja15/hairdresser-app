import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { fetchBuyings, removeBuying } from './action';

export interface IProductSliceSlice {
    loading: boolean;
    buyings: Array<any>;
    total: number;
    error: boolean;
    errorMessage: string;
}

const initialState: IProductSliceSlice = {
    loading: false,
    buyings: [],
    total: 0,
    error: false,
    errorMessage: '',
};

export const slice = createSlice({
    name: 'buying',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
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
                state.total = 23;
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
            });
    },
});

export const buyingSelector = (state: RootState) => {
    return {
        loading: state.buying.loading,
        buyings: state.buying.buyings,
        total: state.buying.total,
        error: state.buying.error,
        errorMessage: state.buying.errorMessage,
    };
};

export default slice.reducer;
