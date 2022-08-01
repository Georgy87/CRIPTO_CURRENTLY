import classNames from 'classnames';
import { ReactNode } from 'react';

import styles from './Table.module.scss';

type PropsType = {
    children?: ReactNode;
    typeStyle?: string;
};

export const Table: React.FC<PropsType> = ({ children, typeStyle }) => {
    return (
        <table
            className={classNames(`${styles.table}`, {
                [styles.history]: typeStyle === 'history',
                [styles.exchange]: typeStyle === 'exchange',
            })}
        >
            {children}
        </table>
    );
};

export const Thead: React.FC<PropsType> = ({ children }) => <thead className={styles.tableHead}>{children}</thead>;

export const TBody: React.FC<PropsType> = ({ children }) => <tbody className={styles.tableBody}>{children}</tbody>;

export const TRow: React.FC<PropsType> = ({ children }) => <tr className={styles.tr}>{children}</tr>;

export const Th: React.FC<PropsType> = ({ children }) => <th className={styles.th}>{children}</th>;

export const Td: React.FC<PropsType> = ({ children }) => <td className={styles.td}>{children}</td>;
