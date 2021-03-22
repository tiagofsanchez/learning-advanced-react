import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';

const Dot = styled.div`
  background-color: var(--red);
  padding: 5px;
  color: white;
  border-radius: 50%;
  line-height: 2rem;
  min-width: 3rem;
  margin-left: 1rem;
  font-feature-settings: tnum;
  font-variant-numeric: tabular-nums;
`;

const CartCount = ({ count }) => (
  <TransitionGroup>
    <CSSTransition
      unmountOnExit
      classNames="count"
      key={count}
      timeout={{ enter: 5000, exit: 5000 }}
    >
      <Dot>{count}</Dot>
    </CSSTransition>
  </TransitionGroup>
);

export default CartCount;
