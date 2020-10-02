// Core
import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// Styles
import styles from './styles.module.scss';
// Hooks
import { useCatalog } from '../../../hooks';
import { Catalog, CatalogQuery } from '../../../store/types/catalog';
import { getQuery, getResultQuery } from '../../../utils';

export const NavMenu: FC = (): ReactElement | null => {
  const { search } = useLocation();
  const { category, getCategoryList } = useCatalog();
  const query = getQuery(search);

  useEffect(() => {
    getCategoryList();
  }, []);

  if (!category?.length) {
    return null;
  }

  const [water, office, food, zoo, cosmetic] = category || [];

  return (
    <nav className={styles.side}>
      <ul className={`${styles.menuMain} container`}>
        {/* WATER */}
        {water && (
          <MenuList
            key={water.id}
            name={water.name}
            menuId={water.id}
            subCategoryList={water.category}
            query={query}
          />
        )}

        {/* OFFICE */}
        {office && (
          <MenuList
            key={office.id}
            name={office.name}
            menuId={office.id}
            subCategoryList={office.category}
            query={query}
          />
        )}

        {/* FOOD */}
        {food && (
          <MenuList
            key={food.id}
            name={food.name}
            menuId={food.id}
            subCategoryList={food.category}
            query={query}
          />
        )}

        {/* ZOO */}
        {zoo && (
          <MenuList
            key={zoo.id}
            name={zoo.name}
            menuId={zoo.id}
            subCategoryList={zoo.category}
            query={query}
          />
        )}

        {/* COSMETIC */}
        {cosmetic && (
          <MenuList
            key={cosmetic.id}
            name={cosmetic.name}
            menuId={cosmetic.id}
            subCategoryList={cosmetic.category}
            query={query}
          />
        )}
      </ul>
    </nav>
  );
};

// ---------------------------------

type MenuListProps = {
  name: string;
  subCategoryList: Catalog[];
  menuId: number;
  query: URLSearchParams;
};

const MenuList: FC<MenuListProps> = ({
  name,
  subCategoryList,
  menuId,
  query,
}: MenuListProps): ReactElement => {
  const [open, setOpen] = useState(false);

  const menuListClassName = cn({
    [styles.menuList]: true,
    [styles.menuListOpen]: open,
  });

  const toggleOpen = (): void => {
    setOpen((prev) => !prev);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <li className={menuListClassName} onClick={toggleOpen}>
        <span>{name}</span>
        <div className={styles.menuDropWrapper}>
          <DropMenu
            query={query}
            subCategoryList={subCategoryList}
            menuId={menuId}
          />
        </div>
      </li>
    </ClickAwayListener>
  );
};

// ---------------------------------

type DropMenuProps = {
  subCategoryList: Catalog[];
  menuId: number | string;
  query: URLSearchParams;
};

const DropMenu: FC<DropMenuProps> = ({
  subCategoryList,
  menuId,
  query,
}: DropMenuProps): ReactElement => {
  return (
    <ul className={`${styles.menuDrop} container`}>
      {subCategoryList.length
        ? subCategoryList
            .sort(
              (a, b) =>
                b.publishedChildCategories.length -
                a.publishedChildCategories.length,
            )
            .map(({ id, name, publishedChildCategories }) => {
              const categorySearch = getResultQuery(
                query,
                {
                  [CatalogQuery.category]: id.toString(),
                },
                [
                  CatalogQuery.subcategory,
                  CatalogQuery.brand,
                  CatalogQuery.priceMin,
                  CatalogQuery.priceMax,
                ],
              );

              return (
                <li key={id} className={styles.Category}>
                  <Link
                    to={{
                      pathname: '/catalog',
                      search: categorySearch.toString(),
                      state: { menuId },
                    }}
                  >
                    {name}
                  </Link>
                  <ul>
                    {publishedChildCategories?.length
                      ? publishedChildCategories.map(
                          ({ id: key, name: subName }) => {
                            const subcategorySearch = getResultQuery(
                              query,
                              {
                                [CatalogQuery.category]: id.toString(),
                                [CatalogQuery.subcategory]: key.toString(),
                              },
                              [
                                CatalogQuery.brand,
                                CatalogQuery.priceMin,
                                CatalogQuery.priceMax,
                              ],
                            );

                            return (
                              <li key={key} className={styles.SubCategory}>
                                <Link
                                  to={{
                                    pathname: '/catalog',
                                    search: subcategorySearch.toString(),
                                    state: { menuId },
                                  }}
                                >
                                  {subName}
                                </Link>
                              </li>
                            );
                          },
                        )
                      : null}
                  </ul>
                </li>
              );
            })
        : null}
    </ul>
  );
};
