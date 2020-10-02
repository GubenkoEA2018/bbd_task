// Core
import React, { FC, ReactElement } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

// Styles
import styles from './styles.module.scss';

// Hooks
import { useSetPageTitle, useSecurity, useFormHandlers } from '../../hooks';

// Utils
import { Color } from '../../utils';

// Components
import { PageTitle } from '../../components/PageTitle';
import { PhoneInput } from '../../components/ui/PhoneInput';
import { Button } from '../../components/ui/Button';
import { FormControl } from '../../components/ui/FormControl';
import { Checkbox } from '../../components/ui/Ckeckbox';

// Other
import { SmsStatusCodes } from '../../store/types/security';
import { useModalManage } from '../../dialogs/hooks';
import { Modals } from '../../store/types/modal';
import { PageTitleEnum } from '../../utils/types';

export type FormikValues = {
  phone: string;
  smsCode: string;
  user: {
    email: string;
    firstName?: string;
    surname?: string;
    patronymic?: string;
  };
  agreePolicy: boolean;
};

const SignUpPage: FC = (): ReactElement => {
  const { open } = useModalManage();
  const { sendSmsCode, login, codeStatus } = useSecurity();
  const history = useHistory();

  useSetPageTitle(PageTitleEnum.SignUpPage);

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
      user: {
        email: '',
        firstName: '',
        surname: '',
        patronymic: '',
      },
      agreePolicy: false,
    },
    onSubmit: async (val) => {
      const {
        phone,
        smsCode,
        user: { firstName, surname, email, patronymic },
      } = val;
      try {
        await login({
          code: smsCode,
          email,
          firstName,
          patronymic,
          phone,
          surname,
        });
        resetForm();
        history.replace('/');
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
        .matches(/^[0-9]{4}$/, 'Длина 4 символа'),
      user: Yup.object().shape({
        email: Yup.string()
          .email('Неверный формат email')
          .required('Обязательное поле'),
      }),
      agreePolicy: Yup.bool().oneOf([true], 'Примите условия'),
    }),
  });

  // useEffect(() => {
  //   if (!isEmpty(errors) && isSubmitting) {
  //     window.scrollTo(0, 0);
  //   }
  // }, [errors, isSubmitting]);

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
      <div>
        <div className="container">
          <PageTitle current="Регистрация" title="Личный кабинет" />

          <div className={styles.FormWrapper}>
            <form onSubmit={handleSubmit}>
              <h3 className={styles.SectionTitle}>
                ИНФОРМАЦИЯ ОБ УЧЕТНОЙ ЗАПИСИ ПОЛЬЗОВАТЕЛЯ
              </h3>

              {/* PHONE */}
              <div className={styles.FormGroup}>
                <p className={`${styles.FormLabel} ${styles.FormRequired}`}>
                  Номер телефона:
                </p>
                <div className={styles.FormControl}>
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
                <>
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
                  <div className={styles.FormGroup}>
                    <p className={`${styles.FormLabel} ${styles.FormRequired}`}>
                      Код подтверждения:
                    </p>
                    <div className={styles.FormControl}>
                      <FormControl
                        placeholder="Введите код из смс"
                        type="number"
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
                </>
              ) : (
                <div className={styles.ButtonRow}>
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

              {/* EMAIL */}
              <div className={styles.FormGroup}>
                <p className={`${styles.FormLabel} ${styles.FormRequired}`}>
                  Электронная почта:
                </p>
                <div className={styles.FormControl}>
                  <FormControl
                    placeholder="Введите e-mail"
                    type="email"
                    name="user.email"
                    value={values.user.email}
                    onChange={handleFormControlChange('user.email')}
                    error={Boolean(errors?.user?.email && touched?.user?.email)}
                    errorMessage={errors?.user?.email}
                    onBlur={handleBlur}
                    onFocus={(): void => {
                      handleInputFocus('user.email');
                    }}
                  />
                </div>
              </div>

              {/* ------------------------------------------------ */}
              <div className={styles.FormDivider}>
                <h3 className={styles.SectionTitle}>КОНТАКТНАЯ ИНФОРМАЦИЯ</h3>
              </div>

              {/* surname */}
              <div className={styles.FormGroup}>
                <p className={styles.FormLabel}>Фамилия:</p>
                <div className={styles.FormControl}>
                  <FormControl
                    onChange={handleFormControlChange('user.surname')}
                    name="user.surname"
                    value={values.user.surname}
                    placeholder="Ваша фамилия"
                    type="text"
                  />
                </div>
              </div>

              {/* FIRSTNAME */}
              <div className={styles.FormGroup}>
                <p className={styles.FormLabel}>Имя:</p>
                <div className={styles.FormControl}>
                  <FormControl
                    onChange={handleFormControlChange('user.firstName')}
                    name="user.firstName"
                    placeholder="Ваше имя"
                    value={values.user.firstName}
                    type="text"
                  />
                </div>
              </div>

              {/* patronymic */}
              <div className={styles.FormGroup}>
                <p className={styles.FormLabel}>Отчество:</p>
                <div className={styles.FormControl}>
                  <FormControl
                    onChange={handleFormControlChange('user.patronymic')}
                    name="user.patronymic"
                    value={values.user.patronymic}
                    placeholder="Ваше отчество"
                    type="text"
                  />
                </div>
              </div>

              {/* ------------------------------------------------ */}
              <div className={styles.FormDivider}>
                <div className={styles.CheckboxWrapper}>
                  <Checkbox
                    checkboxProps={{
                      onChange: (e): void => {
                        handleInputChange('agreePolicy', e.target.checked);
                      },
                      checked: values.agreePolicy,
                    }}
                  />
                  <p className={styles.CheckboxLabel}>
                    Я согласен/согласна на{' '}
                    <span
                      onClick={(): void => {
                        open(Modals.Policy);
                      }}
                    >
                      обработку своих персональных данных указанным образом.
                    </span>
                  </p>
                </div>

                {/* <div className={styles.CheckboxWrapper}> */}
                {/*  <label> */}
                {/*    <Checkbox */}
                {/*      checkboxProps={{ */}
                {/*        onChange: () => { */}
                {/*          console.log(1); */}
                {/*        }, */}
                {/*      }} */}
                {/*    /> */}
                {/*    <p className={styles.CheckboxLabel}> */}
                {/*      Получать новости компании и уникальные скидки для */}
                {/*      подписчиков */}
                {/*    </p> */}
                {/*  </label> */}
                {/* </div> */}
              </div>

              {errors.agreePolicy && touched.agreePolicy && (
                <p
                  style={{
                    color: Color.error,
                    fontSize: 12,
                    marginTop: 20,
                    marginBottom: 20,
                    paddingLeft: 30,
                  }}
                >
                  {errors.agreePolicy}
                </p>
              )}

              <div className={styles.FormDivider}>
                <Button
                  fullWidth
                  bgColor="darkBlue"
                  type="submit"
                  disabled={
                    isSubmitting || codeStatus !== SmsStatusCodes.Success
                  }
                >
                  регистрация
                </Button>
                {codeStatus !== SmsStatusCodes.Success && (
                  <div className={styles.SmsCodeMessage}>
                    Сначала нужно подтвердить номер телефона
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
