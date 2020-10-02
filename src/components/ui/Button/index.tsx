// Core
import React, { FC, ReactElement } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MButton, { ButtonProps } from '@material-ui/core/Button';
// Utils
import { Color, styledBy } from '../../../utils';

type Size = 'small' | 'medium' | 'large';

type CustomButtonProps = {
  bgColor?: keyof typeof Color;
  textColor?: keyof typeof Color;
  fontSize?: Size;
  btnSize?: Size;
} & ButtonProps;

const StyledButton = withStyles({
  root: {
    background: (props: CustomButtonProps): string | undefined => {
      if (props.disabled) {
        return Color.e1;
      }
      return styledBy(
        'bgColor',
        Color,
      )({ ...props, bgColor: props.bgColor ?? 'darkRed' });
    },
    borderRadius: 2,
    border: 0,
    padding: styledBy('btnSize', {
      medium: '10px 22px',
      large: '13px 35px',
    }),
    color: (props: CustomButtonProps): string | undefined => {
      if (props.disabled) {
        return '#AFB2B8';
      }
      return styledBy(
        'textColor',
        Color,
      )({ ...props, textColor: props.textColor ?? 'white' });
    },
    '&:hover': {
      backgroundColor: styledBy('bgColor', Color),
    },
  },
  label: {
    textTransform: 'uppercase',
    fontWeight: 500,
    fontSize: styledBy('fontSize', {
      small: '12px',
      medium: '14px',
      large: '16px',
    }),
    letterSpacing: '0.15px',
  },
})(
  ({
    bgColor,
    textColor,
    btnSize,
    fontSize,
    children,
    ...other
  }: CustomButtonProps) => <MButton {...other}>{children}</MButton>,
);

export const Button: FC<CustomButtonProps> = ({
  children,
  ...other
}: CustomButtonProps): ReactElement => (
  <StyledButton size="medium" {...other}>
    {children}
  </StyledButton>
);

Button.defaultProps = {
  btnSize: 'medium',
  bgColor: 'darkRed',
  textColor: 'white',
  fontSize: 'medium',
};
