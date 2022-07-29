import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './slices/auth/authSlice';
import { historyReducer } from './slices/history/historySlice';
import { quotesReducer } from './slices/quotes/quotesSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		history: historyReducer,
		quotes: quotesReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
