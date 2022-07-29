import { RootState } from '../../index';

export const mainSelector = (state: RootState) => state.auth;

export const errorSelector = (state: RootState) => mainSelector(state).error;
export const loadingSelector = (state: RootState) => mainSelector(state).loading;
export const isLoginSelector = (state: RootState) => mainSelector(state).isLogin;
