import '../scss/components/_categories.scss';

const Categories = ({ value, setValue, categories }) => {
  const onClickCategory = e => {
    const index = Number(e.target.dataset.index);
    setValue(index);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((name, index) => (
          <li
            onClick={onClickCategory}
            className={value === index ? 'active' : ''}
            data-index={index}
            key={name}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
