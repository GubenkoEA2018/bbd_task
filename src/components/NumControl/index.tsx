import React, {
  ChangeEvent,
  FC,
  FocusEvent,
  KeyboardEvent,
  ReactElement,
  RefObject,
  useEffect,
  useRef,
} from 'react';
import { NumberControl } from '../ui/NumberControl';
import { BasketPositionCreate } from '../../store/types/basket';
import { PublishedProduct } from '../../store/types/catalog';

type NumControlProps = {
  amount: number;
  onPlus: () => void;
  onMinus: () => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  theme: 'dark' | 'light';
};

export const NumControl: FC<NumControlProps> = ({
  amount,
  onPlus,
  onMinus,
  onBlur,
  theme,
}: NumControlProps): ReactElement => {
  const numControlRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (
      (numControlRef as RefObject<HTMLInputElement>) !== null &&
      numControlRef.current &&
      amount !== undefined
    ) {
      numControlRef.current.value = amount.toString();
    }
  }, [amount]);

  const handleKeyPress = (event: KeyboardEvent): void => {
    if (
      event.key === 'Enter' &&
      (numControlRef as RefObject<HTMLInputElement>) !== null &&
      numControlRef.current
    ) {
      numControlRef.current.blur();
    }
  };

  return (
    <NumberControl
      theme={theme}
      onBlur={onBlur}
      inputRef={numControlRef}
      onPlus={onPlus}
      onMinus={onMinus}
      onKeyPress={handleKeyPress}
    />
  );
};

// ---------- handler -------------------
type HandleNumberControlChangeProps = {
  amount: number;
  remainsOnStock: number;
  positionId: number;
  positionPriceId: number;
  openDeleteModal(id: number): void;
  addToBasket(position: BasketPositionCreate): Promise<void>;
};

export const handleNumberControlChange = ({
  amount,
  remainsOnStock,
  positionId,
  positionPriceId,
  openDeleteModal,
  addToBasket,
}: HandleNumberControlChangeProps) => (
  e: ChangeEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>,
): void => {
  let { value } = e.target || {};

  if (amount === undefined) {
    return undefined;
  }

  if (value === undefined) {
    e.target.value = amount.toString();
    return undefined;
  }

  if (value === '' || +value < 0) {
    value = '0';
  }

  if (+value > 0) {
    value = value.replace(/^0+/, '');
  }

  if (+value > remainsOnStock) {
    value = remainsOnStock.toString();
  }

  if (+value === 0) {
    openDeleteModal(positionId as number);
    e.target.value = amount.toString();
    return undefined;
  }

  if (+value === amount) {
    e.target.value = amount.toString();
    return undefined;
  }

  addToBasket({
    amount: +value,
    priceId: positionPriceId as number,
  });
  return undefined;
};

type HandleAddProductInBasketProps = {
  priceId: number | undefined;
  amount: number;
  remainsOnStock: number;
  product: PublishedProduct;
  addOne(
    position: BasketPositionCreate,
    leftInStock: number,
    product: PublishedProduct,
  ): Promise<void>;
};

export const handleAddProductInBasket = ({
  priceId,
  amount,
  remainsOnStock,
  product,
  addOne,
}: HandleAddProductInBasketProps): void => {
  if (priceId !== undefined) {
    addOne({ amount, priceId }, remainsOnStock, product);
  }
};
