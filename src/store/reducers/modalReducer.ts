import {
  HIDE_MODAL,
  ModalActionTypes,
  Modals,
  SHOW_MODAL,
} from '../types/modal';

export type ModalState = {
  modalType: Modals | null;
  modalProps?: unknown;
};

const initialState: ModalState = {
  modalType: null,
  modalProps: null,
};

export const modalReducer = (
  state = initialState,
  action: ModalActionTypes,
): ModalState => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        modalType: action.modalType,
        modalProps: action.modalProps,
      };
    case HIDE_MODAL:
      return initialState;
    default:
      // eslint-disable-next-line no-case-declarations,@typescript-eslint/no-unused-vars
      const x: never = action;
  }
  return state;
};
