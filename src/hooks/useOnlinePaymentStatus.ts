import { useState, Dispatch, SetStateAction } from 'react';

export type OnlinePaymentStatus = {
  successOnlinePayment: boolean;
  failureOnlinePayment: boolean;
  failMessage: string;
};

type UseOnlinePaymentStatus = {
  setSuccessOnlinePayment: Dispatch<SetStateAction<boolean>>;
  setFailureOnlinePayment: Dispatch<SetStateAction<boolean>>;
  setFailMessage: Dispatch<SetStateAction<string>>;
} & OnlinePaymentStatus;

export const useOnlinePaymentStatus = (): UseOnlinePaymentStatus => {
  const [successOnlinePayment, setSuccessOnlinePayment] = useState(false);
  const [failureOnlinePayment, setFailureOnlinePayment] = useState(false);
  const [failMessage, setFailMessage] = useState('');

  return {
    successOnlinePayment,
    failureOnlinePayment,
    failMessage,
    setSuccessOnlinePayment,
    setFailureOnlinePayment,
    setFailMessage,
  };
};
