import { createAsyncThunk } from '@reduxjs/toolkit';

import { quotesApi } from '../../../services/api/quotesApi';

export const fetchGetQuotes = createAsyncThunk(
    'quotes/fetchGetQuotesStatus',
    async () => {
        try {
            const response = await quotesApi.qetQuotes();
            return response;
        } catch (error) {
            console.log(error);
        }
    }
);
