// Core
import React, {
  FC,
  ReactElement,
  SyntheticEvent,
  MouseEvent,
  FocusEvent,
  useRef,
} from 'react';
import cn from 'classnames';
import LazyLoad from 'react-lazyload';

// Styles
import styles from './styles.module.scss';

// Images
import defaultImg from '../../assets/images/product-card/default.svg';
import { ReactComponent as EmptyHeart } from '../../assets/icons/product-card/heart_empty.svg';
import { ReactComponent as FilledHeart } from '../../assets/icons/product-card/hearts_fill.svg';
// import { ReactComponent as CrownIcon } from '../../assets/icons/chip/crown.svg';

// Components
import { Button } from '../ui/Button';
import {
  handleNumberControlChange,
  handleAddProductInBasket,
  NumControl,
} from '../NumControl';
import { Tooltip } from '../ui/Tooltip';
import { Chip } from '../ui/Chip';

// Types
import { PriceType, PublishedProduct } from '../../store/types/catalog';

// Utils
import { getPrice } from '../../utils/getPrice';
import { getImgURL } from '../../utils/getImgURL';

// Hooks
import { useFavorite, useBasket } from '../../hooks';
import { animateToCart, getDiscount, isNullOrUndefined } from '../../utils';

type ProductCardProps = {
  small?: boolean;
  product: PublishedProduct;
};

export const ProductCard: FC<ProductCardProps> = ({
  small = false,
  product,
}): ReactElement | null => {
  const imageRef = useRef<HTMLDivElement>(null);

  const {
    basket,
    addOne,
    removeOne,
    openDeleteModal,
    addToBasket,
  } = useBasket();
  const { handleFavouriteChange, filled } = useFavorite(product);

  if (!product) {
    return null;
  }

  const { imageProducts, prices, name, quantityInOnePackage, remainsOnStock } =
    product || {};

  // Basket
  const position = basket?.basketPositions.find(
    (pos) => pos.productId === product.id,
  );
  const { amount, id: positionId, price: positionPrice } = position || {};
  const { id: positionPriceId } = positionPrice || {};

  const wrapperClassName = cn({
    [styles.Wrapper]: true,
    [styles.WrapperSmall]: small,
  });

  // SELL PRICE
  const sellPriceObj = prices?.find((p) => p.typePrice === PriceType.sell);
  const { price: sellPrice, bannerPrice: sellBannerPrice, id: sellPriceId } =
    sellPriceObj || {};
  const discount =
    !isNullOrUndefined(sellPrice) && !isNullOrUndefined(sellBannerPrice)
      ? getDiscount(sellBannerPrice as number, sellPrice as number)
      : 0;

  // RENT PRICE
  // const rentPriceObj = prices?.find((p) => p.typePrice === PriceType.rent);
  // const { price: rentPrice, bannerPrice: rentBannerPrice } = rentPriceObj || {};

  return (
    <>
      <div className={wrapperClassName}>
        <div className={styles.Content} ref={imageRef}>
          <LazyLoad height={240}>
            <div className={styles.Images}>
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

              <div className={styles.ChipTop}>
                {quantityInOnePackage && (
                  <Chip
                    chipColor="darkBlue"
                    label={`Упак.: ${quantityInOnePackage} шт.`}
                    small={small}
                  />
                )}
              </div>
              <div className={styles.ChipBottom}>
                {discount ? (
                  <Chip
                    label={`-${discount}%`}
                    chipColor="darkRed"
                    small={small}
                  />
                ) : null}
                {/* <Chip label={<CrownIcon />} chipColor="red" small={small} /> */}
                {/* <Chip label="new" chipColor="blue" textUpper small={small} /> */}
              </div>
            </div>
          </LazyLoad>
          {sellBannerPrice ? (
            <div className={styles.OldPrice}>{getPrice(sellPrice || 0)}</div>
          ) : null}
          <div className={styles.Info}>
            {sellBannerPrice ? (
              <p className={`${styles.Price} ${styles.PriceRed}`}>
                {getPrice(sellBannerPrice)}
              </p>
            ) : (
              <p className={`${styles.Price}`}>{getPrice(sellPrice || 0)}</p>
            )}

            <p className={styles.PriceText}>&#8381;</p>

            {!filled ? (
              <Tooltip title="Добавить в избранное">
                <EmptyHeart
                  className={styles.Heart}
                  onClick={handleFavouriteChange}
                />
              </Tooltip>
            ) : (
              <Tooltip title="Удалить из избранного">
                <FilledHeart
                  className={styles.Heart}
                  onClick={handleFavouriteChange}
                />
              </Tooltip>
            )}
          </div>
          <div className={styles.RemainsOnStock}>
            {remainsOnStock ? (
              <p>В наличии: {remainsOnStock}&nbsp;шт.</p>
            ) : (
              <p className={styles.RemainsOnStockEmpty}>Нет в наличии</p>
            )}
          </div>
          <div className={styles.DescriptionWrapper}>
            <p className={styles.Description} title={name}>
              {name}
            </p>
          </div>

          <div className={styles.Expand}>
            {!amount ? (
              <div className={styles.ExpandItem}>
                {remainsOnStock ? (
                  <Button
                    fullWidth
                    bgColor="darkBlue"
                    btnSize="medium"
                    onClick={(e: MouseEvent): void => {
                      e.preventDefault();
                      e.stopPropagation();

                      animateToCart(
                        imageRef,
                        imageProducts && imageProducts[0]
                          ? getImgURL(imageProducts[0])
                          : defaultImg,
                        () => {
                          handleAddProductInBasket({
                            priceId: sellPriceId,
                            amount: 0,
                            remainsOnStock,
                            product,
                            addOne,
                          });
                        },
                      );
                    }}
                  >
                    Купить
                  </Button>
                ) : null}
              </div>
            ) : (
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
                theme="dark"
              />
            )}
            {/* {sellBannerPrice && ( */}
            {/*  <div className={styles.ExpandItem}> */}
            {/*    <Button fullWidth bgColor="red" size="md"> */}
            {/*      Аренда */}
            {/*    </Button> */}
            {/*  </div> */}
            {/* )} */}
          </div>
        </div>
      </div>
    </>
  );
};
