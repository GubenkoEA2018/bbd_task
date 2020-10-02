// Core
import React, { FC, ReactElement } from 'react';
// Styles
import styles from './styles.module.scss';
import { OrderPosition as OrderPositionType } from '../../store/types/order';
import { getPrice } from '../../utils/getPrice';

type OrderPositionProps = {
  position: OrderPositionType;
};

export const OrderPosition: FC<OrderPositionProps> = ({
  position,
}: OrderPositionProps): ReactElement => {
  const { productName, productAmount, productPrice } = position;

  return (
    <div className={styles.Position}>
      <p className={styles.PositionName}>{productName}</p>
      <p className={styles.PositionInfo}>
        {productAmount}&nbsp;x&nbsp;{getPrice(productPrice)}&nbsp;&#8381;
      </p>
    </div>
  );
};
