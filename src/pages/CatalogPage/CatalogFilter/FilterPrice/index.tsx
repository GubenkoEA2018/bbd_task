// Core
import React, {
  useState,
  useEffect,
  FC,
  ReactElement,
  ChangeEvent,
  MouseEvent,
  FocusEvent,
  useRef,
  RefObject,
} from 'react';
import { useHistory } from 'react-router-dom';
import debounce from 'lodash.debounce';

// Styles
import styles from './styles.module.scss';
import { PriceInput } from '../../../../components/ui/PriceInput';
import { RangePicker } from '../../../../components/ui/RangePicker';
import { getResultQuery } from '../../../../utils';
import { CatalogQuery, PriceFilter } from '../../../../store/types/catalog';
import { FilterTitle } from '../FilterTitle/FilterTitle';

type FilterPriceProps = {
  menuId: string | number;
  query: URLSearchParams;
  prices: PriceFilter;
};

export const FilterPrice: FC<FilterPriceProps> = ({
  menuId,
  query,
  prices,
}: FilterPriceProps): ReactElement => {
  const history = useHistory();
  const initialPrice = [prices.minPrice, prices.maxPrice];
  const [[min, max], setPrice] = useState<number[] | string[]>([
    prices.minPrice.toString(),
    prices.maxPrice.toString(),
  ]);

  const minRef = useRef<HTMLInputElement>(null);
  const maxRef = useRef<HTMLInputElement>(null);

  const makeRequestWithPrice = useRef(
    debounce((
      minPrice: number,
      maxPrice: number,
      currentQuery: URLSearchParams,
      // eslint-disable-next-line no-shadow
      menuId: string | number,
    ) => {
      const newQuery = getResultQuery(currentQuery, {
        [CatalogQuery.priceMin]: (minPrice * 100).toString(),
        [CatalogQuery.priceMax]: (maxPrice * 100).toString(),
      });

      history.push(`/catalog?${newQuery.toString()}`, { menuId });
    }, 500),
  ).current;

  const handleRangeChange = (event: any, value: number | number[]): void => {
    setPrice(value as number[] | string[]);
    // eslint-disable-next-line no-shadow
    const [min, max] = value as number[];
    makeRequestWithPrice(min, max, query, menuId);
  };

  const handlePriceInputChange = (
    e: ChangeEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>,
  ): void => {
    let { value } = e.target || {};
    const { name } = e.target || {};

    if (value === '') {
      value = '0';
    }

    if (+value > 0) {
      value = value.replace(/^0+/, '');
    }

    if (name === undefined || value === undefined) {
      return;
    }

    if (name === 'min') {
      if (+value >= +max) {
        value = (+max).toString();
      }

      if (+value <= prices.minPrice) {
        value = prices.minPrice.toString();
      }

      setPrice((prev) => {
        if (
          (minRef as RefObject<HTMLInputElement>) !== null &&
          minRef.current
        ) {
          minRef.current.value = value.toString();
        }
        makeRequestWithPrice(+value, +prev[1], query, menuId);
        return [value, prev[1].toString()];
      });
    }
    if (name === 'max') {
      if (+value >= prices.maxPrice) {
        value = prices.maxPrice.toString();
      }

      if (+value <= +min) {
        value = (+min).toString();
      }

      setPrice((prev) => {
        if (
          (maxRef as RefObject<HTMLInputElement>) !== null &&
          maxRef.current
        ) {
          maxRef.current.value = value.toString();
        }
        makeRequestWithPrice(+prev[0], +value, query, menuId);
        return [prev[0].toString(), value];
      });
    }
  };

  const resetPriceFilter = (e: MouseEvent<HTMLParagraphElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setPrice((_) => {
      makeRequestWithPrice(prices.minPrice, prices.maxPrice, query, menuId);
      return initialPrice;
    });
  };

  useEffect(() => {
    setPrice([prices.minPrice.toString(), prices.maxPrice.toString()]);
  }, [prices.minPrice, prices.maxPrice]);

  useEffect(() => {
    if ((minRef as RefObject<HTMLInputElement>) !== null && minRef.current) {
      minRef.current.value = min.toString();
    }

    if ((maxRef as RefObject<HTMLInputElement>) !== null && maxRef.current) {
      maxRef.current.value = max.toString();
    }
  }, [min, max]);

  return (
    <>
      <FilterTitle onClick={resetPriceFilter} title="Цена" label="Сбросить" />

      <div className={styles.PriceFieldsWrapper}>
        <div className={styles.PriceField}>
          <PriceInput
            name="min"
            rangeLabel="From"
            onBlur={
              handlePriceInputChange as (
                e: FocusEvent<HTMLInputElement>,
              ) => void
            }
            inputRef={minRef}
          />
        </div>
        <div className={styles.PriceField}>
          <PriceInput
            name="max"
            rangeLabel="to"
            onBlur={
              handlePriceInputChange as (
                e: FocusEvent<HTMLInputElement>,
              ) => void
            }
            inputRef={maxRef}
          />
        </div>
      </div>
      <div className={styles.PriceRangeWrapper}>
        <RangePicker
          onChange={handleRangeChange}
          min={+initialPrice[0]}
          max={+initialPrice[1]}
          value={[+min, +max]}
          step={10}
        />
      </div>
    </>
  );
};
