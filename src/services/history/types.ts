import { Deal } from '../../store/slices/history/types';

export interface IHistoryService {
    numberOfDealsPerPage: number;
    maximumNegativeDeals: number;
    highProfit: number;
    maximumOfIdenticalAssets: number;
    getDeals: (deals: Deal[]) => Deal[][];
    splitDealsIntoPages: (deals: Deal[], size: number) => Deal[][];
}
