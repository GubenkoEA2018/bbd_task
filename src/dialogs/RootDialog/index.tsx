// Core
import React, { FC, ReactElement } from 'react';

// Dialogs
import { LoginDialog } from '../Login';
import { CartDialog } from '../Cart';
import { AddressDialog } from '../Address';
import { DeleteDialog } from '../Delete';
import { RefillDialog } from '../Refill';
import { DivergenceDialog } from '../Divergence';

// Hooks
import { useModalManage } from '../hooks';

// Types
import { Modals } from '../../store/types/modal';
import { AddressResponse } from '../../store/types/address';
import { DeleteModalCallback } from '../../components/DeliveryAddress';
import { PublishedProduct } from '../../store/types/catalog';

export const RootDialog: FC = (): ReactElement => {
  const { close, modalType, modalProps } = useModalManage();

  return (
    <>
      <LoginDialog open={modalType === Modals.Login} onClose={close} />
      <DeleteDialog
        open={modalType === Modals.Delete}
        onClose={close}
        confirmDelete={modalProps as DeleteModalCallback}
      />
      <AddressDialog
        open={modalType === Modals.Address}
        onClose={close}
        address={modalProps as AddressResponse}
      />
      <CartDialog
        product={modalProps as PublishedProduct}
        open={modalType === Modals.Cart}
        onClose={close}
      />
      <RefillDialog open={modalType === Modals.Refill} onClose={close} />
      <DivergenceDialog
        open={modalType === Modals.Divergence}
        onClose={close}
      />
    </>
  );
};
