import React, { useRef, FC, ReactElement, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Slider, { Settings } from 'react-slick';
import styles from './styles.module.scss';
import './styles.scss';
import { ProductCard } from '../ProductCard';
import { ReactComponent as Prev } from '../../assets/icons/product-carousel/prev.svg';
import { ReactComponent as Next } from '../../assets/icons/product-carousel/next.svg';
import { PublishedProduct } from '../../store/types/catalog';

type ProductCarouselProps = {
  title: string;
  products: PublishedProduct[];
};

export const ProductCarousel: FC<ProductCarouselProps> = ({
  title,
  products,
}: ProductCarouselProps): ReactElement | null => {
  const SHOWN_SLIDES = 5;
  const slider = useRef<Slider>(null);

  const fillSlides = useCallback(
    (slides: JSX.Element[]): JSX.Element[] => {
      if (slides.length > SHOWN_SLIDES) {
        return slides;
      }
      return Array(SHOWN_SLIDES + 1 - slides.length)
        .fill(undefined)
        .flatMap(() => slides);
    },
    [SHOWN_SLIDES],
  );

  if (!products.length) {
    return null;
  }

  const settings: Settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: SHOWN_SLIDES,
    slidesToScroll: SHOWN_SLIDES,
    lazyLoad: 'progressive',
  };

  const slidePrev = (): void => {
    if (slider && slider.current && slider.current.slickPrev()) {
      slider.current.slickPrev();
    }
  };

  const slideNext = (): void => {
    if (slider && slider.current && slider.current.slickNext) {
      slider.current.slickNext();
    }
  };

  const slides = products.map((product) => {
    const { id } = product;
    return (
      <div key={id}>
        <Link to={`/catalog/${id}`}>
          <ProductCard product={product} />
        </Link>
      </div>
    );
  });

  return (
    <div className={styles.Wrapper}>
      <div className={styles.Header}>
        <p className={styles.Title}>{title}</p>
        <div className={styles.Controls}>
          <div className={styles.Left} onClick={slidePrev}>
            <Prev />
          </div>
          <div className={styles.Right} onClick={slideNext}>
            <Next />
          </div>
        </div>
      </div>
      <div className="slick-vertical-visible">
        <Slider ref={slider} {...settings}>
          {fillSlides(slides)}
        </Slider>
      </div>
    </div>
  );
};
