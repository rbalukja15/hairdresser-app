import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { extraReducer } from './reducer';

export interface IBuyingSliceSlice {
    loading: boolean;
    buyings: Array<any>;
    total: number;
    error: boolean;
    errorMessage: string;
}

export const initialState: IBuyingSliceSlice = {
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
    extraReducers: extraReducer,
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
