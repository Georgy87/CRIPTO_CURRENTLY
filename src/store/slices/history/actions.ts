import { createAsyncThunk } from '@reduxjs/toolkit';

import { authApi } from '../../../services/api/authApi';
import { historyApi } from '../../../services/api/historyApi';

export const fetchHistory = createAsyncThunk(
	'history/fetchHistoryStatus',
	async () => {
		try {
			const response = await historyApi.getHistory();
			
			return response;
		} catch (error) {
			console.log(error);
		}
	},
);
