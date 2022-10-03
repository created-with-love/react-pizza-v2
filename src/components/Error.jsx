function Error() {
  return (
    <div className="content__error-info">
      <h2 className="content__title">
        Упс, трапилась помилка <span>😕</span>
      </h2>
      <p>
        Нажаль, не вдалось отримати дані. Спробуйте повторити спробу пізніше.
      </p>
    </div>
  );
}

export default Error;
