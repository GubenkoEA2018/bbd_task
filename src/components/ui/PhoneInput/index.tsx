// Core
import React, { FC, ReactElement } from 'react';
import PhoneInputReact, { PhoneInputProps } from 'react-phone-input-2';
import ru from 'react-phone-input-2/lang/ru.json';
import { makeStyles } from '@material-ui/core/styles';
import { Color } from '../../../utils';

type PhoneInputPropsType = {
  onChange: (phone: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  inputProps?: PhoneInputProps['inputProps'];
  error?: boolean;
  errorMessage?: string;
  value?: PhoneInputProps['value'];
};

const containerStyles = {
  border: '1px solid !important',
  borderRadius: '2px !important',
  '&::before': {
    content: '"+7"',
    position: 'absolute',
    left: 40,
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1,
    color: Color.blueGray,
    fontSize: 16,
  },
};

const useStyles = makeStyles({
  containerClass: {
    ...containerStyles,
    position: 'relative',
    borderColor: `${Color.e1} !important`,
  },
  containerClassError: {
    ...containerStyles,
    position: 'relative',
    borderColor: `${Color.error} !important`,
  },
  inputClass: {
    border: 'none !important',
    width: '100% !important',
    height: '36px !important',
    fontSize: '16px !important',
    color: `${Color.darkBlue} !important`,
    paddingLeft: '70px !important',
    '&:focus': {
      borderColor: Color.darkBlue,
    },
    '&::placeholder': {
      color: Color.blueGray,
    },
  },
  buttonClass: {
    border: 'none !important',
    borderRadius: '2px 0 0 2px !important',
    backgroundColor: `${Color.e1} !important`,
    '&:hover .selected-flag': {
      backgroundColor: `${Color.e1} !important`,
    },
    paddingRight: '25px !important',
  },
  error: {
    color: Color.error,
    fontSize: 12,
    marginTop: 3,
  },
});

export const PhoneInput: FC<PhoneInputPropsType> = ({
  onChange,
  onBlur,
  onFocus,
  inputProps,
  error,
  errorMessage,
  value,
}: PhoneInputPropsType): ReactElement => {
  const classes = useStyles();

  const containerClass = error
    ? classes.containerClassError
    : classes.containerClass;

  return (
    <>
      <PhoneInputReact
        disableSearchIcon
        disableDropdown
        enableLongNumbers
        disableCountryCode
        country="ru"
        onlyCountries={['ru']}
        localization={ru}
        placeholder="(___) ___-__-__"
        onChange={(phone): void => {
          if (onChange) {
            onChange(phone);
          }
        }}
        onBlur={onBlur}
        onFocus={onFocus}
        containerClass={containerClass}
        inputClass={classes.inputClass}
        buttonClass={classes.buttonClass}
        inputProps={inputProps}
        // inputProps={{ ...inputProps, autoComplete: 'off' }}
        value={value || ''}
      />
      {error && errorMessage && <p className={classes.error}>{errorMessage}</p>}
    </>
  );
};
