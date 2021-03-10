import styled from 'styled-components';

const NavStyles = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-self: end;
  font-size: 2rem;
  justify-self: end;
  a,
  button {
    padding: 1rem 3rem;
    display: flex;
    align-items: center;
    position: relative;
    text-transform: uppercase;
    font-weight: 900;
    font-size: 1em;
    cursor: pointer;
    @media (max-width: 700px) {
      width: 100%;
      font-size: 10px;
      padding: 0 10px;
    }
    &:hover,
    &:focus {
      outline: none;
    }
  }
  @media (max-width: 1300px) {
    font-size: 1.5rem;
  }
`;

export default NavStyles;
