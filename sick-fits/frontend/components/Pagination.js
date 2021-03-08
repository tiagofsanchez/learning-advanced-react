import Head from 'next/head';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import PaginationStyles from './styles/PaginationStyles';
import ErrorMessage from './ErrorMessage';

const ALL_PRODUCTS_PER_PAGE_QUERY = gql`
  query ALL_PRODUCTS_PER_PAGE_QUERY {
    _allProductsMeta {
      count
    }
  }
`;

const Pagination = ({ page }) => {
  const { data, loading, error } = useQuery(ALL_PRODUCTS_PER_PAGE_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;

  const totalProducts = data._allProductsMeta.count;

  return (
    <PaginationStyles>
      <Head>
        <title>Classified - Page {page} of ___</title>
      </Head>
      <Link href="/"> ⬅ prev</Link>
      <p>Page __ of {totalProducts}</p>
      <p>__ Items total</p>
      <Link href="/"> next ➡ </Link>
    </PaginationStyles>
  );
};

export default Pagination;
