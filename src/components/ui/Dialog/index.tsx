// Core
import React, { FC, ReactElement, MouseEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MatDialog, { DialogProps } from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '20px 25px',
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    color: theme.palette.grey[500],
  },
}));

export const Dialog: FC<DialogProps> = (props: DialogProps): ReactElement => {
  const classes = useStyles();

  const { children, onClose } = props;

  const handleClose = (event: MouseEvent<HTMLDivElement>): void => {
    event.preventDefault();
    if (onClose) {
      onClose(event, 'backdropClick');
    }
  };

  return (
    <MatDialog classes={{ paper: classes.paper }} {...props}>
      <div>
        <div onClick={handleClose}>
          <IconButton aria-label="close" className={classes.closeButton}>
            <CloseIcon />
          </IconButton>
        </div>
        <div>{children}</div>
      </div>
    </MatDialog>
  );
};
