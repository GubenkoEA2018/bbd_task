// Core
import React, { FC, ReactElement, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

// Styles
import styles from './styles.module.scss';

// Components
import { ProductCard } from '../../../components/ProductCard';
import { PageTitle } from '../../../components/PageTitle';

// Types
import { CatalogQuery, PublishedProduct } from '../../../store/types/catalog';
import { getResultQuery } from '../../../utils';

type CatalogListProps = {
  products: PublishedProduct[];
  loading: boolean;
  categoryName: string;
  subcategoryName: string;
  page: number;
  hasMore: boolean;
  getProductList: (
    query: string,
    pushing?: boolean,
  ) => Promise<PublishedProduct[]>;
  query: URLSearchParams;
  changePage: () => void;
  changeHasMore: (more: boolean) => void;
};

export const CatalogList: FC<CatalogListProps> = ({
  products,
  loading,
  categoryName,
  subcategoryName,
  page,
  hasMore,
  getProductList,
  query,
  changePage,
  changeHasMore,
}: CatalogListProps): ReactElement => {
  // eslint-disable-next-line no-shadow
  const fetchProducts = async (page: number): Promise<void> => {
    const newQueryStr = getResultQuery(query, {
      [CatalogQuery.page]: page.toString(),
    }).toString();
    try {
      const newPageProducts = await getProductList(newQueryStr, true);
      if (newPageProducts) {
        changeHasMore(newPageProducts.length > 0);
      } else {
        changeHasMore(false);
      }
    } catch (e) {
      console.log(e);
      changeHasMore(false);
    }
  };

  const observer = useRef<IntersectionObserver>();
  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          changePage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  useEffect(() => {
    if (page > 1) {
      fetchProducts(page);
    }
  }, [page]);

  let content: ReactElement | ReactElement[] | null = <p>Products not found</p>;
  if (products && products.length) {
    content = products.map((product, idx) => {
      const { id } = product;
      if (products.length === idx + 1) {
        return (
          <div ref={lastBookElementRef} key={id}>
            <Link to={`/catalog/${id}`}>
              <ProductCard product={product} />
            </Link>
          </div>
        );
      }
      return (
        <div key={id}>
          <Link to={`/catalog/${id}`}>
            <ProductCard product={product} />
          </Link>
        </div>
      );
    });
  } else if (loading) {
    content = null;
  }

  return (
    <div className={styles.Wrapper}>
      <PageTitle current={categoryName} title={subcategoryName} />

      <div className={styles.CatalogList}>{content}</div>

      {loading && (
        <div className={styles.Loading}>
          <CircularProgress />
        </div>
      )}
    </div>
  );
};
