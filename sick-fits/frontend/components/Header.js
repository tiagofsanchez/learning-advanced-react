import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import Nav from './Nav';
import Cart from './Cart';
import Search from './Search';

const Logo = styled.h1`
  font-size: 3rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  background: var(--red);
  transform: skew(-7deg);
  a {
    color: white;
    text-decoration: none;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
  }
  @media (max-width: 700px) {
    font-size: 20px;
    padding: 0 10px;
  }
`;

const HeaderStyles = styled.header`
  .bar {
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
  }
  .sub-bar {
    margin: 0px 20px;
  }
`;

const Header = () => (
  <HeaderStyles>
    <div className="bar">
      <Logo>
        <Link href="/">Classified</Link>
      </Logo>
      <Nav />
    </div>
    <div className="sub-bar">
      <Search />
    </div>
    <Cart />
  </HeaderStyles>
);

export default Header;
