// Core
import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';
// Styles
import styles from './styles.module.scss';
// Components
import { Button } from '../../../../ui/Button';
import { CartItem } from '../CartItem';

// Hooks
import { useBasket } from '../../../../../hooks';

type CartPopoverProps = {
  onClose(): void;
};

export const CartPopover: FC<CartPopoverProps> = ({
  onClose,
}: CartPopoverProps): ReactElement => {
  const { basket, openDeleteModal } = useBasket();

  const { basketPositions } = basket || {};

  return (
    <div className={styles.Wrapper}>
      <div className={styles.Top}>
        <div className={styles.Table}>
          {basketPositions && basketPositions.length ? (
            basketPositions.map((position) => {
              const { id } = position;
              return (
                <CartItem
                  key={id}
                  position={position}
                  onDelete={openDeleteModal}
                />
              );
            })
          ) : (
            <p className={styles.CartEmpty}>Корзина пуста</p>
          )}
        </div>
      </div>
      <div className={styles.Bottom}>
        <Link to="/cart">
          <Button fullWidth bgColor="darkBlue" onClick={onClose}>
            Перейти в корзину
          </Button>
        </Link>
      </div>
    </div>
  );
};
