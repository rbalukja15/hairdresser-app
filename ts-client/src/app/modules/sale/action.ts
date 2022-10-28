import { createAsyncThunk } from '@reduxjs/toolkit';
import { getSales } from './api';
import { Pagination } from '../../shared/components/interfaces';

export const fetchSales = createAsyncThunk('/api/buyings', async (params: Pagination, { rejectWithValue }) => {
    try {
        return await getSales(params);
    } catch (error) {
        return rejectWithValue(error.response.message);
    }
});
