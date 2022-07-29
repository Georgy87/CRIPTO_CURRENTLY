import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchGetQuotes } from './actions';
import { Asset, QuotesDataResponse } from '../../../services/api/types';
import { QuotesState } from './types';

export const initialState: QuotesState = {
    isLoading: false,
    error: null,
    allQuotes: [],
    assets: [],
    rates: {},
};

export const quotesSlice = createSlice({
    name: 'quote',
    initialState,
    reducers: {
        defaultQuotesState() {
            return initialState;
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(fetchGetQuotes.pending.type, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchGetQuotes.fulfilled.type, (state, action: PayloadAction<QuotesDataResponse>) => {
                const { payload } = action;
                const quotes: string[] = [];

                if (payload.result === 'ok') {
                    const upgradeAssets = ({ asset, startDate, quote }: Asset) => {
                        quotes.push(asset);
                        return {
                            asset,
                            quote: Number(quote),
                            startDate: new Date(startDate).getTime(),
                        };
                    };
                    state.allQuotes = quotes;
                    state.assets = payload.assets.map(upgradeAssets);
                    state.isLoading = false;
                } else {
                    state.isLoading = false;
                    state.error = payload.error;
                }
            }),
});

export const { defaultQuotesState } = quotesSlice.actions;

export const quotesReducer = quotesSlice.reducer;
