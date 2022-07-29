import { useDispatch, useSelector } from 'react-redux';

import { Button } from '../../layouts/Button/Button';
import { nextPage, prevPage } from '../../store/slices/history/historySlice';
import { currentPageSelector, pagesSelector } from '../../store/slices/history/selectors';
import { ArrowLeft } from '../Icons/ArrowLeft';
import { ArrowRight } from '../Icons/ArrowRight';

import styles from './Pagination.module.scss';

export const Pagination = () => {
    const dispatch = useDispatch();
    const pages = useSelector(pagesSelector);
    const currentPage = useSelector(currentPageSelector);
    
    return (
        <div className={styles.pagination}>
            <Button
                typeStyle="pressed"
                disabled={!(currentPage > 0)}
                onClicked={() => dispatch(prevPage())}
            >
                <ArrowLeft />
            </Button>
            <span className={styles.counter}>
                {currentPage + 1} / {pages.length}
            </span>
            <Button
                typeStyle="pressed"
                disabled={!(currentPage < pages.length - 1)}
                onClicked={() => dispatch(nextPage())}
            >
                <ArrowRight />
            </Button>
        </div>
    );
};
