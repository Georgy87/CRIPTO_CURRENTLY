import { Asset } from '../../../services/api/types';
import { RootState } from './../../index';

export const mainSelector = (state: RootState) => state.quotes;

export const quotesSelector = (state: RootState) => {
    const quotes: Record<string, Asset> = {};

    for (let qoute of mainSelector(state).assets) {
        quotes[qoute.asset] = qoute;
    }
    
    return {
        quotes, 
        quotesForUnselected: Object.keys(quotes),
    }
};

export const loadingSelector = (state: RootState) =>  mainSelector(state).isLoading;
export const errorSelector = (state: RootState) => mainSelector(state).error;
