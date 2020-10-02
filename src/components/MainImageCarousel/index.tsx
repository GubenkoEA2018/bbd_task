// Color
import React, { FC, ReactElement, useRef, MouseEvent } from 'react';
import Slider, { Settings } from 'react-slick';
import { Link } from 'react-router-dom';

// Styles
import styles from './styles.module.scss';
import './styles.scss';

// Instruments
import { useBanners } from '../../hooks';
import { baseURL } from '../../services/api/config';
// import { NextArrow, PrevArrow } from './Arrows';

export const MainImageCarousel: FC = (): ReactElement | null => {
  const { banners } = useBanners();

  const state = useRef({ x: 0 });
  const handleMouseDown = (e: MouseEvent<HTMLAnchorElement>): void => {
    state.current.x = e.screenX;
  };
  const handleClick = (e: MouseEvent<HTMLAnchorElement>): void => {
    const delta = Math.abs(e.screenX - state.current.x);

    if (delta > 10) {
      e.preventDefault();
    }
  };

  if (!banners.length) {
    return null;
  }

  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    cssEase: 'linear',
    appendDots: (dots) => <ul>{dots}</ul>,
    dotsClass: 'MainCarouselDots',
    customPaging: () => <div className="MainCarouselDot" />,
    // nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />,
  };

  return (
    <div className={styles.Wrapper}>
      <Slider {...settings}>
        {banners.map((banner) => {
          const { id, imagePath, isAbsoluteImagePath } = banner;

          const imageUrl = isAbsoluteImagePath
            ? imagePath
            : `${baseURL}${imagePath}`;

          return (
            <div key={id}>
              <Link
                to={`/banner/${id}`}
                onMouseDown={handleMouseDown}
                onClick={handleClick}
              >
                <div className={styles.ImageWrapper}>
                  <img className={styles.Image} src={imageUrl} alt="banner" />
                </div>
              </Link>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};
