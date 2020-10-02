import React, { FC, ReactElement, ReactNode } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { useSecurity } from '../../hooks';
import { PrivateRedirect } from './PrivateRedirect';

export const PrivateRoute: FC<RouteProps> = ({
  children,
  ...rest
}: RouteProps): ReactElement => {
  const { apikey, userId } = useSecurity();

  return (
    <Route
      {...rest}
      render={(): ReactNode =>
        apikey !== null && userId !== null ? children : <PrivateRedirect />
      }
    />
  );
};
