import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { productService } from './productAPI';
import { IFilters, IPagination } from '../../shared/components/interfaces';

export interface IProductSliceSlice {
    loading: boolean;
    products: Array<any>;
}

const initialState: IProductSliceSlice = {
    loading: false,
    products: [],
};

type ProductDetails = {
    pagination: IPagination;
    searchText?: string;
    filters?: IFilters;
};

export const getProducts = createAsyncThunk(
    '/api/items',
    async (productDetails: ProductDetails, { rejectWithValue }) => {
        try {
            return await productService.getProducts(
                productDetails.pagination,
                productDetails.searchText,
                productDetails.filters,
            );
        } catch (error) {
            return rejectWithValue(error.response.message);
        }
    },
);

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(getProducts.rejected, (state) => {
                state.loading = false;
                state.products = [];
            });
    },
});

export const selectProduct = (state: RootState) => {
    return {
        loading: state.product.loading,
        products: state.product.products,
    };
};

export default productSlice.reducer;
