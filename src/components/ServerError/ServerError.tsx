import styles from './ServerError.module.scss';

export const ServerError = () => {
    return (
        <div className={styles.serverError}>
            <span> Ошибка сервера!</span>
        </div>
    );
};
