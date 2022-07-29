import { instance } from '../../core/axios';
import { QuotesDataResponse } from './types';

export const quotesApi = {
    async qetQuotes(): Promise<QuotesDataResponse> {
        const { data } = await instance.post('/', {
            action: 'quote',
        });

        return data;
    },
};
