// Core
import React, { FC, ReactElement, MouseEvent } from 'react';
import MatBackdrop, { BackdropProps } from '@material-ui/core/Backdrop';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    backdrop: {
      zIndex: 10000,
      color: '#fff',
      backgroundColor: 'transparent',
      opacity: 0,
    },
  }),
);

export const Backdrop: FC<BackdropProps> = ({
  open,
}: BackdropProps): ReactElement => {
  const classes = useStyles();

  const handleClick = (e: MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <MatBackdrop
      className={classes.backdrop}
      open={open}
      onClick={handleClick}
    />
  );
};
