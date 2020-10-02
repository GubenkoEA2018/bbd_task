// Core
import React, { FC, ReactElement, useEffect } from 'react';
import Sticky from 'react-sticky-el';
import { useHistory } from 'react-router-dom';
// Styles
import styles from './styles.module.scss';
import stylesInfo from '../../components/OrderInfo/styles.module.scss';
// Components
import { OrderGoodsItem } from '../../components/OrderGoodsItem';
import { PageTitle } from '../../components/PageTitle';
// Hooks
import { useSetPageTitle, useBasket, useOrder } from '../../hooks';
// Utils
import { PageTitleEnum } from '../../utils/types';
import { Button } from '../../components/ui/Button';
import { getPrice } from '../../utils/getPrice';

const CartPage: FC = (): ReactElement => {
  useSetPageTitle(PageTitleEnum.CartPage);

  const history = useHistory();
  const { makeOrder } = useOrder();
  const { getBasket, basket } = useBasket();
  useEffect(() => {
    getBasket();
  }, []);

  const { totalCost, totalItems, basketPositions } = basket || {};

  const notAllowedPositions =
    basketPositions && basketPositions.length
      ? basketPositions.filter((position) => {
          const {
            amount,
            product: { remainsOnStock },
          } = position;
          return amount > remainsOnStock;
        })
      : [];

  const allowedPositions =
    basketPositions && basketPositions.length
      ? basketPositions.filter((position) => {
          const {
            amount,
            product: { remainsOnStock },
          } = position;
          return amount <= remainsOnStock;
        })
      : [];

  const goToOrderRegistration = async (): Promise<void> => {
    try {
      await makeOrder();
      history.push('/order-registration');
    } catch (e) {
      console.log(e);
    }
  };

  const oldTotalCost =
    basketPositions && basketPositions.length
      ? basketPositions.reduce((acc, position) => {
          const {
            price: { price },
            amount,
          } = position;

          return acc + price * amount;
        }, 0)
      : totalCost;

  const discount =
    oldTotalCost !== undefined && totalCost !== undefined
      ? oldTotalCost - totalCost
      : 0;

  return (
    <div className={styles.Wrapper}>
      <div className={`container ${styles.CartPage}`}>
        <PageTitle current="Корзина" title="СОДЕРЖИМОЕ КОРЗИНЫ" />

        <div className={styles.Content} id="boundary-cart">
          {basketPositions && basketPositions.length ? (
            <div className={styles.ListWrapper}>
              <div className={styles.List}>
                {notAllowedPositions && notAllowedPositions.length
                  ? notAllowedPositions.map((position) => {
                      const { id } = position;
                      return (
                        <OrderGoodsItem disabled key={id} position={position} />
                      );
                    })
                  : null}
              </div>

              <div className={styles.List}>
                {allowedPositions && allowedPositions.length
                  ? allowedPositions.map((position) => {
                      const { id } = position;
                      return <OrderGoodsItem key={id} position={position} />;
                    })
                  : null}
              </div>
            </div>
          ) : (
            <p>Корзина пуста</p>
          )}
          {basketPositions && basketPositions.length ? (
            <Sticky boundaryElement="#boundary-cart" hideOnBoundaryHit={false}>
              <div className={styles.OrderInfoWrapper}>
                <div className={stylesInfo.Info}>
                  <div className={stylesInfo.MainWrapper}>
                    <div className={stylesInfo.InfoRow}>
                      <p className={stylesInfo.InfoCell}>
                        Товары, {totalItems}&nbsp;шт.
                      </p>
                      <p className={stylesInfo.InfoCellRight}>
                        {getPrice(totalCost || 0)}&nbsp;&#8381;
                      </p>
                    </div>
                    {discount ? (
                      <div className={stylesInfo.InfoRow}>
                        <p className={stylesInfo.InfoCell}>Скидка:</p>
                        <p className={stylesInfo.InfoCellRight}>
                          -&nbsp;{getPrice(discount)}&nbsp;&#8381;
                        </p>
                      </div>
                    ) : null}
                    <div className={stylesInfo.InfoRow}>
                      <p className={stylesInfo.InfoCell}>
                        <span className={stylesInfo.InfoLabelPrice}>
                          Итого:
                        </span>
                      </p>
                      <p className={stylesInfo.InfoCellRight}>
                        <span className={stylesInfo.InfoPrice}>
                          {getPrice(totalCost || 0)}
                        </span>
                        &nbsp;&#8381;
                      </p>
                    </div>
                    <div className={stylesInfo.ButtonWrapper}>
                      {!notAllowedPositions.length ? (
                        <Button
                          fullWidth
                          bgColor="darkBlue"
                          onClick={goToOrderRegistration}
                        >
                          перейти к оформлению
                        </Button>
                      ) : (
                        <Button fullWidth bgColor="darkBlue" disabled>
                          перейти к оформлению
                        </Button>
                      )}
                    </div>

                    {notAllowedPositions.length ? (
                      <div className={styles.NotAllowedMessage}>
                        <p>
                          Количество добавленных в корзину товаров превышает
                          фактическое наличие на складе. Чтобы продолжить,
                          удалите товары из корзины или уменьшите их количество
                          до доступного.
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </Sticky>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
