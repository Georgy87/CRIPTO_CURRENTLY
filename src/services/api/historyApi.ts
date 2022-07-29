import { instance } from '../../core/axios';

import { HistoryData } from './types';

export const historyApi = {
    async getHistory(): Promise<HistoryData> {
        const { data } = await instance.post('/', {
            action: 'history',
        });

        return data;
    },
};
