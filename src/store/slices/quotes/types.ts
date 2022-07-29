import { Asset } from '../../../services/api/types';

export type QuotesState = {
    isLoading: boolean;
    error: string | null;
    allQuotes: string[];
    assets: Asset[] | [];
    rates: Record<string, Record<string, number>>;
};
