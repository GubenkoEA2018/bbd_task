// Core
import React, { FC, ReactElement } from 'react';
import { DialogProps } from '@material-ui/core/Dialog';

// Styles
import styles from './styles.module.scss';

// Components
import { Dialog } from '../../components/ui/Dialog';
import { Button } from '../../components/ui/Button';

type ModalProps = {
  confirmDelete: () => void;
} & DialogProps;

export const DeleteDialog: FC<ModalProps> = ({
  confirmDelete,
  ...props
}: ModalProps): ReactElement => {
  const { onClose } = props;

  const handleDelete = (): void => {
    confirmDelete();
    if (onClose) {
      onClose({}, 'escapeKeyDown');
    }
  };

  return (
    <Dialog {...props} maxWidth="sm" fullWidth id="delete-dialog">
      <div>
        <div className={styles.Title}>
          <h4>Удалить?</h4>
        </div>

        <div className={styles.ButtonsWrapper}>
          <div className={styles.ButtonWrapper}>
            <Button
              bgColor="e1"
              textColor="darkRed"
              fullWidth
              onClick={(): void => {
                if (onClose) {
                  onClose({}, 'backdropClick');
                }
              }}
            >
              отмена
            </Button>
          </div>

          <div className={styles.ButtonWrapper}>
            <Button bgColor="darkRed" fullWidth onClick={handleDelete}>
              подтвердить
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
