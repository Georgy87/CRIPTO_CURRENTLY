export type HistoryState = {
	isLoading: boolean;
	error: string | null;
	pages: Deal[][];
	deals: Deal[];
	currentPage: number;
};

export type Deal = {
    asset: string;
    startDate: number;
    startQuote: number;
    finishDate: number;
    finishQuote: number;
    profit: number;
};

export type ServerDataDeal = {
	asset: string;
	startDate: string;
	startQuote: string;
	finishDate: string;
	finishQuote: string;
	profit: string;
};


