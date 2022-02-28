import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteBuying, getBuyings } from './api';
import { Pagination } from '../../shared/components/interfaces';

export const fetchBuyings = createAsyncThunk('/api/buying', async (params: Pagination, { rejectWithValue }) => {
    try {
        return await getBuyings(params.paging, params.searchText, params.filters);
    } catch (error) {
        return rejectWithValue(error.response.message);
    }
});

export const removeBuying = createAsyncThunk('/api/buying/:id', async (buyingId: string, { rejectWithValue }) => {
    try {
        return await deleteBuying(buyingId);
    } catch (error) {
        return rejectWithValue(error.response.message);
    }
});
