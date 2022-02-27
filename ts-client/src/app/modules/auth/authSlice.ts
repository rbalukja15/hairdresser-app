import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { loginService } from './authAPI';

export interface AuthSlice {
    loading: boolean;
    loggedIn: boolean;
}

const initialState: AuthSlice = {
    loading: false,
    loggedIn: false,
};

type LoginDetails = {
    email: string;
    password: string;
};

export const login = createAsyncThunk('/api/auth', async (loginDetails: LoginDetails, { rejectWithValue }) => {
    try {
        const response = await loginService(loginDetails);

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.message);
    }
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state) => {
                state.loading = false;
                state.loggedIn = true;
            })
            .addCase(login.rejected, (state) => {
                state.loading = false;
                state.loggedIn = true;
            });
    },
});

export const selectAuth = (state: RootState) => {
    return {
        loading: state.auth.loading,
        loggedIn: state.auth.loggedIn,
    };
};

export default authSlice.reducer;
