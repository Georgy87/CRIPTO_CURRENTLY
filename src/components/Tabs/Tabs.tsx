import classNames from "classnames";
import { memo } from "react";
import { shallowEqual } from "react-redux";

import styles from './Tabs.module.scss';

type Tab = {
    id: string | number;
    name: string;
};

type TabsProps = {
    selected: string;
    onSelect(id: string | number): void;
    tabs: Tab[];
};

export const Tabs = memo(({ tabs, selected, onSelect }: TabsProps) => {
    return (
        <div className={styles.tabs}>
            {tabs.map(({ id, name }) => (
                <div
                    key={id}
                    className={classNames(
                        styles.tab,
                        selected === name && styles.selected
                    )}
                    onClick={() => onSelect(id)}
                >
                    {name}
                </div>
            ))}
        </div>
    );
}, shallowEqual);