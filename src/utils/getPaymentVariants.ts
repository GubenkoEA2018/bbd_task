import { PaymentTypes } from '../store/types/order';
import { getPrice } from './getPrice';
import { PaymentTypeNumbers } from './types';

export type PaymentVariant = {
  value: PaymentTypeNumbers;
  label: string;
};

export const getPaymentVariants = (balance: number): PaymentVariant[] => {
  return [
    {
      value: PaymentTypes.OnlinePayment,
      label: 'Оплата банковской картой',
    },
    {
      value: PaymentTypes.BalancePayment,
      label: `Списать с баланса: ${getPrice(balance)} ₽`,
    },
  ];
};
