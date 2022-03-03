import { createAsyncThunk } from '@reduxjs/toolkit';
import { Pagination } from '../../shared/components/interfaces';
import { productService } from './api';

export const getProducts = createAsyncThunk('/api/items', async (pagination: Pagination, { rejectWithValue }) => {
    try {
        return await productService.getProducts(pagination);
    } catch (error) {
        return rejectWithValue(error.response.message);
    }
});
