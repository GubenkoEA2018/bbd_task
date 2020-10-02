// Core
import React, { FC, ReactElement, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';

// Styles
import styles from './styles.module.scss';
import defaultImg from '../../assets/images/product-card/default.svg';
import { getImgURL } from '../../utils/getImgURL';
import { OrderPosition } from '../../store/types/order';
import { getPrice } from '../../utils/getPrice';

type OrderProductProps = {
  position: OrderPosition;
};

export const OrderProduct: FC<OrderProductProps> = ({
  position,
}: OrderProductProps): ReactElement => {
  const { product, productPrice, productAmount, totalSum, productName } =
    position || {};
  const { imageProducts, id: productId, name } = product || {};

  return (
    <div className={styles.Wrapper}>
      <div className={styles.ImageWrapper}>
        <Link to={`/catalog/${productId}`}>
          <img
            className={styles.Image}
            onError={(e: SyntheticEvent<HTMLImageElement, Event>): void => {
              e.currentTarget.src = defaultImg;
            }}
            src={
              imageProducts && imageProducts[0]
                ? getImgURL(imageProducts[0])
                : defaultImg
            }
            alt="product"
          />
        </Link>
      </div>

      <div className={styles.ContentWrapper}>
        <div className={styles.ActionWrapper}>
          <Link to={`/catalog/${productId}`}>
            <p className={styles.Name} title={productName || name}>
              {productName || name}
            </p>
          </Link>
        </div>

        <div className={styles.Info}>
          <div className={styles.Price}>
            <p className={styles.Value}>{getPrice(totalSum)}</p>
            <span className={styles.Sign}>&#8381;</span>
          </div>
          <p className={styles.Description}>
            {productAmount}&nbsp;x&nbsp;
            {getPrice(productPrice)}
            &nbsp;&#8381;
          </p>
        </div>
      </div>
    </div>
  );
};
