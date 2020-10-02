// Core
import React, { FC, ReactElement, useState, ChangeEvent } from 'react';
import { DialogProps } from '@material-ui/core/Dialog';

// Styles
import styles from './styles.module.scss';

// Components
import { Dialog } from '../../components/ui/Dialog';
import { Button } from '../../components/ui/Button';
import { FormControl } from '../../components/ui/FormControl';
import { useRefill } from '../../hooks';
import { Backdrop } from '../../components/ui/Backdrop';

type ModalProps = {} & DialogProps;

export const RefillDialog: FC<ModalProps> = ({
  ...props
}: ModalProps): ReactElement => {
  const { loading, refillBalance } = useRefill();
  const [value, setValue] = useState('');

  const { onClose } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    // eslint-disable-next-line no-shadow
    let { value } = e.target || {};
    if (+value <= 0) {
      value = (1).toString();
    }
    setValue(Number(value).toString());
  };

  const handleSubmit = async (): Promise<void> => {
    if (value && !Number.isNaN(+value)) {
      try {
        await refillBalance(+value * 100);
        if (onClose) {
          onClose({}, 'backdropClick');
        }
      } catch (error) {
        console.log('--> Error: ', error);
      }
    }
  };

  return (
    <>
      <Dialog
        {...props}
        maxWidth="sm"
        fullWidth
        id="delete-dialog"
        onExit={(): void => setValue('')}
      >
        <div>
          <div className={styles.Title}>
            <h4>Пополнить баланс</h4>
          </div>

          <div className={styles.InputWrapper}>
            <div className={styles.Input}>
              <FormControl
                type="number"
                placeholder="Введите сумму пополнения"
                value={value}
                onChange={handleChange}
              />
            </div>
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
              <Button
                bgColor="darkRed"
                fullWidth
                disabled={!value}
                onClick={handleSubmit}
              >
                Пополнить
              </Button>
            </div>
          </div>
        </div>

        <Backdrop open={loading} />
      </Dialog>
    </>
  );
};
