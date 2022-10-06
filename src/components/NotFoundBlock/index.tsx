import styles from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Сторінка не знайдена
      </h1>
      <p className={styles.description}>
        Нажаль, дана сторінка відсутня в нашому інтернет-магазині
      </p>
    </div>
  );
};

export default NotFoundBlock;
