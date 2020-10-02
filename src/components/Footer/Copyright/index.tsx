import React, { FC, ReactElement } from 'react';
import CopyrightIcon from '@material-ui/icons/Copyright';
import styles from './styles.module.scss';

export const Copyright: FC = (): ReactElement => {
  return (
    <div className={styles.content}>
      <CopyrightIcon style={{ fontSize: 14 }} />
      <div className={styles.year}>{new Date().getFullYear()}</div>
      <p className={styles.text}>Королевская вода. Все права защищены.</p>
    </div>
  );
};
