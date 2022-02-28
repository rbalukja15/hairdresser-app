import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from './modules/auth/authSlice';
import productReducer from './modules/product/productSlice';
import buyingReducer from './modules/buying/slice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        auth: authReducer,
        product: productReducer,
        buying: buyingReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
