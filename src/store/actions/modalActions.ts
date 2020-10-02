import {
  HIDE_MODAL,
  ModalActionTypes,
  Modals,
  SHOW_MODAL,
  ModalOpenAction,
} from '../types/modal';

export const showModal = <T>(
  modalType: Modals,
  modalProps?: T,
): ModalOpenAction<T> => ({
  type: SHOW_MODAL,
  modalType,
  modalProps,
});

export const hideModal = (): ModalActionTypes => ({
  type: HIDE_MODAL,
});
