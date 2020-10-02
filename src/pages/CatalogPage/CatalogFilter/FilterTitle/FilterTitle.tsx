import React, { memo, FC, ReactElement, MouseEvent } from 'react';
import styles from './FilterTitle.module.scss';

type FilterTitleProps = {
  title: string;
  label?: string;
  onClick?: (e: MouseEvent<HTMLParagraphElement>) => void;
};

export const FilterTitle: FC<FilterTitleProps> = memo(
  ({ title = '', label = '', onClick }: FilterTitleProps): ReactElement => {
    return (
      <div className={styles.TitleWrapper}>
        <p className={styles.TitleText}>{title}</p>
        <p className={styles.Reset} onClick={onClick}>
          {label}
        </p>
      </div>
    );
  },
);
