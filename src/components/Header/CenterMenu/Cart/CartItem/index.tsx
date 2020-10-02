// Core
import React, { FC, ReactElement, SyntheticEvent } from 'react';
import { Tooltip } from '../../../../ui/Tooltip';
// Styles
import styles from './styles.module.scss';
// Images
import { ReactComponent as DeleteIcon } from '../../../../../assets/images/cart-popover/delete.svg';
import { BasketPosition } from '../../../../../store/types/basket';
import { getPrice } from '../../../../../utils/getPrice';
import { getImgURL } from '../../../../../utils/getImgURL';
import defaultImg from '../../../../../assets/images/product-card/default.svg';

type CartItemProps = {
  position: BasketPosition;
  onDelete(id: number): void;
};

export const CartItem: FC<CartItemProps> = ({
  position,
  onDelete,
}: CartItemProps): ReactElement => {
  const { product, id: positionId, amount, price, isTara } = position || {};
  const { imageProducts, name } = product || {};
  const { price: sellPrice, bannerPrice: sellBannerPrice } = price || {};

  return (
    <>
      <div className={styles.ProductWrapper}>
        <div className={styles.ImageWrapper}>
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
        </div>
        <p className={styles.Name}>{name}</p>
        <p className={styles.Count}>{amount}</p>
        <p className={styles.Price}>
          {sellBannerPrice
            ? getPrice(sellBannerPrice * amount)
            : getPrice(sellPrice * amount)}
          &nbsp;&#8381;
        </p>
        {!isTara ? (
          <Tooltip title="Удалить из корзины">
            <DeleteIcon
              className={styles.DeleteIcon}
              onClick={(): void => {
                onDelete(positionId);
              }}
            />
          </Tooltip>
        ) : null}
      </div>
      <div className={styles.Separator} />
    </>
  );
};
