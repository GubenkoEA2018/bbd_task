// Core
import React, { FC, ReactElement, ReactNode } from 'react';
// Styles
import styles from './styles.module.scss';
// Components
import { Button } from '../ui/Button';
import { Checkbox } from '../ui/Ckeckbox';

type OrderInfoProps = {
  buttonProps?: {
    text: string;
    onClick(): void;
  };
  checkboxProps?: {
    label: string;
    onChange(): void;
  };
  children?: ReactNode;
};

export const OrderInfo: FC<OrderInfoProps> = ({
  buttonProps,
  checkboxProps,
  children,
}: OrderInfoProps): ReactElement => {
  const { onClick, text } = buttonProps || {};
  const { onChange, label } = checkboxProps || {};

  return (
    <div className={styles.Info}>
      {children ? <div className={styles.Children}>{children}</div> : null}

      <div className={styles.MainWrapper}>
        <div className={styles.InfoRow}>
          <p className={styles.InfoCell}>Товары, 3шт</p>
          <p className={styles.InfoCellRight}>500.00&nbsp;&#8381;</p>
        </div>
        <div className={styles.InfoRow}>
          <p className={styles.InfoCell}>Скидка:</p>
          <p className={styles.InfoCellRight}>-100.00&nbsp;&#8381;</p>
        </div>
        <div className={styles.InfoRow}>
          <p className={styles.InfoCell}>
            <span className={styles.InfoLabelPrice}>Итого:</span>
          </p>
          <p className={styles.InfoCellRight}>
            <span className={styles.InfoPrice}>400.00</span>&nbsp;&#8381;
          </p>
        </div>
        {buttonProps ? (
          <div className={styles.ButtonWrapper}>
            <Button fullWidth bgColor="darkBlue" onClick={onClick}>
              {text}
            </Button>
          </div>
        ) : null}

        {checkboxProps ? (
          <div className={styles.CheckboxWrapper}>
            <Checkbox
              checkboxProps={{
                onChange,
              }}
            />
            <div className={styles.CheckboxLabel}>{label}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
