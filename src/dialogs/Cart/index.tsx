// Core
import React, { FC, FocusEvent, ReactElement, SyntheticEvent } from 'react';
import { DialogProps } from '@material-ui/core/Dialog';
import { useHistory } from 'react-router-dom';

// Styles
import styles from './styles.module.scss';

// Images
import defaultImg from '../../assets/images/product-card/default.svg';

// Components
import { Dialog } from '../../components/ui/Dialog';
import { Button } from '../../components/ui/Button';
import { PriceType, PublishedProduct } from '../../store/types/catalog';
// Utils
import { getImgURL } from '../../utils/getImgURL';
import { getPrice } from '../../utils/getPrice';
// Hooks
import { useBasket, useOrder } from '../../hooks';
import { isNullOrUndefined } from '../../utils';
import {
  handleAddProductInBasket,
  handleNumberControlChange,
  NumControl,
} from '../../components/NumControl';

type CartDialogProps = {
  product: PublishedProduct;
} & DialogProps;

export const CartDialog: FC<CartDialogProps> = ({
  product,
  ...props
}): ReactElement | null => {
  const {
    basket,
    addOne,
    removeOne,
    openDeleteModal,
    addToBasket,
  } = useBasket();
  const { makeOrder } = useOrder();
  const { onClose } = props;
  const history = useHistory();

  if (!product) {
    return null;
  }

  const { totalItems, totalCost, basketPositions } = basket || {};
  const position = basketPositions?.find((pos) => pos.productId === product.id);
  const {
    amount,
    product: currentProduct,
    id: positionId,
    price: positionPrice,
  } = position || {};
  const { id: positionPriceId } = positionPrice || {};
  const { remainsOnStock } = currentProduct || {};

  const { name, prices, imageProducts } = product || {};

  // SELL PRICE
  const sellPriceObj = prices?.find((p) => p.typePrice === PriceType.sell);
  const { price: sellPrice, bannerPrice: sellBannerPrice } = sellPriceObj || {};

  // RENT PRICE
  // const rentPriceObj = prices?.find((p) => p.typePrice === PriceType.rent);
  // const { price: rentPrice, bannerPrice: rentBannerPrice } = rentPriceObj || {};

  const goToOrderRegistration = async (): Promise<void> => {
    try {
      await makeOrder();
      history.push('/order-registration');
    } catch (e) {
      console.log(e);
    } finally {
      if (onClose) {
        onClose({}, 'backdropClick');
      }
    }
  };

  return (
    <Dialog {...props} maxWidth="md">
      <div className={styles.Wrapper}>
        <h4 className={styles.Title}>товар добавлен в корзину</h4>
        <div className={styles.Content}>
          <div className={styles.ImageWrapper}>
            <img
              className={styles.Image}
              src={
                imageProducts && imageProducts[0]
                  ? getImgURL(imageProducts[0])
                  : defaultImg
              }
              alt="product"
              onError={(e: SyntheticEvent<HTMLImageElement, Event>): void => {
                e.currentTarget.src = defaultImg;
              }}
            />
          </div>

          <p className={styles.Description}>{name}</p>

          <div className={styles.Amount}>
            <NumControl
              onBlur={
                handleNumberControlChange({
                  amount: amount as number,
                  remainsOnStock: remainsOnStock as number,
                  positionId: positionId as number,
                  positionPriceId: positionPriceId as number,
                  openDeleteModal,
                  addToBasket,
                }) as (e: FocusEvent<HTMLInputElement>) => void
              }
              onPlus={(): void => {
                handleAddProductInBasket({
                  priceId: positionPriceId,
                  amount: amount as number,
                  remainsOnStock: remainsOnStock as number,
                  product,
                  addOne,
                });
              }}
              onMinus={(): void => {
                if (positionPriceId !== undefined) {
                  removeOne(
                    { amount: amount as number, priceId: positionPriceId },
                    positionId as number,
                  );
                }
              }}
              amount={amount as number}
              theme="light"
            />
          </div>

          <div className={styles.Price}>
            {!isNullOrUndefined(sellBannerPrice)
              ? getPrice(sellBannerPrice || 0)
              : getPrice(sellPrice || 0)}
            &nbsp;&#8381;
          </div>
        </div>
        <hr />
        <div className={styles.Total}>
          <p className={styles.TotalInfo}>
            В корзине {totalItems} товар(ов) на сумму
          </p>
          <div className={styles.Price}>
            {getPrice(totalCost || 0)}&nbsp;&#8381;
          </div>
        </div>
        <div className={styles.ButtonsContent}>
          <div className={styles.Buttons}>
            <Button
              fullWidth
              bgColor="e1"
              fontSize="large"
              btnSize="large"
              textColor="darkBlue"
              onClick={(): void => {
                if (onClose) {
                  onClose({}, 'backdropClick');
                }
              }}
            >
              продолжить покупки
            </Button>
          </div>
          <div className={styles.Buttons}>
            <Button
              fullWidth
              bgColor="darkBlue"
              fontSize="large"
              btnSize="large"
              textColor="white"
              onClick={goToOrderRegistration}
            >
              оформить заказ
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
