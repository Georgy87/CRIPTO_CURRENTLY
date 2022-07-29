import { Asset } from '../services/api/types';

export const createRates = (quotes: Record<string, Asset>) => {
    const rates: Record<string, Record<string, number>> = {};
    for (let currencyPair of Object.keys(quotes)) {
        const currentOne = currencyPair.split('/')[0];
        const currentTwo = currencyPair.split('/')[1];
        
        if (rates[currentOne]) {
            rates[currentOne] = rates[currentOne];
        } else {
            rates[currentOne] = {};
        }
        if (rates[currentTwo]) {
            rates[currentTwo] = rates[currentTwo];
        } else {
            rates[currentTwo] = {};
        }

        rates[currentOne][currentTwo] = quotes[currencyPair].quote;
        rates[currentTwo][currentOne] = 1 / quotes[currencyPair].quote;
    }
    return rates;
};
