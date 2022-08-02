import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { Button } from '../../layouts/Button/Button';
import { Input } from '../../layouts/Input/Input';
import { loadingSelector } from '../../store/slices/history/selectors';
import { errorSelector, quotesSelector } from '../../store/slices/quotes/quotesSelector';
import { createRates } from '../../utils/createRates';
import Dropdown from '../Dropdown/Dropdown';
import { Loader } from '../Loader/Loader';
import { ServerError } from '../ServerError/ServerError';

import styles from './ConverterTab.module.scss';

export const Converter = () => {
    const { quotes } = useSelector(quotesSelector);
    const loading = useSelector(loadingSelector);
    const error = useSelector(errorSelector);

    const [allRates, setAllRates] = useState<Record<string, Record<string, number>>>({});
    const [sumValue, setSumValue] = useState<string>('0');
    const [conversionResult, setConversionResult] = useState<number | null>();

    const currentListOne = useMemo(() => Object.keys(allRates).sort(), [allRates]);
    const [currentsOne, setCurrentsOne] = useState<string>(currentListOne[0]);

    const currentListTwo = useMemo(() => currentsOne && Object.keys(allRates[currentsOne]).sort(), [allRates, currentsOne]);
    const [currentsTwo, setCurrentsTwo] = useState<string>(currentListTwo && currentListTwo[0]);

    useEffect(() => {
        setAllRates(createRates(quotes));
    }, []);

    useEffect(() => {
        setCurrentsOne(currentListOne[0]);
    }, [allRates]);

    useEffect(() => {
        setCurrentsTwo(currentListTwo && currentListTwo[0]);
    }, [currentsOne]);

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConversionResult(null);
        setSumValue(e.target.value);
    };

    if (error !== null) {
        return <ServerError />;
    }

    return (
        <div className={styles.tabRoot}>
            <div className={styles.header}>Конвертация валют</div>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className={styles.formWrapper}>
                        <div className={styles.label}>Сумма</div>
                        <div className={styles.inputsWrapper}>
                            <Input
                                type="number"
                                typeStyle="converter"
                                value={sumValue}
                                onChanged={(e: React.ChangeEvent<HTMLInputElement>) => onChangeInput(e)}
                            />
                            <Dropdown
                                allRates={allRates}
                                currentsOne={currentsOne}
                                currentListOne={currentListOne}
                                currentsTwo={currentsTwo}
                                currentListTwo={currentListTwo}
                                setConversionResult={setConversionResult}
                                setCurrentsOne={setCurrentsOne}
                                setCurrentsTwo={setCurrentsTwo}
                            />
                            <Button
                                onClicked={() => {
                                    setConversionResult(null);
                                    setConversionResult(+sumValue * allRates[currentsOne][currentsTwo]);
                                }}
                                disabled={!(sumValue.length > 0) || (sumValue === '0')}
                                className={styles.resultBtn}
                                typeStyle="primary"
                            >
                                Расссчитать
                            </Button>
                        </div>
                    </div>
                    <div className={styles.resultWrapper}>
                        {sumValue.length > 0 && !Number.isNaN(conversionResult) && conversionResult && (
                            <div className={styles.conversionResult}>
                                <div className={styles.resultTitle}>Итого</div>
                                <div className={styles.resultSum}>{conversionResult.toFixed(2)}</div>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};
