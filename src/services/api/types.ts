import { Deal, ServerDataDeal } from '../../store/slices/history/types';

type ResultError = {
    result: 'error';
    error: string;
};

export type LoginData =
    | {
          result: 'ok';
      }
    | ResultError;

export type HistoryData =
    | {
          result: 'ok';
          deals: Deal[];
      }
    | ResultError;

export type HistoryDataResponse =
    | {
          result: 'ok';
          deals: ServerDataDeal[];
      }
    | ResultError;

export type Asset = {
    asset: string;
    startDate: number;
    quote: number;
};

export type QuotesDataResponse =
    | {
          result: 'ok';
          assets: Asset[];
      }
    | ResultError;
