import { Deal } from '../../store/slices/history/types';

class HistoryService {
    numberOfDealsPerPage: number = 10;
    maximumNegativeDeals: number = 2;
    highProfit: number = 100;
    maximumOfIdenticalAssets: number = 2;
    getDeals(deals: Deal[]) {
        const sortedDeals: Deal[] = [...deals].sort((a, b) => b.finishDate - a.finishDate);
        const pages = [];

        // счетчик текущего элемента, добавляемого в массив сделок
        let countCurEl: number = 0;
        // счетчик текущего элемента на странице
        let countCurPageEl: number = 0;
        let numOfLosingDeals: number = 0;
        let numOfDealsPerAssetPerPage: Record<string, number> = {};

        for (const deal of sortedDeals) {
            if (pages.length === 0 || countCurEl % this.numberOfDealsPerPage === 0) {
                numOfDealsPerAssetPerPage = {};
                numOfLosingDeals = 0;
                countCurPageEl = 0;
            }

            const negativeProfit: boolean = deal.profit < 0;
            const profitOverHundred = deal.profit > this.highProfit;

            if (countCurEl % this.numberOfDealsPerPage === 0) {
                countCurPageEl = 0;
            }

            const numDealsPerAsset = numOfDealsPerAssetPerPage[deal.asset] || 0;

            if (
                (profitOverHundred || countCurPageEl < this.numberOfDealsPerPage - 1) &&
                (!negativeProfit || numOfLosingDeals < this.maximumNegativeDeals) &&
                this.maximumOfIdenticalAssets > numDealsPerAsset 
            ) {
                pages.push(deal);

                if (negativeProfit) {
                    numOfLosingDeals += 1;
                } else {
                    numOfLosingDeals += 0;
                }

                numOfDealsPerAssetPerPage[deal.asset] = numDealsPerAsset + 1;
                countCurPageEl++;
                countCurEl++;
            }
        }

        return this.splitDealsIntoPages(pages, this.numberOfDealsPerPage);
    }

    splitDealsIntoPages(deals: Deal[], size: number) {
        const result: Deal[][] = [];
        const len: number = deals.length;
        for (let i = 0; i < len; i += size) {
            result.push(deals.slice(i, i + size));
        }
        return result;
    }
}

export const historyService = new HistoryService();

