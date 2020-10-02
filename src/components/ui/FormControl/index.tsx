// Core
import React, { FC, memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputBase, { InputBaseProps } from '@material-ui/core/InputBase';
// Utils
import { Color } from '../../../utils';

type FormControlProps = {
  error?: boolean;
  errorMessage?: string;
} & InputBaseProps;

const inputStyles = (error: FormControlProps['error']) => {
  return {
    padding: '7.5px 10px',
    flex: 1,
    borderRadius: 2,
    border: '1px solid',
    borderColor: error ? Color.error : Color.e1,
    '&:focus': {
      borderColor: Color.darkBlue,
    },
    '&::placeholder': {
      color: Color.blueGray,
      opacity: 1,
    },
    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    '&[type=number]': {
      '-moz-appearance': 'textfield',
    },
  };
};

export const FormControl: FC<FormControlProps> = memo(
  ({ error, errorMessage, ...props }: FormControlProps) => {
    const useStyles = makeStyles({
      root: {
        display: 'flex',
        alignItems: 'center',
        minWidth: 150,
        width: '100%',
        height: props.multiline ? 'unset' : 36,
        boxSizing: 'border-box',
      },
      input: {
        fontSize: 16,
        flex: 1,
        display: 'flex',
        '& input': inputStyles(error),
        '& textarea': inputStyles(error),
      },
      error: {
        color: Color.error,
        fontSize: 12,
        marginTop: 3,
        minHeight: 12,
      },
    });

    const classes = useStyles();

    return (
      <>
        <div className={classes.root}>
          <InputBase {...props} className={classes.input} />
        </div>
        <p className={classes.error}>
          {error && errorMessage ? errorMessage : null}
        </p>
      </>
    );
  },
);
