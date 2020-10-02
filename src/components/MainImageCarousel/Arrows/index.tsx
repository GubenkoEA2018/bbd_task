import React, { FC, ReactElement } from 'react';
import styles from './styles.module.scss';
import { ReactComponent as PrevIcon } from '../../../assets/icons/carousel/prev.svg';
import { ReactComponent as NextIcon } from '../../../assets/icons/carousel/next.svg';

type ArrowProps = {
  onClick?: () => void;
};

export const PrevArrow: FC<ArrowProps> = ({
  onClick,
}: ArrowProps): ReactElement => {
  return (
    <PrevIcon
      className={`${styles.Arrow} ${styles.ArrowPrev}`}
      onClick={onClick}
    />
  );
};

export const NextArrow: FC<ArrowProps> = ({
  onClick,
}: ArrowProps): ReactElement => {
  return (
    <NextIcon
      className={`${styles.Arrow} ${styles.ArrowNext}`}
      onClick={onClick}
    />
  );
};
