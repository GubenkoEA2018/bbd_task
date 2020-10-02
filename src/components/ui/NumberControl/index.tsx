// Core
import React, { FC, ReactElement, MouseEvent, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputBase, { InputBaseProps } from '@material-ui/core/InputBase';
// Utils
import { Color } from '../../../utils';
// Images
import { ReactComponent as PlusIcon } from '../../../assets/icons/number-control/plus.svg';
import { ReactComponent as MinusIcon } from '../../../assets/icons/number-control/minus.svg';

type NumberControlProps = {
  theme?: 'light' | 'dark';
  onPlus: () => void;
  onMinus: () => void;
} & InputBaseProps;

export const NumberControl: FC<NumberControlProps> = ({
  theme,
  onPlus,
  onMinus,
  ...props
}: NumberControlProps): ReactElement => {
  const isLight = theme === 'light';

  const useStyles = makeStyles(() => ({
    root: {
      padding: '0',
      display: 'flex',
      alignItems: 'center',
      minWidth: 134,
      maxWidth: '100%',
      width: '100%',
      height: 34,
      border: '1px solid',
      borderColor: isLight ? Color.e1 : Color.darkBlue,
      borderRadius: 2,
      boxSizing: 'border-box',
      backgroundColor: isLight ? 'transparent' : Color.darkBlue,
    },
    input: {
      flex: 1,
      fontSize: 18,
      color: isLight ? Color.darkBlue : Color.white,
      '& input': {
        padding: '7px 5px',
        textAlign: 'center',
        '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
          '-webkit-appearance': 'none',
          margin: 0,
        },
        '&[type=number]': {
          '-moz-appearance': 'textfield',
        },
      },
    },
    controls: {
      color: isLight ? Color.e1 : Color.white,
      cursor: 'pointer',
      width: 34,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: isLight ? Color.lightGray : Color.darkBlue,
    },
    control: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    controlRight: {
      borderLeft: isLight ? '1px solid' : 'none',
      borderColor: isLight ? Color.e1 : 'transparent',
    },
    controlLeft: {
      borderRight: isLight ? '1px solid' : 'none',
      borderColor: isLight ? Color.e1 : 'transparent',
    },
    icon: {
      width: 14,
      height: 14,
      '& rect': {
        fill: isLight ? Color.e1 : Color.white,
      },
    },
  }));

  const classes = useStyles();

  const handlePlusClick = (e: MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    if (onPlus) {
      onPlus();
    }
  };

  const handleMinusClick = (e: MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    if (onMinus) {
      onMinus();
    }
  };

  return (
    <div
      className={classes.root}
      onClick={(e: MouseEvent<HTMLDivElement>): void => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <div className={classes.controls} onClick={handleMinusClick}>
        <div className={`${classes.control} ${classes.controlLeft}`}>
          <MinusIcon className={classes.icon} />
        </div>
      </div>
      <InputBase type="number" className={classes.input} {...props} />
      <div className={classes.controls} onClick={handlePlusClick}>
        <div className={`${classes.control} ${classes.controlRight}`}>
          <PlusIcon className={classes.icon} />
        </div>
      </div>
    </div>
  );
};

NumberControl.defaultProps = {
  theme: 'light',
};
