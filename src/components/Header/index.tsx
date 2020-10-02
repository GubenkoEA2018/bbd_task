// Core
import React, { FC, ReactElement } from 'react';
import Sticky from 'react-sticky-el';
import { makeStyles } from '@material-ui/core/styles';

// Components
import { TopMenu } from './TopMenu';
import { CenterMenu } from './CenterMenu/CenterMenu';
import { NavMenu } from './NavMenu';

const useStyles = makeStyles({
  header: {
    zIndex: 1299,
    position: 'relative',
  },
});

export const Header: FC = (): ReactElement => {
  const classes = useStyles();

  return (
    <header>
      <TopMenu />
      <CenterMenu />
      <Sticky className={classes.header}>
        <NavMenu />
      </Sticky>
    </header>
  );
};
