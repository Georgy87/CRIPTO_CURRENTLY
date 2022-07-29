import classNames from 'classnames';

import styles from './Input.module.scss';

type PropsType = {
    children?: React.ReactNode;
    type: string;
    value: string;
    typeStyle?: 'converter' | 'auth' | 'error';
    onChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input: React.FC<PropsType> = ({ children, typeStyle, type, onChanged }) => {
    return (
        <>
            <input
                type={type}
                className={classNames(`${styles.input}`, {
                    [styles.converter]: typeStyle === 'converter',
                    [styles.secondary]: typeStyle === 'auth',
                    [styles.error]: typeStyle === 'error',
                })}
                onChange={onChanged}
            />
        </>
    );
};
