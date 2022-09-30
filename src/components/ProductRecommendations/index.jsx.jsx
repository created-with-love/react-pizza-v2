import {useState, useEffect} from 'react'
import ItemsCarousel from 'react-items-carousel';
import styles from './ProductRecommendations.module.scss';

function ProductRecommendations({items}) {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const chevronWidth = 40;

  function handleWindowSizeChange() {
      setWidth(window.innerWidth);
  }
  useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);

  const isMobile = width <= 768;

  return (
    <div style={{ padding: `0 ${chevronWidth}px` }}>
      <h2 className={styles.heading}>Вам також може сподобатись: </h2>
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={isMobile ? 1 : 3}
        gutter={20}
        leftChevron={<button className={styles.btn}>{'<'}</button>}
        rightChevron={<button className={styles.btn}>{'>'}</button>}
        outsideChevron
        chevronWidth={chevronWidth}
      >
        {items.map(({ name, imageUrl, id, price }) => (
          <div
            key={id}
            className={
              isMobile
                ? `${styles.recommendationsContainerMobile} ${styles.recommendationsContainer}`
                : styles.recommendationsContainer
            }
          >
            <img
              src={imageUrl}
              alt={name}
              className={
                isMobile
                  ? `${styles.imageMobile} ${styles.image}`
                  : styles.image
              }
            />
            <div className={styles.infoWrapper}>
              <h4>{name}</h4> <span>Від {price} $</span>
            </div>
          </div>
        ))}
      </ItemsCarousel>
    </div>
  );
}

export default ProductRecommendations;