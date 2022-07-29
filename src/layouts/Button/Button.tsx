import React, { ReactNode } from 'react';

import classNames from 'classnames';

import styles from './Button.module.scss';

type PropsType = {
    className?: string;
    type?: string;
    typeStyle: 'primary' | 'secondary' | 'pressed';
    children: ReactNode;
    onClicked?: () => void;
    disabled?: boolean;
};

export const Button: React.FC<PropsType> = ({
    children,
    typeStyle,
    onClicked,
    disabled,
    className
}) => {
    return (
        <div className={styles.btn}>
            <button
                disabled={disabled}
                onClick={onClicked}
                className={classNames(`${styles.btn}`, {
                    [styles.primary]: typeStyle === 'primary',
                    [styles.secondary]: typeStyle === 'secondary',
                    [styles.pressed]: typeStyle === 'pressed',
                }, className)}
            >
                {children}
            </button>
        </div>
    );
};
