// Core
import React, {
  FC,
  ReactElement,
  useEffect,
  MouseEvent,
  useState,
} from 'react';
import { useLocation, useHistory } from 'react-router-dom';

// Styles
import styles from './styles.module.scss';

// Components
import { CatalogFilter } from './CatalogFilter/CatalogFilter';
import { CatalogList } from './CatalogList';
import { Backdrop } from '../../components/ui/Backdrop';

// Hooks
import { useSetPageTitle, useCatalog } from '../../hooks';

// Utils
import { getQuery, getResultQuery } from '../../utils';
import { CatalogQuery } from '../../store/types/catalog';
import { PageTitleEnum } from '../../utils/types';

export type LocationType = {
  menuId: number | string;
};

const CatalogPage: FC = (): ReactElement => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const history = useHistory();
  const { state, search } = useLocation<LocationType>();
  useSetPageTitle(PageTitleEnum.CatalogPage);
  const {
    loading,
    products,
    category,
    getProductList,
    brands,
    prices,
    clearProductList,
  } = useCatalog();

  const query = getQuery(search);
  const { menuId } = state || { menuId: 1 };
  const categoryList = category?.find((cat) => cat.id === menuId)?.category;
  const currentCategory = categoryList?.find(
    (cat) => cat.id.toString() === query.get(CatalogQuery.category),
  );
  const subCategoryList = currentCategory?.publishedChildCategories;

  const subCategoryId = query.get(CatalogQuery.subcategory) || '';
  const currentSubcategory = subCategoryList?.find(
    (sc) => sc.id.toString() === subCategoryId,
  );

  // Functions
  const handleSubcategoryChange = (subCategory: string) => (
    e: MouseEvent<HTMLParagraphElement>,
  ): void => {
    e.preventDefault();
    e.stopPropagation();

    const newQuery = getResultQuery(
      query,
      {
        [CatalogQuery.subcategory]: subCategory,
      },
      [CatalogQuery.brand, CatalogQuery.priceMin, CatalogQuery.priceMax],
    );
    history.push(`/catalog?${newQuery.toString()}`, { menuId });
  };

  const handlePageChange = (): void => {
    setPage((prev) => prev + 1);
  };

  const handleHasMore = (more: boolean): void => {
    setHasMore(more);
  };

  useEffect(() => {
    clearProductList();
    setHasMore(true);
    setPage(1);
    getProductList(query.toString());
  }, [search]);

  return (
    <>
      <div className={styles.PageWrapper}>
        <div className={`container ${styles.Catalog}`}>
          <CatalogFilter
            subCategoryActive={subCategoryId}
            subCategoryList={subCategoryList}
            handleSubcategoryChange={handleSubcategoryChange}
            menuId={menuId}
            query={query}
            brands={brands}
            prices={prices}
          />

          <CatalogList
            categoryName={currentCategory?.name || ''}
            subcategoryName={currentSubcategory?.name || ''}
            loading={loading}
            products={products}
            page={page}
            hasMore={hasMore}
            getProductList={getProductList}
            query={query}
            changePage={handlePageChange}
            changeHasMore={handleHasMore}
          />
        </div>
      </div>

      <Backdrop open={Boolean(loading)} />
    </>
  );
};

export default CatalogPage;
