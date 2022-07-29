import { useSelector } from 'react-redux';
import { errorSelector, loadingSelector } from '../../store/slices/history/selectors';

import { HistoryTable } from '../HistoryTable/HistoryTable';
import { Loader } from '../Loader/Loader';
import { Pagination } from '../Pagination/Pagination';
import { ServerError } from '../ServerError/ServerError';

import styles from './HistoryTab.module.scss';

export const HistoryTab = () => {
    const loading = useSelector(loadingSelector);
    const error = useSelector(errorSelector);
    
    if (error !== null) {
        return <ServerError />;
    }
    return (
        <div className={styles.table}>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <HistoryTable />
                    <Pagination />
                </>
            )}
        </div>
    );
};
