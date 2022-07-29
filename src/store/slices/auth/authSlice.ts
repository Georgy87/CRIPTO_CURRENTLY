import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LoginData } from '../../../services/api/types';
import { fetchLogin } from './actions';
import { AuthState } from './types';

export const initialState: AuthState = {
    loading: false,
    isLogin: false,
    error: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout() {
            return initialState;
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(fetchLogin.pending.type, (state) => {
                state.loading = true;
            })
            .addCase(fetchLogin.fulfilled.type, (state, action: PayloadAction<LoginData>) => {
                const { payload } = action;
                if (payload.result === 'ok') {
                    state.error = null;
                    state.isLogin = true;
                    state.loading = false;
                } else {
                    state.error = payload.error;
                }
            }),
});

export const { logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
