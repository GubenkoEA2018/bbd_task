import React, { FC, ReactElement } from 'react';
import styles from '../CenterMenu.module.scss';
import { ReactComponent as UserIcon } from '../../../../assets/icons/center-menu/user.svg';
import { usePopover, useUser } from '../../../../hooks';
import { PersonPopover } from './PersonPopover';

export const Person: FC = (): ReactElement => {
  const { Popover, handleOpen, handleClose } = usePopover();

  const { user } = useUser();

  let userLabel = 'Profile';

  if (user?.firstName) {
    userLabel = user.firstName;
  } else if (user?.email) {
    userLabel = user.email;
  }

  return (
    <>
      <div className={styles.RightControlWrapper} onClick={handleOpen}>
        <div className={styles.RightControl}>
          <UserIcon />
          <p>{userLabel}</p>
        </div>
      </div>
      <Popover>
        <PersonPopover onClose={handleClose} />
      </Popover>
    </>
  );
};
