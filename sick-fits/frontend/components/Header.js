import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import Nav from './Nav';

const Logo = styled.h1`
  background: var(--red);
  font-size: 2rem;
  padding: 0px 20px;
  border-radius: 8px;
  margin: auto;
  a {
    color: white;
    text-decoration: none;
    text-transform: uppercase;
  }
  a:hover {
    color: white;
  }
`;

const HeaderStyles = styled.header`
  margin: 20px;
  .bar {
    display: grid;
    grid-template-columns: auto;
    margin: 20px 0px;
  }
  .sub-bar {
    border-bottom: 1px solid var(--red, black);
  }
`;

const Header = () => (
  <HeaderStyles>
    <div className="bar">
      <Logo>
        <Link href="/">photos bazar 📸</Link>
      </Logo>
    </div>
    <div className="sub-bar">
      <p>search</p>
    </div>
    <Nav />
  </HeaderStyles>
);

export default Header;
