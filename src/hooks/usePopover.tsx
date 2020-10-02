import React, {
  useCallback,
  useState,
  memo,
  FC,
  ReactElement,
  MouseEvent,
} from 'react';
import MaterialPopover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';

type UsePopover = {
  Popover: FC;
  handleOpen: (event: MouseEvent) => void;
  handleClose: () => void;
};

const useStyles = makeStyles({
  paper: {
    borderRadius: 0,
  },
});

export function usePopover(settings = {}): UsePopover {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const handleOpen = useCallback((event: MouseEvent) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const Popover: FC = memo(
    ({ children }): ReactElement => {
      return (
        <MaterialPopover
          transitionDuration={0}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          classes={{
            paper: classes.paper,
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          {...settings}
        >
          {children}
        </MaterialPopover>
      );
    },
  );

  return {
    Popover,
    handleOpen,
    handleClose,
  };
}
