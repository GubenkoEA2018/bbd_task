// Core
import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

// Styles
import styles from './styles.module.scss';

// Images
// import { ReactComponent as LocationIcon } from '../../../assets/icons/top-menu/location.svg';
import { ReactComponent as BottleIcon } from '../../../assets/icons/top-menu/bottle.svg';
import { ReactComponent as WalletIcon } from '../../../assets/icons/top-menu/wallet.svg';
import { ReactComponent as PhoneIcon } from '../../../assets/icons/top-menu/phone.svg';

// Hooks
import { useDivergence, useUser } from '../../../hooks';
import { getPrice } from '../../../utils/getPrice';
import { useModalManage } from '../../../dialogs/hooks';
import { Modals } from '../../../store/types/modal';

export const TopMenu: FC = (): ReactElement => {
  const { makeDivergence } = useDivergence();
  const { open } = useModalManage();
  const { user } = useUser();

  const { balance, taraOnHands } = user || {};

  const isTaraDivergenceDisabled = Boolean(
    user?.taraPaid && user?.taraOnHands && user?.taraPaid >= user?.taraOnHands,
  );

  const balanceCN = cn({
    [styles.Balance]: true,
    [styles.Clickable]: true,
  });

  const taraCN = cn({
    [styles.Remains]: true,
    [styles.Clickable]: !isTaraDivergenceDisabled,
  });

  return (
    <div className={styles.TopMenu}>
      <div className={`container ${styles.Wrapper}`}>
        <div className={styles.LeftMenu}>
          {/* <div className={styles.City}> */}
          {/*  <LocationIcon /> */}
          {/*  <p>Москва</p> */}
          {/* </div> */}
          <div className={styles.LinkWrapper}>
            <Link className={styles.Link} to="/delivery">
              Доставка и оплата
            </Link>
          </div>
          <div className={styles.LinkWrapper}>
            <Link className={styles.Link} to="/contacts">
              Контакты
            </Link>
          </div>
          <div className={styles.LinkWrapper}>
            <div className={styles.Phone}>
              <PhoneIcon />
              <a href="tel:+74951145555" className={styles.LinkToCall}>
                +7(495)114-55-55
              </a>
            </div>
          </div>
        </div>
        {user ? (
          <div className={styles.RightMenu}>
            <div
              className={taraCN}
              onClick={(): void => {
                if (!isTaraDivergenceDisabled) {
                  makeDivergence();
                }
              }}
            >
              <BottleIcon className={styles.BottleIcon} />
              <span>Тара на руках:</span>
              <span className={styles.Red}>{taraOnHands}&nbsp;баллонов</span>
            </div>
            <div
              className={balanceCN}
              onClick={(): void => open(Modals.Refill)}
            >
              <WalletIcon className={styles.WalletIcon} />
              <span>Баланс:</span>
              <span className={styles.Red}>
                {getPrice(balance || 0)}&nbsp;&#8381;
              </span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
