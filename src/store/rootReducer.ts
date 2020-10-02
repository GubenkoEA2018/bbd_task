// Core
import { combineReducers } from 'redux';

// Reducers
import {
  modalReducer as modal,
  securityReducer as security,
  userReducer as user,
  catalogReducer as catalog,
  addressReducer as address,
  favoriteReducer as favorite,
  basketReducer as basket,
  orderReducer as order,
  divergenceReducer as divergence,
  bannerReducer as banner,
} from './reducers';

export const rootReducer = combineReducers({
  modal,
  security,
  user,
  catalog,
  address,
  favorite,
  basket,
  order,
  divergence,
  banner,
});

export type AppState = ReturnType<typeof rootReducer>;
