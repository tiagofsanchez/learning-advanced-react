import React from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';

import Header from './Header';

const GlobalStyles = createGlobalStyle`
html { 
    --red: #d23669; 
    --black: #393939;
    --grey: #3A3A3A; 
    --gray: var(--grey);
    --lightGrey: #e1e1e1; 
    --lightGray: var(--lightGrey);
    --offWhite: #ededed; 
    --maxWidth: 1000px;
    --bs: 0 12px 24px 0 rgba(0,0,0,0.09);
    box-sizing: border-box;
    font-size: 10px;
}
*, *:before, *:after { 
    box-sizing: inherit
}
body { 
    font-family: ---apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding: 0;
    margin: 0; 
    font-size: 1.5rem;
    line-height: 2;
}
a { 
    text-decoration: none; 
    color: var(--black);
}
}
button{ 
    font-family: ''
}
`;

const InnerStyles = styled.div`
  max-width: var(--maxWidth);
  margin: auto;
  padding: 2rem;
`;

const Page = ({ children }) => (
  <div>
    <GlobalStyles />
    <Header />
    <InnerStyles>{children}</InnerStyles>
  </div>
);

export default Page;

Page.propTypes = {
  children: PropTypes.any,
};
