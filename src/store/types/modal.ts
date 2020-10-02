export enum Modals {
  Cart = 'CART_MODAL',
  Login = 'LOGIN_MODAL',
  Address = 'ADDRESS_MODAL',
  Delete = 'DELETE_MODAL',
  Policy = 'POLICY_MODAL',
  Agree = 'AGREE_MODAL',
  Refill = 'REFILL_MODAL',
  Divergence = 'DIVERGENCE_MODAL',
}

export const SHOW_MODAL = 'SHOW_MODAL';
export type ModalOpenAction<T> = {
  type: typeof SHOW_MODAL;
  modalType: Modals;
  modalProps?: T;
};

export const HIDE_MODAL = 'HIDE_MODAL';
type ModalHideAction = {
  type: typeof HIDE_MODAL;
};

export type ModalActionTypes = ModalOpenAction<unknown> | ModalHideAction;
