import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteBuying, getBuyings } from './api';
import { Pagination } from '../../shared/components/interfaces';

export const fetchBuyings = createAsyncThunk('/api/buyings', async (params: Pagination, { rejectWithValue }) => {
    try {
        return await getBuyings(params);
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
