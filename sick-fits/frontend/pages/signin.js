import styled from 'styled-components';
import RequestReset from '../components/RequestReset';
import SingIn from '../components/SingIn';
import SingUp from '../components/SingUp';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: 20px;
`;

const SingInPage = () => (
  <Grid>
    <SingIn />
    <SingUp />
    <RequestReset />
  </Grid>
);
export default SingInPage;
