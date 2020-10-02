// Core
import React from 'react';
import DateRangeIcon from '@material-ui/icons/DateRange';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';
// Utils
import { Color } from '../../../utils';

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    border: `1px solid ${Color.e1}`,
    borderRadius: 2,
    paddingRight: 5,
    '& *': {
      cursor: 'pointer',
    },
  },
  input: {
    flex: 1,
    position: 'relative',
    backgroundColor: Color.white,
    fontSize: 16,
    padding: '8px 26px 8px 10px',
    '& input': {
      padding: 0,
      height: '100%',
    },
    '&:focus': {
      borderRadius: 2,
      backgroundColor: Color.white,
    },
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    '& svg path': {
      fill: Color.blueGray,
    },
  },
});

export const DatePicker = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <InputBase className={classes.input} readOnly />
      <div className={classes.icon}>
        <DateRangeIcon />
      </div>
    </div>
  );
};
