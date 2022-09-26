import { useDispatch } from 'react-redux';
import { clear } from 'redux/searchSlice';
import '../scss/components/_categories.scss';

const Categories = ({ value, setValue, categories }) => {
  const dispatch = useDispatch();

  const onClickCategory = e => {
    const index = Number(e.target.dataset.index);
    setValue(index);
    dispatch(clear());
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
