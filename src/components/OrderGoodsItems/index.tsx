// Core
import React, { FC, FocusEvent, ReactElement, SyntheticEvent } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

// Styles
import styles from './styles.module.scss';

// Images
import defaultImg from '../../assets/images/product-card/default.svg';
import { ReactComponent as EmptyHeart } from '../../assets/icons/product-card/heart_empty.svg';
import { ReactComponent as FilledHeart } from '../../assets/icons/product-card/hearts_fill.svg';
import { ReactComponent as DeleteIcon } from '../../assets/icons/product-card/delete.svg';

// Components
import {
  handleNumberControlChange,
  handleAddProductInBasket,
  NumControl,
} from '../NumControl';
import { Tooltip } from '../ui/Tooltip';
import { BasketPosition } from '../../store/types/basket';
import { getImgURL } from '../../utils/getImgURL';

// Hooks
import { useFavorite, useBasket } from '../../hooks';
import { getPrice } from '../../utils/getPrice';

type OrderGoodsItemProps = {
  infoMode?: boolean;
  position: BasketPosition;
  disabled?: boolean;
};

export const OrderGoodsItem: FC<OrderGoodsItemProps> = ({
  infoMode,
  position,
  disabled,
}: OrderGoodsItemProps): ReactElement => {
  const { id: positionId, price, amount, product, isTara } = position || {};
  const { imageProducts, name, remainsOnStock, id: productId } = product || {};
  const {
    price: sellPrice,
    bannerPrice: sellBannerPrice,
    id: positionPriceId,
  } = price || {};

  // Favorite
  const { handleFavouriteChange, filled } = useFavorite(product);

  // Basket
  const { addOne, removeOne, openDeleteModal, addToBasket } = useBasket();

  const wrapperClassName = cn({
    [styles.Wrapper]: true,
    [styles.WrapperDisabled]: disabled,
  });

  return (
    <div className={wrapperClassName}>
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
            <p className={styles.Name} title={name}>
              {name}
            </p>
          </Link>
          {!infoMode && !isTara && (
            <div className={styles.Actions}>
              {!filled ? (
                <Tooltip title="Добавить в избранное">
                  <div
                    className={styles.Action}
                    onClick={handleFavouriteChange}
                  >
                    <EmptyHeart className={styles.Icon} />
                    <p className={styles.ActionText}>В избранное</p>
                  </div>
                </Tooltip>
              ) : (
                <Tooltip title="Удалить из избранного">
                  <div
                    className={styles.Action}
                    onClick={handleFavouriteChange}
                  >
                    <FilledHeart className={styles.Icon} />
                    <p className={styles.ActionText}>Из избранного</p>
                  </div>
                </Tooltip>
              )}

              <Tooltip title="Удалить из корзины">
                <div
                  className={styles.Action}
                  onClick={(): void => openDeleteModal(positionId)}
                >
                  <DeleteIcon className={styles.Icon} />
                  <p className={styles.ActionText}>Удалить</p>
                </div>
              </Tooltip>
            </div>
          )}
          {remainsOnStock ? (
            <p className={styles.RemainsOnStock}>
              В наличии: {remainsOnStock}&nbsp;шт.
            </p>
          ) : (
            <p
              className={`${styles.RemainsOnStock} ${styles.RemainsOnStockEmpty}`}
            >
              Нет в наличии
            </p>
          )}
        </div>

        <div className={styles.Info}>
          {sellBannerPrice ? (
            <div className={styles.OldPrice}>
              {getPrice(sellPrice * amount)}
            </div>
          ) : null}
          <div className={styles.Price}>
            {sellBannerPrice ? (
              <p className={`${styles.Value} ${styles.ValueRed}`}>
                {getPrice(sellBannerPrice * amount)}
              </p>
            ) : (
              <p className={styles.Value}>
                {getPrice(sellPrice * amount || 0)}
              </p>
            )}

            <span className={styles.Sign}>&#8381;</span>
          </div>
          <p className={styles.Description}>
            {amount}&nbsp;x&nbsp;
            {sellBannerPrice ? getPrice(sellBannerPrice) : getPrice(sellPrice)}
            &nbsp;&#8381;
          </p>
          {!infoMode && !isTara && (
            <div className={styles.NumberControl}>
              <NumControl
                onBlur={
                  handleNumberControlChange({
                    amount,
                    remainsOnStock,
                    positionId: positionId as number,
                    positionPriceId: positionPriceId as number,
                    openDeleteModal,
                    addToBasket,
                  }) as (e: FocusEvent<HTMLInputElement>) => void
                }
                onPlus={(): void => {
                  handleAddProductInBasket({
                    priceId: positionPriceId,
                    amount,
                    remainsOnStock,
                    product,
                    addOne,
                  });
                }}
                onMinus={(): void => {
                  if (positionPriceId !== undefined) {
                    removeOne(
                      { amount, priceId: positionPriceId },
                      positionId as number,
                    );
                  }
                }}
                amount={amount}
                theme="light"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

OrderGoodsItem.defaultProps = {
  disabled: false,
};
