import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Button } from '../../layouts/Button/Button';
import { Input } from '../../layouts/Input/Input';
import { loadingSelector } from '../../store/slices/history/selectors';
import { errorSelector, quotesSelector } from '../../store/slices/quotes/quotesSelector';
import { createRates } from '../../utils/createRates';
import { ArrowDown } from '../Icons/ArrowDown';
import { ArrowUp } from '../Icons/ArrowUp';
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
    const [isActive1, setIsActive1] = useState<boolean>(false);
    const [isActive2, setIsActive2] = useState<boolean>(false);

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
        setConversionResult(null);
        setSumValue(e.target.value);
    };

    const onChangeSelect1 = (option: string) => {
        setConversionResult(null);
        setCurrentsOne(option);
        setCurrentsTwo(Object.keys(allRates[option]).sort()[0]);
    };

    const onChangeSelect2 = (option: string) => {
        setConversionResult(null);
        setCurrentsTwo(option);
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
                            <div className={styles.dropdown}>
                                <div
                                    className={styles.dropdownBtn}
                                    onClick={(e) => {
                                        setIsActive1(!isActive1);
                                    }}
                                >
                                    {currentsOne}
                                    <span>{isActive1 ? <ArrowUp /> : <ArrowDown />}</span>
                                </div>
                                {isActive1 && (
                                    <div className={styles.dropdownContent1}>
                                        {currentListOne.map((option) => {
                                            return (
                                                <div
                                                    onClick={(e) => {
                                                        onChangeSelect1(option);
                                                        setIsActive1(false);
                                                    }}
                                                    className={styles.dropdownItem}
                                                >
                                                    {option}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                                <div className={styles.dropdownBtn} onClick={(e) => setIsActive2(!isActive2)}>
                                    {currentsTwo}
                                    <span>{isActive2 ? <ArrowUp /> : <ArrowDown />}</span>
                                </div>
                                {isActive2 && (
                                    <div className={styles.dropdownContent2}>
                                        {Array.isArray(currentListTwo) &&
                                            currentListTwo.map((option) => {
                                                return (
                                                    <div
                                                        onClick={(e) => {
                                                            onChangeSelect2(option);
                                                            setIsActive2(false);
                                                        }}
                                                        className={styles.dropdownItem}
                                                    >
                                                        {option}
                                                    </div>
                                                );
                                            })}
                                    </div>
                                )}
                            </div>
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
