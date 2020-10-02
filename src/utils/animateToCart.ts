// Core
import { RefObject } from 'react';
import { gsap } from 'gsap';

// Instruments
import defaultImg from '../assets/images/product-card/default.svg';

export const animateToCart = (
  ref: RefObject<HTMLDivElement>,
  imgSrc: string,
  cb?: () => void,
): void => {
  const cartEl = document.getElementById('cart-icon');

  if (ref && ref.current && cartEl) {
    const {
      x: imageX,
      y: imageY,
      width: imageWidth,
      height: imageHeight,
    } = ref.current.getBoundingClientRect();
    const { x: cartX, y: cartY } = cartEl.getBoundingClientRect();
    const flyWrapper = document.createElement('div');
    const imagePreview = document.createElement('img');

    flyWrapper.style.cssText = `width: 150px; height: 175px; position: fixed; left: ${
      imageX + imageWidth / 2 - 75
    }px; top: ${
      imageY + imageHeight / 2 - 175
    }px; opacity: 0.7; z-index: 99999; transform: rotate(45deg);`;

    imagePreview.style.cssText = `width: 100%; height: 100%; object-fit: contain;`;

    imagePreview.src = imgSrc;

    const removeEl = (): void => {
      if (flyWrapper.parentElement) {
        flyWrapper.parentElement.removeChild(flyWrapper);
      }
    };

    const animate = (): void => {
      flyWrapper.append(imagePreview);
      document.body.append(flyWrapper);

      gsap.to(flyWrapper, {
        duration: 0.6,
        left: cartX,
        top: cartY,
        ease: 'Power0.easeInOut',
        width: 50,
        height: 75,
        transform: 'rotate(0)',
        onComplete: () => {
          removeEl();
          if (cb) {
            cb();
          }
        },
      });
    };

    imagePreview.onerror = (e: any): void => {
      e.currentTarget.src = defaultImg;
    };

    imagePreview.onload = (): void => {
      animate();
    };
  }
};
