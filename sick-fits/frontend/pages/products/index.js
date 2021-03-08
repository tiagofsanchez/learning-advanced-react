import React from 'react';
import { useRouter } from 'next/dist/client/router';
import Products from '../../components/Products';
import Pagination from '../../components/Pagination';

const ProductsPage = () => {
  const router = useRouter();
  const { page } = router.query;
  return (
    <>
      <Pagination page={page || 1} />
      <Products page={page || 1} />
      <Pagination page={page || 1} />
    </>
  );
};

export default ProductsPage;
