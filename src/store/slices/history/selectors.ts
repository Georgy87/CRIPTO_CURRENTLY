import { RootState } from './../../index';

export const mainSelector = (state: RootState) => state.history;

export const pagesSelector = (state: RootState) => mainSelector(state).pages;
export const currentPageSelector = (state: RootState) => mainSelector(state).currentPage;
export const loadingSelector = (state: RootState) => mainSelector(state).isLoading;

export const errorSelector = (state: RootState) => mainSelector(state).error;