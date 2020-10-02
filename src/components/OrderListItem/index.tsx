// Core
import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { format, fromUnixTime } from 'date-fns';
// Styles
import styles from './styles.module.scss';
// Icons
import { ReactComponent as RepeatIcon } from '../../assets/icons/order-list-page/repeat.svg';
// Components
import { Tooltip } from '../ui/Tooltip';
import { OrderSchema, PaymentTypeDescription } from '../../store/types/order';
import { getPrice } from '../../utils/getPrice';

type OrderListItemProps = {
  order: OrderSchema;
  onRetry(orderId: string): Promise<void>;
};

export const OrderListItem: FC<OrderListItemProps> = ({
  order,
  onRetry,
}: OrderListItemProps): ReactElement => {
  const {
    id,
    created_at: createdAt,
    statusName,
    fullDeliveryAddress,
    orderSum,
    paymentType,
    doorphone,
  } = order || {};

  return (
    <li className={styles.OrderListItem}>
      <div className={styles.OrderListItemTop}>
        <Tooltip title="Перейти к заказу">
          <Link to={`/order/${id}`}>
            <div className={styles.OrderInfo}>
              <p className={styles.OrderId}>id&nbsp;#{id}</p>
              <p className={styles.OrderDate}>
                Заказ от:&nbsp;
                {format(fromUnixTime(createdAt), 'dd.MM.yyyy, HH:mm')}
              </p>
            </div>
          </Link>
        </Tooltip>
        <div className={styles.ClientInfo}>
          <p className={styles.OrderAddressTitle}>Адрес:</p>
          <p className={styles.OrderAddressName}>{fullDeliveryAddress}</p>
          <p className={styles.OrderDoorPhone}>
            Код домофона:&nbsp;{doorphone}
          </p>
        </div>
        <div className={styles.PaymentInfo}>
          <p className={styles.PaymentTotal}>
            {getPrice(orderSum)}&nbsp;<span>&#8381;</span>
          </p>
          <p className={styles.PaymentMethod}>
            {PaymentTypeDescription[paymentType]}
          </p>
        </div>
      </div>

      <div className={styles.OrderListItemBottom}>
        <p className={styles.OrderStatus}>{statusName}</p>
        <div
          className={styles.OrderRepeat}
          onClick={(): void => {
            if (onRetry) {
              onRetry(id.toString());
            }
          }}
        >
          <RepeatIcon />
          <p>Повторить</p>
        </div>
      </div>
    </li>
  );
};
