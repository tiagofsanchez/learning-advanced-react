import React from 'react';
import CreateProduct from '../components/CreateProduct';
import IsUserSignIn from '../components/IsUserSignIn';

const SellPage = () => (
  <>
    <IsUserSignIn>
      <CreateProduct />
    </IsUserSignIn>
  </>
);

export default SellPage;
