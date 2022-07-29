import { format } from 'date-fns';
import { useSelector } from 'react-redux';

import { Table, TBody, Td, Th, Thead, TRow } from '../../layouts/Table/Table';
import {
    currentPageSelector,
    pagesSelector,
} from '../../store/slices/history/selectors';

export const HistoryTable = () => {
    const pages = useSelector(pagesSelector);
    const currentPage = useSelector(currentPageSelector);

    return (
        <Table typeStyle='history'>
            <Thead>
                <TRow>
                    <Th>Актив</Th>
                    <Th>Начало</Th>
                    <Th>Котировка</Th>
                    <Th>Конец</Th>
                    <Th>Котировка</Th>
                    <Th>Прибыль</Th>
                </TRow>
            </Thead>
            <TBody>
                {pages[currentPage].map((deal) => {
                    return (
                        <TRow key={deal.startDate + deal.finishDate}>
                            <Td>{deal.asset}</Td>
                            <Td>
                                {format(
                                    new Date(deal.startDate),
                                    'hh:mm dd.MM.yyyy'
                                )}
                            </Td>
                            <Td>{deal.startQuote}</Td>
                            <Td>
                                {format(
                                    new Date(deal.finishDate),
                                    'hh:mm dd.MM.yyyy'
                                )}
                            </Td>
                            <Td>{deal.finishQuote}</Td>
                            <Td>
                                {deal.profit > 0 ? `+${deal.profit}` : `${deal.profit}`}
                            </Td>
                        </TRow>
                    );
                })}
            </TBody>
        </Table>
    );
};
