// Core
import { FC, ReactElement, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Other
import { useModalManage } from '../../dialogs/hooks';
import { Modals } from '../../store/types/modal';

export const PrivateRedirect: FC = (): ReactElement | null => {
  const history = useHistory();
  const { open } = useModalManage();
  useEffect(() => {
    open(Modals.Login);
    history.replace('/');
  }, []);

  return null;
};
