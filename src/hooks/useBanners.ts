// Core
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Instruments
import { AppState } from '../store/rootReducer';
import { BannerState } from '../store/reducers/bannerReducer';

// Services
import { api } from '../services/api';
import { RequestState, useRequestState } from './useRequestState';
import { fillBanner, fillBanners } from '../store/actions/bannerActions';

type UseBanners = {
  getBanners(): Promise<void>;
  getBanner(id: string): Promise<void>;
} & RequestState &
  BannerState;

export const useBanners = (): UseBanners => {
  const {
    loading,
    startRequest,
    stopRequest,
    setErrorMessage,
  } = useRequestState();

  const dispatch = useDispatch();
  const { banners, banner } = useSelector(
    (state: AppState): BannerState => state.banner,
  );

  useEffect(() => {
    return (): void => {
      dispatch(fillBanner(null));
    };
  }, []);

  const getBanners = useCallback(async () => {
    startRequest();
    try {
      // eslint-disable-next-line no-shadow
      const banners = await api.banners.getBanners();
      dispatch(fillBanners(banners));
    } catch (e) {
      setErrorMessage(e);
    } finally {
      stopRequest();
    }
  }, [dispatch]);

  const getBanner = useCallback(
    async (id: string) => {
      startRequest();
      try {
        // eslint-disable-next-line no-shadow
        const banner = await api.banners.getBanner(id);
        dispatch(fillBanner(banner));
      } catch (e) {
        setErrorMessage(e);
      } finally {
        stopRequest();
      }
    },
    [dispatch],
  );

  return {
    loading,
    banners,
    banner,
    getBanners,
    getBanner,
  };
};
