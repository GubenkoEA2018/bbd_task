import React, { FC, ReactElement } from 'react';
import styles from '../CenterMenu.module.scss';
import { ReactComponent as FavouriteIcon } from '../../../../assets/icons/center-menu/favourite.svg';
import { usePopover } from '../../../../hooks';
import { FavouritePopover } from './FavouritePopover';

export const Favourite: FC = (): ReactElement => {
  const { Popover, handleOpen, handleClose } = usePopover();

  return (
    <>
      <div className={styles.RightControlWrapper} onClick={handleOpen}>
        <div className={styles.RightControl}>
          <FavouriteIcon />
          <p>Избранное</p>
        </div>
      </div>
      <Popover>
        <FavouritePopover onClose={handleClose} />
      </Popover>
    </>
  );
};
