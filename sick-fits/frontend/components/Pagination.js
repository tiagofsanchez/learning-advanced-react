import Head from 'next/head';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import PaginationStyles from './styles/PaginationStyles';
import ErrorMessage from './ErrorMessage';
import { perPage } from '../config';

export const ALL_PRODUCTS_PER_PAGE_QUERY = gql`
  query ALL_PRODUCTS_PER_PAGE_QUERY {
    _allProductsMeta {
      count
    }
  }
`;

// eslint-disable-next-line react/prop-types
const Pagination = ({ page }) => {
  const { data, loading, error } = useQuery(ALL_PRODUCTS_PER_PAGE_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;

  const { count } = data._allProductsMeta;
  const pageCount = Math.ceil(count / perPage);

  return (
    <PaginationStyles>
      <Head>
        <title>
          Classified - Page {page} of {pageCount}
        </title>
      </Head>
      <Link href={`/products/${parseInt(page) - 1}`}>
        <a aria-disabled={page <= 1}>⬅ prev</a>
      </Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <p>{count} items total</p>
      <Link href={`/products/${parseInt(page) + 1}`}>
        <a aria-disabled={page >= pageCount}> next ➡</a>
      </Link>
    </PaginationStyles>
  );
};

export default Pagination;
