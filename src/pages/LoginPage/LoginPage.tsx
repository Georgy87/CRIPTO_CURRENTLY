import React, { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ArrowRight } from '../../components/Icons/ArrowRight';
import { Button } from '../../layouts/Button/Button';
import { Input } from '../../layouts/Input/Input';
import { AppDispatch } from '../../store';
import { fetchLogin } from '../../store/slices/auth/actions';
import { errorSelector } from '../../store/slices/auth/selectors';
import { validateLogin } from '../../utils/validation';

import styles from './LoginPage.module.scss';

export const LoginPage: React.FC = () => {
    const error = useSelector(errorSelector);

    const dispatch = useDispatch<AppDispatch>();

    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [validationResult, setValidationResult] = useState<string | null>(null);
    return (
        <div className={styles.root}>
            <h1>Вход в личный кабинет</h1>
            <div className={styles.loginWrapper}>
                <form
                    className={styles.form}
                    onSubmit={(e: FormEvent) => {
                        e.preventDefault();
                        const result = validateLogin(login, password);
                        if (result === null) {
                            setValidationResult(null);
                            dispatch(fetchLogin({ login, password }));
                        } else {
                            setValidationResult(result);
                        }
                    }}
                >
                    <div className={styles.inputWrapper}>
                        <label>Логин</label>
                        <Input
                            value={login}
                            type="email"
                            typeStyle={validationResult || error ? 'error' : 'auth'}
                            onChanged={(e: React.ChangeEvent<HTMLInputElement>) => setLogin(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <label>Пароль</label>
                        <Input
                            value={login}
                            type="password"
                            typeStyle={validationResult || error ? 'error' : 'auth'}
                            onChanged={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        />
                    </div>
                    <Button disabled={!login || !password} typeStyle="primary" className={styles.submit} type="submit">
                        Вход <ArrowRight />
                    </Button>
                    <p className={styles.serverError}>{validationResult || error}</p>
                </form>
            </div>
        </div>
    );
};
