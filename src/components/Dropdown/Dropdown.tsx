import { memo, useState } from 'react';

import { ArrowDown } from '../Icons/ArrowDown';
import { ArrowUp } from '../Icons/ArrowUp';

import styles from './Dropdown.module.scss';

type PropsType = {
    allRates: Record<string, Record<string, number>>;
    currentsOne: string;
    currentsTwo: string;
    currentListOne: string[];
    currentListTwo: string | string[];
    setCurrentsOne: (volue: string) => void;
    setCurrentsTwo: (volue: string) => void;
    setConversionResult: (value: number | null) => void;
};

const Dropdown: React.FC<PropsType> = ({
    allRates,
    currentsOne,
    currentsTwo,
    currentListOne,
    currentListTwo,
    setConversionResult,
    setCurrentsOne,
    setCurrentsTwo,
}) => {
    const [isActive1, setIsActive1] = useState<boolean>(false);
    const [isActive2, setIsActive2] = useState<boolean>(false);

    const onChangeSelect1 = (option: string) => {
        setConversionResult(null);
        setCurrentsOne(option);
        setCurrentsTwo(Object.keys(allRates[option]).sort()[0]);
    };

    const onChangeSelect2 = (option: string) => {
        setConversionResult(null);
        setCurrentsTwo(option);
    };

    return (
        <>
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
                    <div className={styles.dropdownContent}>
                        {currentListOne.map((option: string) => {
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
            </div>
            <div className={styles.dropdown}>
                <div className={styles.dropdownBtn} onClick={(e) => setIsActive2(!isActive2)}>
                    {currentsTwo}
                    <span>{isActive2 ? <ArrowUp /> : <ArrowDown />}</span>
                </div>
                {isActive2 && (
                    <div className={styles.dropdownContent}>
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
        </>
    );
};

export default memo(Dropdown);
