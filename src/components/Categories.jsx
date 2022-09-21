import '../scss/components/_categories.scss';

const Categories = () => {
  return (
    <div className="categories">
      <ul>
        <li className="active">Всі</li>
        <li>М'ясна</li>
        <li>Вегетаріанська</li>
        <li>Гриль</li>
        <li>Гостра</li>
        <li>Закрита</li>
      </ul>
    </div>
  );
};

export default Categories;
