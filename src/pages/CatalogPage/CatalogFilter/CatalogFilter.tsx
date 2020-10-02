// Core
import React, {
  FC,
  ReactElement,
  MouseEvent,
  useState,
  useEffect,
} from 'react';

import { useHistory } from 'react-router-dom';

// Styles
import styles from './CatalogFilter.module.scss';

// Components
import { Checkbox } from '../../../components/ui/Ckeckbox';
import { FilterTitle } from './FilterTitle/FilterTitle';
import { FilterCategories } from './FilterCategories/FilterCategories';
import { FilterPrice } from './FilterPrice';

// types
import {
  Brand,
  CatalogQuery,
  PriceFilter,
  SubCategory,
} from '../../../store/types/catalog';
import { getResultQuery } from '../../../utils';

type CatalogFilterProps = {
  subCategoryList: SubCategory[] | undefined;
  subCategoryActive: string;
  handleSubcategoryChange: (
    subCategory: string,
  ) => (e: MouseEvent<HTMLParagraphElement>) => void;
  menuId: string | number;
  query: URLSearchParams;
  brands: Brand[];
  prices: PriceFilter;
};

export const CatalogFilter: FC<CatalogFilterProps> = ({
  subCategoryList,
  subCategoryActive,
  handleSubcategoryChange,
  menuId,
  query,
  brands,
  prices,
}: CatalogFilterProps): ReactElement => {
  const history = useHistory();
  const [activeBrands, setBrands] = useState<Set<number>>(new Set<number>([]));

  const handleBrandsChange = (id: number): void => {
    setBrands((prev) => {
      const newSet = new Set(Array.from(prev));
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  useEffect(() => {
    let brandSearchStr = '';
    activeBrands.forEach((b) => {
      brandSearchStr += `&${CatalogQuery.brand}=${b}`;
    });
    const queryStr = getResultQuery(query, undefined, [
      CatalogQuery.brand,
    ]).toString();
    history.push(`/catalog?${queryStr}${encodeURI(brandSearchStr)}`, {
      menuId,
    });
  }, [activeBrands]);

  useEffect(() => {
    setBrands(new Set([]));
  }, [subCategoryActive]);

  return (
    <div className={styles.Filter}>
      {/* SubCategory */}
      {subCategoryList && subCategoryList.length ? (
        <FilterTitle title="Категория" />
      ) : null}

      <FilterCategories
        subCategoryActive={subCategoryActive}
        subCategoryList={subCategoryList}
        handleSubcategoryChange={handleSubcategoryChange}
      />

      {/* BRANDS */}
      {brands && brands.length ? (
        <>
          <FilterTitle title="Бренд" />
          {/* <div className={styles.TextFieldWrapper}> */}
          {/*  <TextField placeholder="Найти" /> */}
          {/* </div> */}
          <div className={styles.BrandsWrapper}>
            {brands.map(({ id, name }) => {
              return (
                <div key={id} className={styles.Brand}>
                  <Checkbox
                    label={name}
                    checkboxProps={{
                      onChange: (): void => {
                        handleBrandsChange(id);
                      },
                      checked: activeBrands.has(id),
                    }}
                  />
                </div>
              );
            })}
          </div>
        </>
      ) : null}
      {/* ----------------------------------- */}

      {/* PRICE */}
      <FilterPrice menuId={menuId} query={query} prices={prices} />
    </div>
  );
};
