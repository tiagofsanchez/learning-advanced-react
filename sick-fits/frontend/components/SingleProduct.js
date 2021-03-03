import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ErrorMessage from './ErrorMessage';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      description
      id
      photo {
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductStyles = styled.div`
  display: grid;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  gap: 2rem;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

const SingleProduct = ({ id }) => {
  const { data, error, loading } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;
  const { Product } = data;
  return (
    <ProductStyles>
      <Head>
        <title>{Product.name}</title>
      </Head>
      <img
        src={Product.photo.image.publicUrlTransformed}
        alt={Product.photo.altText}
      />
      <div className="details">
        <h2>{Product.name}</h2>
        <p>{Product.description}</p>
      </div>
    </ProductStyles>
  );
};

SingleProduct.propTypes = {
  id: PropTypes.string,
};

export default SingleProduct;
