// Core
import React, { FC, ReactElement, ReactNode } from 'react';
import { Link } from 'react-router-dom';
// Styles
import styles from './styles.module.scss';
// Components
import { Button } from '../../../../ui/Button';
import { ProductCard } from '../../../../ProductCard';
// Hooks
import { useSecurity, useFavorite } from '../../../../../hooks';
import { useModalManage } from '../../../../../dialogs/hooks';

// Types
import { Modals } from '../../../../../store/types/modal';

type FavouritePopoverProps = {
  onClose(): void;
};

export const FavouritePopover: FC<FavouritePopoverProps> = ({
  onClose,
}: FavouritePopoverProps): ReactElement => {
  const { open } = useModalManage();
  const { apikey, userId } = useSecurity();
  const { favorites } = useFavorite();

  let content: ReactNode = (
    <p>
      Просмотр избранных товаров доступен только авторизованным пользователям
    </p>
  );

  if (apikey !== null && userId !== null) {
    if (favorites && favorites.length) {
      content = favorites.map(({ id, product }) => {
        if (!product) {
          return null;
        }
        return (
          <Link to={`/catalog/${product.id}`} key={id} onClick={onClose}>
            <ProductCard product={product} small />
          </Link>
        );
      });
    } else {
      content = <p>Нет избранных товаров</p>;
    }
  }

  const handleLoginButtonClick = (): void => {
    open(Modals.Login);
    onClose();
  };

  return (
    <div className={styles.Wrapper}>
      <div className={styles.Top}>{content}</div>
      <div className={styles.Bottom}>
        {apikey !== null && userId !== null ? (
          <Link to="/favorite">
            <Button fullWidth bgColor="darkBlue" onClick={onClose}>
              Все избранные товары
            </Button>
          </Link>
        ) : (
          <Button fullWidth bgColor="darkBlue" onClick={handleLoginButtonClick}>
            вход
          </Button>
        )}
      </div>
    </div>
  );
};
