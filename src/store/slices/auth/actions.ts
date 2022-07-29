import { createAsyncThunk } from '@reduxjs/toolkit';

import { authApi } from '../../../services/api/authApi';

export const fetchLogin = createAsyncThunk(
	'auth/loginStatus',
	async (payload: { login: string; password: string }) => {
		try {
			const response = await authApi.login(payload);
		
			return response;
		} catch (error) {
			console.log(error);
		}
	},
);
