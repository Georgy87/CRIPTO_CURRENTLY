import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Button } from '../../layouts/Button/Button';
import { Input } from '../../layouts/Input/Input';
import { loadingSelector } from '../../store/slices/history/selectors';
import { errorSelector, quotesSelector } from '../../store/slices/quotes/quotesSelector';
import { createRates } from '../../utils/createRates';
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

    const currentListOne = Object.keys(allRates).sort();
    const [currentsOne, setCurrentsOne] = useState<string>(currentListOne[0]);

    const currentListTwo = currentsOne && Object.keys(allRates[currentsOne]).sort();
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
        setSumValue(e.target.value);
    };

    const onChangeSelect1 = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setConversionResult(null);
        setCurrentsOne(e.target.value);
        setCurrentsTwo(Object.keys(allRates[e.target.value]).sort()[0]);
    };

    const onChangeSelect2 = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setConversionResult(null);
        setCurrentsTwo(e.target.value);
    };

    if (error !== null) {
        return <ServerError />;
    }

    return (
        <div className={styles.tabRoot}>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className={styles.formWrapper}>
                        <label className={styles.label}>Сумма</label>
                        <div className={styles.inputsWrapper}>
                            <Input
                                type="number"
                                typeStyle="converter"
                                value={sumValue}
                                onChanged={(e: React.ChangeEvent<HTMLInputElement>) => onChangeInput(e)}
                            />
                            <select onChange={onChangeSelect1}>
                                {currentListOne.map((current) => {
                                    return (
                                        <option key={current} value={current}>
                                            {current}
                                        </option>
                                    );
                                })}
                            </select>
                            <select onChange={onChangeSelect2}>
                                {Array.isArray(currentListTwo) &&
                                    currentListTwo.map((current) => {
                                        return (
                                            <option key={current} value={current}>
                                                {current}
                                            </option>
                                        );
                                    })}
                            </select>
                            <Button
                                onClicked={() => {
                                    setConversionResult(null);
                                    console.log(allRates, currentsOne, currentsTwo);
                                    setConversionResult(+sumValue * allRates[currentsOne][currentsTwo]);
                                }}
                                disabled={!(sumValue.length > 0)}
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
