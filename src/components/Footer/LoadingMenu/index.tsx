import React, { FC, ReactElement } from 'react';
// import appleIcon from '../../../assets/icons/footer/loading-menu/apple.svg';
// import googleIcon from '../../../assets/icons/footer/loading-menu/google.svg';
import appIcon from '../../../assets/icons/footer/loading-menu/app.png';
import styles from './styles.module.scss';

export const LoadingMenu: FC = (): ReactElement => {
  return (
    <div className={styles.column}>
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={appIcon} className={styles.load} alt="" />
      </a>
    </div>
  );
};
