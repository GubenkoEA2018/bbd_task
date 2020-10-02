// Core
import { useCallback, useEffect, useState } from 'react';
// Other
import { LocalStorageItem } from '../utils/types';
import { UserDataType } from '../store/types/security';
// Hooks
import { useUser } from './useUser';
import { useSecurity } from './useSecurity';
import { useAddress } from './useAddress';
import { useFavorite } from './useFavorite';
import { useBasket } from './useBasket';
import { useCatalog } from './useCatalog';
import { useBanners } from './useBanners';

type UseInitType = {
  loading: boolean;
  isInit: boolean;
};

export const useInit = (): UseInitType => {
  const [isInit, setIsInit] = useState(false);

  const { getUserData, loading } = useUser();
  const { apikey, initUserAuthData } = useSecurity();
  const { getCities, getTara } = useAddress();
  const { getFavoriteProducts } = useFavorite();
  const { getBasket } = useBasket();
  const { getBestsellers, getPopular } = useCatalog();
  const { getBanners } = useBanners();

  const setupUserAuthData = useCallback((): void => {
    const userJSON = localStorage.getItem(LocalStorageItem.user);
    if (userJSON) {
      const user: UserDataType = JSON.parse(userJSON);
      if (user?.apikey && user?.userId) {
        initUserAuthData(user.userId, user.apikey);
      }
    }
    setIsInit(true);
  }, []);

  useEffect(() => {
    if (apikey) {
      getUserData();
      getFavoriteProducts();
      getTara();
      getBasket();
    }

    setupUserAuthData();
  }, [apikey]);

  useEffect(() => {
    getCities();
    getBestsellers();
    getPopular();
    getBanners();
  }, []);

  return {
    loading,
    isInit,
  };
};
