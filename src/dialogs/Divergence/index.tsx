// Core
import React, { FC, ReactElement, SyntheticEvent, useState } from 'react';
import { DialogProps } from '@material-ui/core/Dialog';

// Styles
import styles from './styles.module.scss';

// Components
import { Dialog } from '../../components/ui/Dialog';
import { Button } from '../../components/ui/Button';
import { useDivergence, useUser } from '../../hooks';
import { Backdrop } from '../../components/ui/Backdrop';
import { getPaymentVariants } from '../../utils/getPaymentVariants';
import { VariantChecker } from '../../components/VariantChecker';
import { isNullOrUndefined } from '../../utils';
import { PaymentTypeNumbers } from '../../utils/types';
import { OrderPosition } from '../../store/types/order';
import defaultImg from '../../assets/images/product-card/default.svg';
import { getImgURL } from '../../utils/getImgURL';
import { getPrice } from '../../utils/getPrice';

type ModalProps = {} & DialogProps;

export const DivergenceDialog: FC<ModalProps> = ({
  ...props
}: ModalProps): ReactElement => {
  const { user } = useUser();
  const {
    loading,
    divergence,
    postDivergence,
    resetDivergence,
  } = useDivergence();
  const paymentVariants = getPaymentVariants(user?.balance || 0);

  const [paymentMethod, setPaymentMethod] = useState(paymentVariants[0].value);

  const { onClose } = props;
  const { id, orderSum, orderPositions } = divergence || {};

  const handleSubmit = async (): Promise<void> => {
    if (!isNullOrUndefined(id)) {
      try {
        await postDivergence({
          orderId: id as number,
          paymentType: paymentMethod,
        });
        if (onClose) {
          onClose({}, 'backdropClick');
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handlePaymentMethodChange = (method: PaymentTypeNumbers) => (): void =>
    setPaymentMethod(method);

  return (
    <>
      <Dialog
        {...props}
        maxWidth="sm"
        fullWidth
        id="delete-dialog"
        onExit={(): void => resetDivergence()}
      >
        <div>
          <div className={styles.Title}>
            <h4>Оплатить расхождение по таре</h4>
          </div>

          <div className={styles.GoodsWrapper}>
            {orderPositions && orderPositions.length ? (
              <ul className={styles.GoodsList}>
                {orderPositions.map((position) => (
                  <Tara position={position} key={position.id} />
                ))}
              </ul>
            ) : null}
          </div>

          <div className={styles.TotalWrapper}>
            <p>Итого к оплате:</p>&nbsp;
            <p>{getPrice(orderSum || 0)}</p>&nbsp;&#8381;
          </div>

          <div className={styles.PaymentTypeWrapper}>
            <VariantChecker
              variants={paymentVariants}
              checked={paymentMethod}
              onChange={handlePaymentMethodChange}
            />
          </div>

          <div className={styles.ButtonsWrapper}>
            <div className={styles.ButtonWrapper}>
              <Button
                bgColor="e1"
                textColor="darkRed"
                fullWidth
                onClick={(): void => {
                  if (onClose) {
                    onClose({}, 'backdropClick');
                  }
                }}
              >
                отмена
              </Button>
            </div>

            <div className={styles.ButtonWrapper}>
              <Button bgColor="darkRed" fullWidth onClick={handleSubmit}>
                К оплате
              </Button>
            </div>
          </div>
        </div>

        <Backdrop open={loading} />
      </Dialog>
    </>
  );
};

type TaraProps = {
  position: OrderPosition;
};
const Tara: FC<TaraProps> = ({ position }: TaraProps): ReactElement => {
  const { product, productPrice, productAmount, totalSum, productName } =
    position || {};
  const { imageProducts, name } = product || {};

  return (
    <li className={styles.TaraWrapper}>
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

      <div className={styles.NameWrapper}>
        <p className={styles.Name} title={productName || name}>
          {productName || name}
        </p>
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
    </li>
  );
};
