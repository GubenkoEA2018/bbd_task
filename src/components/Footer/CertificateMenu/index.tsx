import React, { FC, ReactElement } from 'react';
import { ReactComponent as CertificateIcon } from '../../../assets/icons/footer/certificate-menu/certificate.svg';
import styles from './styles.module.scss';

export const CertificateMenu: FC = (): ReactElement => {
  return (
    <div className={styles.menu}>
      <CertificateIcon />
    </div>
  );
};
