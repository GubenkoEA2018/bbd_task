import React, { memo, FC, ReactElement, MouseEvent } from 'react';
import cn from 'classnames';
import styles from './FilterCategories.module.scss';
import { SubCategory } from '../../../../store/types/catalog';

type FilterCategoriesProps = {
  subCategoryList: SubCategory[] | undefined;
  subCategoryActive: string;
  handleSubcategoryChange: (
    subCategory: string,
  ) => (e: MouseEvent<HTMLParagraphElement>) => void;
};

type FilterCategoryProps = {
  name: string;
  isActive: boolean;
  onClick: (e: MouseEvent<HTMLParagraphElement>) => void;
};

export const FilterCategories: FC<FilterCategoriesProps> = memo(
  ({
    subCategoryList,
    subCategoryActive,
    handleSubcategoryChange,
  }: FilterCategoriesProps): ReactElement | null => {
    if (!subCategoryList || !subCategoryList.length) {
      return null;
    }

    return (
      <div className={styles.CategoryWrapper}>
        {subCategoryList.map(({ id, name }) => (
          <FilterCategory
            key={id}
            name={name}
            isActive={id.toString() === subCategoryActive}
            onClick={handleSubcategoryChange(id.toString())}
          />
        ))}
      </div>
    );
  },
);

const FilterCategory: FC<FilterCategoryProps> = ({
  name,
  isActive,
  onClick,
}: FilterCategoryProps): ReactElement => {
  const className = cn({
    [styles.Category]: true,
    [styles.CategoryRed]: isActive,
  });

  return (
    <p className={className} onClick={onClick}>
      {name}
    </p>
  );
};
