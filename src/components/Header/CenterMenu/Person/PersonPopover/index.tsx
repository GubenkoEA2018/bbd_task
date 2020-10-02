// Core
import React, { FC, ReactElement, MouseEvent } from 'react';
import { useHistory, Link } from 'react-router-dom';

// Styles
import styles from './styles.module.scss';

// Components
import { Button } from '../../../../ui/Button';
import { TextField } from '../../../../ui/TextField';

// Hooks
import { useModalManage } from '../../../../../dialogs/hooks';
import { useSecurity, useUser } from '../../../../../hooks';

// Types
import { Modals } from '../../../../../store/types/modal';

type PersonPopoverProps = {
  onClose: () => void;
};

export const PersonPopover: FC<PersonPopoverProps> = ({
  onClose,
}: PersonPopoverProps): ReactElement => {
  const { open } = useModalManage();
  const { apikey, logout } = useSecurity();
  const { user } = useUser();
  const history = useHistory();

  const handleClose = (): void => {
    onClose();
  };

  const handleLoginButtonClick = (): void => {
    open(Modals.Login);
    onClose();
  };

  const handleLogout = (): void => {
    logout();
    onClose();
  };

  const privateUserContent =
    apikey && user ? (
      <>
        <div className={styles.Top}>
          <Link to="/profile">
            <p
              className={`${styles.Orders} ${styles.activeLink}`}
              onClick={handleClose}
            >
              Personal Area
            </p>
          </Link>
          <Link to="/order">
            <p
              className={`${styles.Orders} ${styles.activeLink}`}
              onClick={handleClose}
            >
              Orders
            </p>
          </Link>
          <Link to="/favorite">
            <p
              className={`${styles.Orders} ${styles.activeLink}`}
              onClick={handleClose}
            >
              Favourite products
            </p>
          </Link>
        </div>
        <div className={styles.Bottom}>
          {/* <div className={styles.FromGroup}> */}
          {/*  <label className={styles.Label} htmlFor="orderStatusWatch"> */}
          {/*    отслеживание заказа */}
          {/*  </label> */}
          {/*  <div className={styles.TextFieldWrapper}> */}
          {/*    <TextField id="orderStatusWatch" placeholder="ID Заказа/E-mail" /> */}
          {/*  </div> */}
          {/* </div> */}

          <Button fullWidth bgColor="darkBlue" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </>
    ) : (
      <>
        <div className={styles.Top}>
          <p className={styles.TopNotAuth}>
            Log in or create account
          </p>
        </div>
        <div className={styles.Bottom}>
          <Button fullWidth bgColor="darkBlue" onClick={handleLoginButtonClick}>
            Log in
          </Button>
        </div>
      </>
    );

  return <div className={styles.Wrapper}>{privateUserContent}</div>;
};
