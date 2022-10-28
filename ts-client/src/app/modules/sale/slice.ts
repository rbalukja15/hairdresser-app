import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { extraReducer } from './reducer';

export interface ISaleSliceSlice {
    loading: boolean;
    sales: Array<any>;
    total: number;
    error: boolean;
    errorMessage: string;
}

export const initialState: ISaleSliceSlice = {
    loading: false,
    sales: [],
    total: 0,
    error: false,
    errorMessage: '',
};

export const slice = createSlice({
    name: 'sale',
    initialState,
    reducers: {},
    extraReducers: extraReducer,
});

export const saleSelector = (state: RootState) => {
    return {
        loading: state.sale.loading,
        sales: state.sale.sales,
        total: state.sale.total,
        error: state.sale.error,
        errorMessage: state.sale.errorMessage,
    };
};

export default slice.reducer;
