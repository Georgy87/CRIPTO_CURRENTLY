import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from './store';
import { fetchHistory } from './store/slices/history/actions';
import { QuotesPage } from './pages/QuotesPage/QuotesPage';
import { fetchGetQuotes } from './store/slices/quotes/actions';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { isLoginSelector } from './store/slices/auth/selectors';
import { Button } from './layouts/Button/Button';
import { logout } from './store/slices/auth/authSlice';
import { fetchLogin } from './store/slices/auth/actions';
import { defaultHistoryState } from './store/slices/history/historySlice';
import { defaultQuotesState } from './store/slices/quotes/quotesSlice';

import styles from './App.module.scss';

function App() {
    const dispatch = useDispatch<AppDispatch>();
    const isLogin = useSelector(isLoginSelector);

    useEffect(() => {
        dispatch(fetchHistory());
        dispatch(fetchGetQuotes());

        document.documentElement.style.setProperty(
            '--scrollbar-width',
            window.innerWidth - document.documentElement.offsetWidth + 'px'
        );
    }, []);

    return (
        <div className={styles.app}>
            <header className={styles.header}>
                <div className={styles.headerTitle}>TEST SPA app</div>
                <div className={styles.headerRight}>
                    {isLogin && (
                        <Button
                            onClicked={() => {
                                dispatch(logout());
                                dispatch(defaultHistoryState());
                                dispatch(defaultQuotesState());
                            }}
                            typeStyle="secondary"
                        >
                            Выход
                        </Button>
                    )}
                </div>
            </header>
            <div className={styles.mainContent}>{isLogin ? <QuotesPage /> : <LoginPage />}</div>
        </div>
    );
}

export default App;
