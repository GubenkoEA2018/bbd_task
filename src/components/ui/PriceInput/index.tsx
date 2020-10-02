// Core
import React, { FC, ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputBase, { InputBaseProps } from '@material-ui/core/InputBase';
// Utils
import { Color } from '../../../utils';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    minWidth: 95,
    width: '100%',
    height: 32,
    boxSizing: 'border-box',
    position: 'relative',
  },
  input: {
    fontSize: 14,
    flex: 1,
    display: 'flex',
    '& input': {
      padding: '6.2px 5px 6.2px 30px',
      flex: 1,
      border: `1.5px solid ${Color.e1}`,
      borderRadius: 2,
      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0,
      },
      '&[type=number]': {
        '-moz-appearance': 'textfield',
      },
      // '&:focus': {
      //   borderColor: Color.darkBlue,
      // },
    },
    '& input::placeholder': {
      color: Color.blueGray,
    },
  },
  rangeLabel: {
    position: 'absolute',
    left: 10,
    top: 'calc(50% - 6px)',
    fontSize: 12,
    color: Color.darkGray,
  },
}));

type PriceInputProps = {
  rangeLabel: string;
} & InputBaseProps;

export const PriceInput: FC<PriceInputProps> = ({
  rangeLabel,
  ...props
}: PriceInputProps): ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <span className={classes.rangeLabel}>{rangeLabel}</span>
      <InputBase type="number" {...props} className={classes.input} />
    </div>
  );
};
