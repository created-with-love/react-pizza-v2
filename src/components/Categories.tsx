import { useDispatch } from 'react-redux';
import { clear } from 'redux/slices/searchSlice';
import '../scss/components/_categories.scss';

interface ICategoriesProps {
  value: number;
  setValue: (value: number) => void;
  categories: string[]
}

const Categories: React.FC<ICategoriesProps> = ({ value, setValue, categories }) => {
  const dispatch = useDispatch();

  const onClickCategory = (index: number) => {
    dispatch(clear());
    setValue(index);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((name, index) => (
          <li
            onClick={() => onClickCategory(index)}
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
