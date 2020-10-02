// Core
import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputBase, { InputBaseProps } from '@material-ui/core/InputBase';
// Utils
import { Color } from '../../../utils';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    minWidth: 200,
    width: '100%',
    height: 32,
    boxSizing: 'border-box',
  },
  input: {
    fontSize: 12,
    flex: 1,
    display: 'flex',
    '& input': {
      padding: '7.5px 10px',
      flex: 1,
      border: `1.5px solid ${Color.e1}`,
      borderRadius: 2,
      '&:focus': {
        borderColor: Color.darkBlue,
      },
    },
    '& input::placeholder': {
      color: Color.blueGray,
    },
  },
}));

export const TextField = memo((props: InputBaseProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <InputBase {...props} className={classes.input} />
    </div>
  );
});
