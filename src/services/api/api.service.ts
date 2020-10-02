// Core
import { AxiosInstance } from 'axios';

// Other
import { http as httpInstance } from './config';
import { ApiDivergenceInterface, ApiDivergence } from './entity/divergence';
import { ApiOrderInterface, ApiOrder } from './entity/order';
import { ApiAddress, ApiAddressInterface } from './entity/address';
import { ApiBasket, ApiBasketInterface } from './entity/basket';
import { ApiFavorite, ApiFavoriteInterface } from './entity/favorite';
import { ApiSecurity, ApiSecurityInterface } from './entity/security';
import { ApiUser, ApiUserInterface } from './entity/user';
import { ApiCategories, ApiCategoriesInterface } from './entity/categories';
import { ApiRefill, ApiRefillInterface } from './entity/refill';
import { ApiSearch, ApiSearchInterface } from './entity/search';
import { ApiBanners, ApiBannersInterface } from './entity/banners';

interface ApiServiceInterface {
  divergence: ApiDivergenceInterface;
  order: ApiOrderInterface;
  address: ApiAddressInterface;
  basket: ApiBasketInterface;
  favorite: ApiFavoriteInterface;
  security: ApiSecurityInterface;
  user: ApiUserInterface;
  categories: ApiCategoriesInterface;
  refill: ApiRefillInterface;
  search: ApiSearchInterface;
  banners: ApiBannersInterface;
}

class ApiService implements ApiServiceInterface {
  http: AxiosInstance;

  divergence: ApiDivergence;

  order: ApiOrder;

  address: ApiAddress;

  basket: ApiBasket;

  favorite: ApiFavorite;

  security: ApiSecurity;

  user: ApiUser;

  categories: ApiCategories;

  refill: ApiRefill;

  search: ApiSearch;

  banners: ApiBanners;

  constructor(http: AxiosInstance) {
    this.http = http;
    this.divergence = new ApiDivergence(this.http);
    this.order = new ApiOrder(this.http);
    this.address = new ApiAddress(this.http);
    this.basket = new ApiBasket(this.http);
    this.favorite = new ApiFavorite(this.http);
    this.security = new ApiSecurity(this.http);
    this.user = new ApiUser(this.http);
    this.categories = new ApiCategories(this.http);
    this.refill = new ApiRefill(this.http);
    this.search = new ApiSearch(this.http);
    this.banners = new ApiBanners(this.http);
  }
}

export const api = new ApiService(httpInstance);
