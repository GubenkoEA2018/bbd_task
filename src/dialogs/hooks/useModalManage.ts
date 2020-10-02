// Core
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Instruments
import { AppState } from '../../store/rootReducer';
import { ModalState } from '../../store/reducers/modalReducer';

// Actions
import { showModal, hideModal } from '../../store/actions/modalActions';

// Types
import { Modals } from '../../store/types/modal';

type UseModalManageType = ModalState & {
  open: <T>(type: Modals, props?: T) => void;
  close: () => void;
};

export const useModalManage = (): UseModalManageType => {
  const dispatch = useDispatch();

  const { modalProps, modalType } = useSelector(
    (state: AppState): ModalState => state.modal,
  );

  const open = useCallback(
    <T>(type: Modals, props?: T): void => {
      dispatch(showModal(type, props));
    },
    [dispatch],
  );

  const close: UseModalManageType['close'] = useCallback((): void => {
    dispatch(hideModal());
  }, [dispatch]);

  return {
    open,
    close,
    modalType,
    modalProps,
  };
};
