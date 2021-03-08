import React from 'react';
import Products from '../components/Products';
import Pagination from '../components/Pagination';

const ProductsPage = () => (
  <>
    <Pagination page={1} />
    <Products />
    <Pagination page={1} />
  </>
);

export default ProductsPage;
