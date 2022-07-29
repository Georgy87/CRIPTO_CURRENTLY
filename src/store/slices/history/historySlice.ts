import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { HistoryData } from '../../../services/api/types';
import { historyService } from '../../../services/history/history';
import { fetchHistory } from './actions';
import { Deal, HistoryState } from './types';

export const initialState: HistoryState = {
    isLoading: false,
    error: null,
    pages: [],
    deals: [],
    currentPage: 0,
};

export const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        defaultHistoryState() {
            return initialState;
        },
        prevPage(state) {
            if (state.currentPage > 0) state.currentPage -= 1;
        },
        nextPage(state) {
            if (state.currentPage < state.pages.length - 1) state.currentPage += 1;
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(fetchHistory.pending.type, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchHistory.fulfilled.type, (state, action: PayloadAction<HistoryData>) => {
                const { payload } = action;
                if (payload.result === 'ok') {
                    state.deals = payload.deals;
                    state.pages = historyService.getDeals(payload.deals);
                    state.isLoading = false;
                } else {
                    state.isLoading = false;
                    state.error = 'error';
                }
            }),
});

export const { prevPage, nextPage, defaultHistoryState } = historySlice.actions;

export const historyReducer = historySlice.reducer;
