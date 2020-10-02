// Core
import React, {
  useState,
  useEffect,
  FC,
  ReactElement,
  ChangeEvent,
} from 'react';
import { DialogProps } from '@material-ui/core/Dialog';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import isEmpty from 'lodash.isempty';
import useAutocomplete from '@material-ui/lab/useAutocomplete';

// Styles
import styles from '../../pages/SignUpPage/styles.module.scss';
import stylesRoot from './styles.module.scss';

// Components
import { Dialog } from '../../components/ui/Dialog';
import { FormControl } from '../../components/ui/FormControl';
import { PhoneInput } from '../../components/ui/PhoneInput';
import { Button } from '../../components/ui/Button';
import {
  useAddress,
  useFormHandlers,
  useUser,
  useAddressSearch,
} from '../../hooks';
import {
  AddressBody,
  AddressResponse,
  ContactResponse,
  SearchAddressBody,
} from '../../store/types/address';
import { Select } from '../../components/ui/Select';
import { SelectOptions } from '../../components/ui/Select/types';
import { toastService } from '../../services/toast';
import { Checkbox } from '../../components/ui/Ckeckbox';
import { isNullOrUndefined } from '../../utils';

type AddressDialogProps = { address: AddressResponse } & DialogProps;

export type FormikValues = {
  name: string;
  contact: {
    name: string;
    surname: string;
    patronymic: string;
    phone: string;
  };
  city: string;
  street: string;
  house: string;
  flat: string;
  entry: string;
  doorphone: string;
  floor: string;
};

