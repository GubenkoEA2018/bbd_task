// Core
import React, { FC, ReactElement } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MatCheckbox, { CheckboxProps } from '@material-ui/core/Checkbox';
// Utils
import { Color } from '../../../utils';

type CheckboxPropsType = {
  label?: string;
  checkboxProps: CheckboxProps;
};

const useStyles = makeStyles({
  root: {
    fontSize: 12,
    height: 30,
    color: Color.darkBlue,
    maxWidth: '100%',
  },
  label: {
    maxWidth: '160px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    msTextOverflow: 'ellipsis',
  },
});

const GreenCheckbox = withStyles({
  root: {
    color: Color.e1,
    '&$checked': {
      color: Color.darkRed,
    },
  },
  checked: {},
})((props) => <MatCheckbox color="default" {...props} />);

export const Checkbox: FC<CheckboxPropsType> = ({
  label,
  checkboxProps,
}: CheckboxPropsType): ReactElement => {
  const classes = useStyles();

  return (
    <FormControlLabel
      classes={{
        root: classes.root,
        label: classes.label,
      }}
      label={label}
      control={<GreenCheckbox {...checkboxProps} />}
    />
  );
};
