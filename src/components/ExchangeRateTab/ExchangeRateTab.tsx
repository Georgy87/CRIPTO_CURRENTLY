import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Table, Th, Thead, TRow, TBody, Td } from '../../layouts/Table/Table';
import { errorSelector, loadingSelector, quotesSelector } from '../../store/slices/quotes/quotesSelector';
import { Star } from '../Icons/Star';
import { Loader } from '../Loader/Loader';
import { ServerError } from '../ServerError/ServerError';

export const ExchangeRateTab = () => {
    const { quotes, quotesForUnselected } = useSelector(quotesSelector);
    const loading = useSelector(loadingSelector);
    const error = useSelector(errorSelector);

    let [unselectedQutes, setUnselectedQutes] = useState<string[]>([]);
    let [selectedQutes, setSelectedQutes] = useState<string[]>([]);

    useEffect(() => {
        setUnselectedQutes((unselectedQutes: string[]) => {
            unselectedQutes = quotesForUnselected;
            return unselectedQutes;
        });
        setUnselectedQutes(() => {
            const caсheSelectedQutes = new Set(selectedQutes);
            const updateUnselectedQutes = quotesForUnselected.filter((quote) => !caсheSelectedQutes.has(quote));
            return updateUnselectedQutes;
        });
    }, [quotes]);

    const onToggleQuote = (quote: string) => {
        if (!selectedQutes.includes(quote)) {
            setSelectedQutes((selectedQutes) => {
                return [quote, ...selectedQutes];
            });
        } else {
            setSelectedQutes((selectedQutes) => {
                selectedQutes = selectedQutes.filter((selectedQuote) => selectedQuote !== quote);
                return selectedQutes;
            });
        }
    };

    useEffect(() => {
        setUnselectedQutes((unselectedQutes) => {
            const caсheSelectedQutes = new Set(selectedQutes);
            const updateUnselectedQutes = quotesForUnselected.filter((quote) => !caсheSelectedQutes.has(quote));
            unselectedQutes = updateUnselectedQutes;
            return unselectedQutes;
        });
    }, [selectedQutes]);

    if (error !== null) {
        return <ServerError />;
    }

    return (
        <Table typeStyle="exchange">
            {loading ? (
                <Loader />
            ) : (
                <>
                    <Thead>
                        <TRow>
                            <Th />
                            <Th>Валютная пара</Th>
                            <Th>Котировка </Th>
                            <Th>Дата получения</Th>
                        </TRow>
                    </Thead>
                    <TBody>
                        {selectedQutes.map((quote) => {
                            const asset = quotes[quote];
                            const startDate = quotes[quote].startDate;
                            return (
                                <TRow key={quote}>
                                    <Td>
                                        <Star checked={true} onClicked={() => onToggleQuote(quote)} />
                                    </Td>
                                    <Td>{quote}</Td>
                                    <Td>{asset.quote}</Td>
                                    <Td>{format(new Date(startDate), 'dd.MM.yyyy')}</Td>
                                </TRow>
                            );
                        })}
                        {unselectedQutes.map((quote) => {
                            const asset = quotes[quote];
                            const startDate = quotes[quote].startDate;
                            return (
                                <TRow key={quote}>
                                    <Td>
                                        <Star checked={false} onClicked={() => onToggleQuote(quote)} />
                                    </Td>
                                    <Td>{quote}</Td>
                                    <Td>{asset.quote}</Td>
                                    <Td>{format(new Date(startDate), 'dd.MM.yyyy')}</Td>
                                </TRow>
                            );
                        })}
                    </TBody>
                </>
            )}
        </Table>
    );
};