export const AddressDialog: FC<AddressDialogProps> = ({
  address,
  ...props
}): ReactElement => {
  const { onClose } = props;
  const { createUserAddress, updateUserAddress, cities } = useAddress();
  const { addresses, fetchAddresses } = useAddressSearch();
  const { user } = useUser();
  const [checkedUserData, setCheckedUserData] = useState(false);

  let cityOptions: SelectOptions = [];
  if (cities && cities.length) {
    cityOptions = cities.map(({ id, name }) => {
      return {
        value: id.toString(),
        name,
      };
    });
  }

  const {
    firstName: userFirstName,
    surname: userSurname,
    patronymic: userPatronymic,
    phone: userPhone,
  } = user || {};

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
    setValues,
  } = useFormik<FormikValues>({
    initialValues: {
      name: '',
      street: '',
      house: '',
      city:
        cityOptions && cityOptions.length
          ? (cityOptions[0].value as string)
          : '',
      doorphone: '',
      entry: '',
      flat: '',
      floor: '',
      contact: {
        name: '',
        patronymic: '',
        phone: '',
        surname: '',
      },
    },
    onSubmit: async (val) => {
      const {
        name,
        street,
        house,
        city,
        doorphone,
        entry,
        flat,
        floor,
        contact: { name: contactName, patronymic, phone, surname },
      } = val;

      const addressBody: AddressBody = {
        name: name as string,
        city: {
          id: +(city as string),
        },
        street: street as string,
        house: house as string,
        flat: +(flat as string),
        entry: entry as string,
        doorphone: doorphone as string,
        floor: +(floor as string),
        contacts: [
          {
            name: contactName,
            surname,
            patronymic,
            phone,
          },
        ],
      };

      try {
        if (address && !isEmpty(address)) {
          addressBody.id = address.id;
          addressBody.contacts[0].id = address.contacts[0].id;
          await updateUserAddress(addressBody);
          toastService.success('Адрес обновлен');
        } else {
          await createUserAddress(addressBody);
          toastService.success('Адрес создан');
        }

        if (onClose) {
          onClose({}, 'backdropClick');
        }
      } catch (e) {
        console.log(e);
      } finally {
        setSubmitting(false);
      }
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Обязательное поле'),
      street: Yup.string().required('Обязательное поле'),
      house: Yup.string().required('Обязательное поле'),
      city: Yup.number().required('Обязательное поле'),
      doorphone: Yup.string(),
      entry: Yup.number(),
      flat: Yup.number(),
      floor: Yup.number(),
      contact: Yup.object().shape({
        name: Yup.string().required('Обязательное поле'),
        // patronymic: Yup.string().required('Обязательное поле'),
        phone: Yup.string()
          .required('Обязательное поле')
          .matches(/^[0-9]{10}$/, 'Некорректный номер'),
        surname: Yup.string().required('Обязательное поле'),
      }),
    }),
  });

  const {
    handleInputChange,
    handleInputFocus,
    handleInputTouched,
    handleFormControlChange,
  } = useFormHandlers(setFieldValue, setFieldTouched);

  useEffect(() => {
    if (!isEmpty(address)) {
      const {
        name,
        street,
        house,
        city,
        doorphone,
        entry,
        flat,
        floor,
        contacts,
      } = address || {};

      let contact: ContactResponse | null = null;

      if (contacts && contacts[0]) {
        [contact] = contacts;
      }

      setValues({
        name: name || '',
        street: street || '',
        house: house?.toString() || '',
        city: city?.id?.toString() || '',
        doorphone: doorphone || '',
        entry: entry || '',
        flat: flat?.toString() || '',
        floor: floor?.toString() || '',
        contact: {
          name: contact?.name || '',
          patronymic: contact?.patronymic || '',
          phone: contact?.phone || '',
          surname: contact?.surname || '',
        },
      });
    } else {
      resetForm();
    }
  }, [address]);

  const handleUserCheckboxChange = (): void => {
    setCheckedUserData((checked) => {
      if (!checked) {
        setFieldValue('contact.name', userFirstName || '');
        setFieldValue('contact.surname', userSurname || '');
        setFieldValue('contact.patronymic', userPatronymic || '');
        setFieldValue('contact.phone', userPhone || '');
      } else {
        setFieldValue('contact.name', '');
        setFieldValue('contact.surname', '');
        setFieldValue('contact.patronymic', '');
        setFieldValue('contact.phone', '');
      }

      return !checked;
    });
  };

  const handleAddressInputChange = (field: string) => (
    e: ChangeEvent<HTMLInputElement>,
  ): void => {
    setFieldValue(field, e.target.value);
    const city = cityOptions.find((c) => c.value === values.city);
    const street = field === 'street' ? e.target.value : values.street;
    const house = field === 'house' ? e.target.value : values.house;
    const flat = field === 'flat' ? e.target.value : values.flat;

    const searchAddress: SearchAddressBody = {
      city: city?.name || '',
      street: street || undefined,
      house: house || undefined,
      flat: flat || undefined,
    };

    fetchAddresses(searchAddress);
  };

  const foundStreets = addresses.reduce((acc: string[], a) => {
    if (a !== null && a !== undefined && a.street) {
      acc.push(a.street);
    }
    return acc;
  }, []);
  const foundHouses = addresses.reduce((acc: string[], a) => {
    if (a !== null && a !== undefined && a.house) {
      acc.push(a.house);
    }
    return acc;
  }, []);
  const foundFlats = addresses.reduce((acc: string[], a) => {
    if (a !== null && a !== undefined && a.flat) {
      acc.push(a.flat);
    }
    return acc;
  }, []);

  // Street Autocomplete
  const {
    getRootProps: getRootPropsStreet,
    getInputProps: getInputPropsStreet,
    getListboxProps: getListboxPropsStreet,
    getOptionProps: getOptionPropsStreet,
    groupedOptions: groupedOptionsStreet,
  } = useAutocomplete({
    id: 'search-street',
    options: Array.from(new Set(foundStreets)),
    getOptionLabel: (street) => street.toString(),
    autoSelect: false,
    onChange: (event: React.ChangeEvent<{}>, value: string | null) => {
      setFieldValue('street', value);
    },
  });

  const {
    ref: refStreet,
    onBlur: onBlurStreet,
    onFocus: onFocusStreet,
    ...restStreetProps
  }: any = getInputPropsStreet() || {};

  // House Autocomplete
  const {
    getRootProps: getRootPropsHouse,
    getInputProps: getInputPropsHouse,
    getListboxProps: getListboxPropsHouse,
    getOptionProps: getOptionPropsHouse,
    groupedOptions: groupedOptionsHouse,
  } = useAutocomplete({
    id: 'search-house',
    options: Array.from(new Set(foundHouses)),
    getOptionLabel: (house) => house.toString(),
    autoSelect: false,
    onChange: (event: React.ChangeEvent<{}>, value: string | null) => {
      setFieldValue('house', value);
    },
  });

  const {
    ref: refHouse,
    onBlur: onBlurHouse,
    onFocus: onFocusHouse,
    ...restHouseProps
  }: any = getInputPropsHouse() || {};

  // Flat Autocomplete
  const {
    getRootProps: getRootPropsFlat,
    getInputProps: getInputPropsFlat,
    getListboxProps: getListboxPropsFlat,
    getOptionProps: getOptionPropsFlat,
    groupedOptions: groupedOptionsFlat,
  } = useAutocomplete({
    id: 'search-flat',
    options: Array.from(new Set(foundFlats)),
    getOptionLabel: (flat) => flat.toString(),
    autoSelect: false,
    onChange: (event: React.ChangeEvent<{}>, value: string | null) => {
      setFieldValue('flat', value);
    },
  });

  const {
    ref: refFlat,
    onBlur: onBlurFlat,
    onFocus: onFocusFlat,
    ...restFlatProps
  }: any = getInputPropsFlat() || {};

  return (
    <Dialog
      {...props}
      onExited={(): void => {
        resetForm();
        setCheckedUserData(false);
      }}
      maxWidth="sm"
      fullWidth
    >
      <form
        className={`${styles.FormWrapper} ${stylesRoot.Wrapper}`}
        onSubmit={handleSubmit}
      >
        <h3 className={styles.SectionTitle}>Адрес доставки</h3>

        {/* ADDRESS NAME */}
        <div className={styles.FormGroup}>
          <p className={styles.FormLabel}>Название:</p>
          <div className={styles.FormControl}>
            <FormControl
              placeholder="Введите название для адреса"
              type="text"
              name="name"
              value={values.name}
              onChange={handleFormControlChange('name')}
              error={Boolean(errors?.name && touched?.name)}
              errorMessage={errors?.name}
              onBlur={handleBlur}
              onFocus={(): void => {
                handleInputFocus('name');
              }}
            />
          </div>
        </div>

        {/* RECEIVER LASTNAME */}
        <div className={styles.FormGroup}>
          <p className={styles.FormLabel}>Фамилия получателя:</p>
          <div className={styles.FormControl}>
            <FormControl
              placeholder="Введите фамилию"
              type="text"
              name="contact.surname"
              value={values.contact.surname}
              onChange={handleFormControlChange('contact.surname')}
              error={Boolean(
                errors?.contact?.surname && touched?.contact?.surname,
              )}
              errorMessage={errors?.contact?.surname}
              onBlur={handleBlur}
              onFocus={(): void => {
                handleInputFocus('contact.surname');
              }}
            />
          </div>
        </div>

        {/* RECEIVER FIRSTNAME */}
        <div className={styles.FormGroup}>
          <p className={styles.FormLabel}>Имя получателя:</p>
          <div className={styles.FormControl}>
            <FormControl
              placeholder="Введите имя"
              type="text"
              name="contact.name"
              value={values.contact.name}
              onChange={handleFormControlChange('contact.name')}
              error={Boolean(errors?.contact?.name && touched?.contact?.name)}
              errorMessage={errors?.contact?.name}
              onBlur={handleBlur}
              onFocus={(): void => {
                handleInputFocus('contact.name');
              }}
            />
          </div>
        </div>

        {/* RECEIVER patronymic */}
        <div className={styles.FormGroup}>
          <p className={styles.FormLabel}>Отчество получателя:</p>
          <div className={styles.FormControl}>
            <FormControl
              placeholder="Введите отчество"
              type="text"
              name="contact.patronymic"
              value={values.contact.patronymic}
              onChange={handleFormControlChange('contact.patronymic')}
              error={Boolean(
                errors?.contact?.patronymic && touched?.contact?.patronymic,
              )}
              errorMessage={errors?.contact?.patronymic}
              onBlur={handleBlur}
              onFocus={(): void => {
                handleInputFocus('contact.patronymic');
              }}
            />
          </div>
        </div>

        {/* RECEIVER PHONE */}
        <div className={styles.FormGroup}>
          <p className={styles.FormLabel}>Номер получателя:</p>
          <div className={styles.FormControl}>
            <PhoneInput
              onChange={(phone): void => {
                handleInputChange('contact.phone', phone);
              }}
              onBlur={(): void => {
                handleInputTouched('contact.phone');
              }}
              onFocus={(): void => {
                handleInputFocus('contact.phone');
              }}
              inputProps={{
                name: 'contact.phone',
              }}
              error={Boolean(errors?.contact?.phone && touched?.contact?.phone)}
              errorMessage={errors?.contact?.phone}
              value={values.contact?.phone}
            />
          </div>
        </div>

        <div className={stylesRoot.CheckboxWrapper}>
          <label>
            <Checkbox
              checkboxProps={{
                onChange: (): void => {
                  handleUserCheckboxChange();
                },
                checked: checkedUserData,
              }}
            />
            <p className={stylesRoot.CheckboxLabel}>
              Совпадает с учетной записью
            </p>
          </label>
        </div>

        <div className={styles.FormDivider}>
          <div className={styles.FormGroupRow}>
            <div className={styles.FormGroupColumn}>
              <p className={styles.FormGroupColumnLabel}>Город:</p>
              <div className={styles.FormGroupColumnControlMedium}>
                <Select
                  options={cityOptions}
                  changeHandler={(value): void => {
                    setFieldValue('city', value);
                  }}
                  value={values.city}
                />
              </div>
            </div>

            <div className={styles.FormGroupColumn}>
              <p className={styles.FormGroupColumnLabel}>Улица:</p>
              <div
                className={styles.FormGroupColumnControlMedium}
                style={{ position: 'relative' }}
                {...getRootPropsStreet()}
              >
                <FormControl
                  inputRef={refStreet}
                  {...restStreetProps}
                  placeholder="Улица"
                  type="text"
                  name="street"
                  value={values.street}
                  onChange={handleAddressInputChange('street')}
                  error={Boolean(errors?.street && touched?.street)}
                  errorMessage={errors?.street}
                  onBlur={(e): void => {
                    onBlurStreet(e);
                    handleBlur(e);
                  }}
                  onFocus={(e): void => {
                    onFocusStreet(e);
                    handleInputFocus('street');
                  }}
                  autoComplete="new-password"
                />

                {groupedOptionsStreet && groupedOptionsStreet.length ? (
                  <ul
                    {...getListboxPropsStreet()}
                    className={stylesRoot.SearchList}
                  >
                    {groupedOptionsStreet.map((option, index) => {
                      return (
                        <li {...getOptionPropsStreet({ option, index })}>
                          {option}
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </div>
            </div>
          </div>

          <div className={styles.FormGroupRow}>
            <div className={styles.FormGroupColumn}>
              <p className={styles.FormGroupColumnLabel}>Номер дома:</p>
              <div
                className={styles.FormGroupColumnControlMedium}
                style={{ position: 'relative' }}
                {...getRootPropsHouse()}
              >
                <FormControl
                  inputRef={refHouse}
                  {...restHouseProps}
                  placeholder="Номер дома"
                  type="string"
                  name="house"
                  value={values.house}
                  onChange={handleAddressInputChange('house')}
                  error={Boolean(errors?.house && touched?.house)}
                  errorMessage={errors?.house}
                  onBlur={(e): void => {
                    onBlurHouse(e);
                    handleBlur(e);
                  }}
                  onFocus={(e): void => {
                    onFocusHouse(e);
                    handleInputFocus('house');
                  }}
                  autoComplete="new-password"
                />

                {groupedOptionsHouse && groupedOptionsHouse.length ? (
                  <ul
                    {...getListboxPropsHouse()}
                    className={stylesRoot.SearchList}
                  >
                    {groupedOptionsHouse.map((option, index) => {
                      return (
                        <li {...getOptionPropsHouse({ option, index })}>
                          {option}
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </div>
            </div>

            <div className={styles.FormGroupColumn}>
              <p className={styles.FormGroupColumnLabel}>Номер квартиры:</p>
              <div
                className={styles.FormGroupColumnControlMedium}
                style={{ position: 'relative' }}
                {...getRootPropsFlat()}
              >
                <FormControl
                  inputRef={refFlat}
                  {...restFlatProps}
                  placeholder="Номер квартиры"
                  type="number"
                  name="flat"
                  value={values.flat}
                  onChange={handleAddressInputChange('flat')}
                  error={Boolean(errors?.flat && touched?.flat)}
                  errorMessage={errors?.flat}
                  onBlur={(e): void => {
                    onBlurFlat(e);
                    handleBlur(e);
                  }}
                  onFocus={(e): void => {
                    onFocusFlat(e);
                    handleInputFocus('flat');
                  }}
                  autoComplete="new-password"
                />

                {groupedOptionsFlat && groupedOptionsFlat.length ? (
                  <ul
                    {...getListboxPropsFlat()}
                    className={stylesRoot.SearchList}
                  >
                    {groupedOptionsFlat.map((option, index) => {
                      return (
                        <li {...getOptionPropsFlat({ option, index })}>
                          {option}
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </div>
            </div>
          </div>

          <div className={styles.FormGroupRow}>
            <div className={styles.FormGroupColumn}>
              <p className={styles.FormGroupColumnLabel}>Подъезд:</p>
              <div className={styles.FormGroupColumnControlSmall}>
                <FormControl
                  placeholder="Подъезд"
                  type="number"
                  name="entry"
                  value={values.entry}
                  onChange={handleFormControlChange('entry')}
                  error={Boolean(errors?.entry && touched?.entry)}
                  errorMessage={errors?.entry}
                  onBlur={handleBlur}
                  onFocus={(): void => {
                    handleInputFocus('entry');
                  }}
                />
              </div>
            </div>

            <div className={styles.FormGroupColumn}>
              <p className={styles.FormGroupColumnLabel}>Домофон:</p>
              <div className={styles.FormGroupColumnControlSmall}>
                <FormControl
                  placeholder="Домофон"
                  type="text"
                  name="doorphone"
                  value={values.doorphone}
                  onChange={handleFormControlChange('doorphone')}
                  error={Boolean(errors?.doorphone && touched?.doorphone)}
                  errorMessage={errors?.doorphone}
                  onBlur={handleBlur}
                  onFocus={(): void => {
                    handleInputFocus('doorphone');
                  }}
                />
              </div>
            </div>

            <div className={styles.FormGroupColumn}>
              <p className={styles.FormGroupColumnLabel}>Этаж:</p>
              <div className={styles.FormGroupColumnControlSmall}>
                <FormControl
                  placeholder="Этаж"
                  type="number"
                  name="floor"
                  value={values.floor}
                  onChange={handleFormControlChange('floor')}
                  error={Boolean(errors?.floor && touched?.floor)}
                  errorMessage={errors?.floor}
                  onBlur={handleBlur}
                  onFocus={(): void => {
                    handleInputFocus('floor');
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={stylesRoot.ButtonsWrapper}>
          <div className={stylesRoot.ButtonWrapper}>
            <Button
              bgColor="e1"
              textColor="darkRed"
              fullWidth
              onClick={(): void => {
                if (onClose) {
                  onClose({}, 'backdropClick');
                }
              }}
              type="button"
            >
              отмена
            </Button>
          </div>

          <div className={stylesRoot.ButtonWrapper}>
            <Button
              bgColor="darkRed"
              fullWidth
              type="submit"
              disabled={isSubmitting}
            >
              добавить
            </Button>
          </div>
        </div>
      </form>
    </Dialog>
  );
};
