import { CatalogQuery } from '../store/types/catalog';

type GetResultQueryParams = {
  [key in CatalogQuery]?: string;
};

type DeleteParams = Array<keyof GetResultQueryParams>;

export function getQuery(search: string): URLSearchParams {
  return new URLSearchParams(search);
}

export const getResultQuery = (
  query: URLSearchParams,
  params?: GetResultQueryParams,
  deleteParams?: DeleteParams,
): URLSearchParams => {
  const newQuery = query;

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      newQuery.set(key, value as string);
    });
  }

  if (deleteParams) {
    deleteParams.forEach((p) => {
      newQuery.delete(p);
    });
  }

  return newQuery;
};
