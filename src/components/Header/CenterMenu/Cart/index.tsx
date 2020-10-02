// Core
import React, { FC, ReactElement } from 'react';
import Badge from '@material-ui/core/Badge';
import { makeStyles } from '@material-ui/core/styles';

// Styles
import styles from '../CenterMenu.module.scss';

// Instruments
import { ReactComponent as CartIcon } from '../../../../assets/icons/center-menu/cart.svg';
import { useBasket, usePopover } from '../../../../hooks';
import { CartPopover } from './CartPopover';
import { Color } from '../../../../utils';

const useStyles = makeStyles({
  colorSecondary: {
    backgroundColor: Color.darkRed,
  },
});

export const Cart: FC = (): ReactElement => {
  const classes = useStyles();
  const { basket } = useBasket();
  const { Popover, handleOpen, handleClose } = usePopover({
    id: 'cart-popover',
  });

  const { totalItems } = basket || {};

  return (
    <>
      <div className={styles.RightControlWrapper} onClick={handleOpen}>
        <div className={styles.RightControl} id="cart-icon">
          <Badge
            classes={{ colorSecondary: classes.colorSecondary }}
            badgeContent={totalItems || 0}
            color="secondary"
            max={99}
          >
            <CartIcon />
          </Badge>

          <p>Basket</p>
        </div>
      </div>

      <Popover>
        <CartPopover onClose={handleClose} />
      </Popover>
    </>
  );
};
