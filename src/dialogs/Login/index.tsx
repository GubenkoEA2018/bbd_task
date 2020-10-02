// Core
import React, { FC, ReactElement } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { DialogProps } from '@material-ui/core/Dialog';
import * as Yup from 'yup';
import { useFormik } from 'formik';

// Styles
import styles from './styles.module.scss';

// Components
import { Button } from '../../components/ui/Button';
import { Dialog } from '../../components/ui/Dialog';
import { FormControl } from '../../components/ui/FormControl';
import { PhoneInput } from '../../components/ui/PhoneInput';

// Hooks
import { useSecurity, useFormHandlers } from '../../hooks';
import { useModalManage } from '../hooks';

// Other
import { SmsStatusCodes } from '../../store/types/security';

type FormikValues = {
  phone: string;
  smsCode: string;
};

export const LoginDialog: FC<DialogProps> = (
  props: DialogProps,
): ReactElement => {
  const { sendSmsCode, login, codeStatus } = useSecurity();
  const history = useHistory();
  const { close } = useModalManage();

  const {
    handleSubmit,
    handleBlur,
    isSubmitting,
    values,
    errors,
    touched,
    setSubmitting,
    setFieldValue,
    setFieldTouched,
    resetForm,
  } = useFormik<FormikValues>({
    initialValues: {
      phone: '',
      smsCode: '',
    },
    onSubmit: async (val) => {
      const { phone, smsCode } = val;
      try {
        await login({
          code: smsCode,
          phone,
        });
        resetForm();
        close();
        history.replace('/profile');
      } catch (e) {
        setSubmitting(false);
      }
    },
    validationSchema: Yup.object().shape({
      phone: Yup.string()
        .required('Обязательное поле')
        .matches(/^[0-9]{10}$/, 'Некорректный номер'),
      smsCode: Yup.string()
        .required('Введите код из смс')
        .matches(/^[0-9]{4}$/, 'Неверный формат кода'),
      rememberMe: Yup.bool(),
    }),
  });

  const {
    handleInputChange,
    handleInputFocus,
    handleInputTouched,
    handleFormControlChange,
  } = useFormHandlers(setFieldValue, setFieldTouched);

  const sendCode = (): void => {
    sendSmsCode(values.phone);
  };

  return (
    <>
      <Dialog {...props}>
        <form onSubmit={handleSubmit} className={styles.Wrapper}>
          <h4 className={styles.Title}>войти</h4>

          <p className={styles.Mt30}>
            Чтобы выполнить действие, войдите в личный кабинет.
          </p>

          <div className={styles.Mt30}>
            {/* PHONE */}
            <div className={styles.FormGroupColumn}>
              <span
                className={`${styles.FormGroupColumnLabel} ${styles.FormRequired}`}
              >
                Телефон:
              </span>
              <div className={styles.FormGroupColumnControl}>
                <PhoneInput
                  onChange={(phone): void => {
                    handleInputChange('phone', phone);
                  }}
                  onBlur={(): void => {
                    handleInputTouched('phone');
                  }}
                  onFocus={(): void => {
                    handleInputFocus('phone');
                  }}
                  inputProps={{
                    name: 'phone',
                  }}
                  error={Boolean(errors?.phone && touched?.phone)}
                  errorMessage={errors?.phone}
                  value={values.phone}
                />
              </div>
            </div>

            {/* CHECK THAT SMS IS SENT */}
            {codeStatus !== null && codeStatus === SmsStatusCodes.Success ? (
              <div className={styles.Mt10}>
                <div className={styles.ButtonRow}>
                  <div className={styles.ButtonWrapper}>
                    <Button
                      fullWidth
                      bgColor="e1"
                      textColor="darkBlue"
                      onClick={sendCode}
                      disabled={Boolean(errors?.phone || !values.phone)}
                    >
                      отправить еще раз
                    </Button>
                  </div>
                </div>

                {/* CODE */}
                <div className={styles.FormGroupColumn}>
                  <span
                    className={`${styles.FormGroupColumnLabel} ${styles.FormRequired}`}
                  >
                    Код подтверждения:
                  </span>
                  <div className={styles.FormGroupColumnControl}>
                    <FormControl
                      placeholder="Введите код из смс"
                      type="password"
                      name="smsCode"
                      value={values.smsCode}
                      onChange={handleFormControlChange('smsCode')}
                      error={Boolean(errors?.smsCode && touched?.smsCode)}
                      errorMessage={errors?.smsCode}
                      onBlur={handleBlur}
                      onFocus={(): void => {
                        handleInputFocus('smsCode');
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className={`${styles.ButtonRow} ${styles.Mt10}`}>
                <div className={styles.ButtonWrapper}>
                  <Button
                    disabled={Boolean(errors?.phone || !values.phone)}
                    fullWidth
                    bgColor="darkBlue"
                    onClick={sendCode}
                  >
                    отправить код
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className={styles.Mt10}>
            <Button
              fullWidth
              bgColor="darkBlue"
              type="submit"
              disabled={isSubmitting || codeStatus !== SmsStatusCodes.Success}
            >
              войти
            </Button>
          </div>
        </form>
      </Dialog>
    </>
  );
};
