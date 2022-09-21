import PizzaBlock from './PizzaBlock';

export default function ProductListing() {
  return (
    <div className="content__items">
      <PizzaBlock
        title="Чізбургер-піца"
        price={395}
        imageUrl="https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg"
      />
      <PizzaBlock
        title="Мексиканська"
        price={285}
        imageUrl="https://images.pizza33.ua/products/menu/zXPTrRvb1XINm6kK5IQl7B2zp137dtT3.jpg"
      />
    </div>
  );
}
