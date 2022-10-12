import '../scss/components/_categories.scss';

interface ICategoriesProps {
  value: number;
  setValue: (value: number) => void;
  categories: string[]
}

const Categories: React.FC<ICategoriesProps> = ({ value, setValue, categories }) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((name, index) => (
          <li
            onClick={() => setValue(index)}
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
