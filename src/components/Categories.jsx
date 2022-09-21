import { useState } from 'react';
import '../scss/components/_categories.scss';

const Categories = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const categories = [
    'Всі',
    "М'ясна",
    'Вегетаріанська',
    'Гриль',
    'Гостра',
    'Закрита',
  ];

  const onClickCategory = e => {
    setActiveIndex(Number(e.target.dataset.index));
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((name, index) => (
          <li
            onClick={onClickCategory}
            className={activeIndex === index ? 'active' : ''}
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
