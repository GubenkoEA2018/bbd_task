import { ImageProduct } from '../store/types/catalog';
import { baseURL } from '../services/api/config';
import defaultImg from '../assets/images/product-card/default.svg';

export const getImgURL = (imageProduct: ImageProduct): string => {
  if ('imagePath' in imageProduct && 'isAbsolutePath' in imageProduct) {
    if (imageProduct.isAbsolutePath) {
      return imageProduct.imagePath;
    }
    return `${baseURL}${imageProduct.imagePath}`;
  }
  return defaultImg;
};
