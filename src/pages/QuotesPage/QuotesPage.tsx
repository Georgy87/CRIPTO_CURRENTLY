import { useEffect, useState } from 'react';

import { Tabs } from '../../components/Tabs/Tabs';
import { HistoryTab } from '../../components/HistoryTab/HistoryTab';
import { TABS_LIST } from './Constants';
import { ExchangeRateTab } from '../../components/ExchangeRateTab/ExchangeRateTab';
import { Converter } from '../../components/Converter/ConverterTab';

export const QuotesPage: React.FC = () => {
    const [tabId, setTabId] = useState<number>(0);
    const [tabName, setTabName] = useState<string>(TABS_LIST[tabId].name);

    useEffect(() => {
        setTabName(TABS_LIST[tabId].name);
    }, [tabId, tabName]);

    return (
        <div>
            <Tabs
                selected={tabName}
                onSelect={(tabId: number) => setTabId(tabId)}
                tabs={TABS_LIST}
            />
            {tabName === 'Курсы валют' && <ExchangeRateTab />}
            {tabName === 'Конвертор' && <Converter />}
            {tabName === 'История' && <HistoryTab />}
        </div>
    );
};
