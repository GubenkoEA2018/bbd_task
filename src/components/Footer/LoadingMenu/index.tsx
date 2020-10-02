import React, { FC, ReactElement } from 'react';
import appleIcon from '../../../assets/icons/footer/loading-menu/apple.svg';
import googleIcon from '../../../assets/icons/footer/loading-menu/google.svg';
import styles from './styles.module.scss';

export const LoadingMenu: FC = (): ReactElement => {
  return (
    <div className={styles.column}>
      <a
        href="https://apps.apple.com/ru/app/korolevskaa-voda-dostavka/id982521262"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={appleIcon} className={styles.load} alt="" />
      </a>
      <a
        href="https://play.google.com/store/apps/details?id=com.media5.android.kingwater&hl=ru"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={googleIcon} alt="" />
      </a>
    </div>
  );
};
