import React, { FC, ReactElement } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import { PaymentVariant } from '../../utils/getPaymentVariants';
import { PaymentTypeNumbers } from '../../utils/types';

type VariantCheckerProps = {
  variants: PaymentVariant[];
  checked: PaymentTypeNumbers;
  onChange(method: PaymentTypeNumbers): () => void;
};

export const VariantChecker: FC<VariantCheckerProps> = ({
  variants,
  checked,
  onChange,
}: VariantCheckerProps): ReactElement => {
  return (
    <div className={styles.List}>
      {variants.map(({ value, label }) => (
        <Variant
          key={value}
          active={value === checked}
          label={label}
          onChange={onChange(value)}
        />
      ))}
    </div>
  );
};

type VariantProps = {
  active: boolean;
  label: string;
  onChange(): void;
};

const Variant: FC<VariantProps> = ({
  active,
  label,
  onChange,
}: VariantProps): ReactElement => {
  const className = cn({
    [styles.Item]: true,
    [styles.ItemActive]: active,
  });

  return (
    <div className={className} onClick={onChange}>
      <div className={styles.Checkbox} />
      <p className={styles.Label}>{label}</p>
    </div>
  );
};
