import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

// eslint-disable-next-line react/prop-types
const ResetPage = ({ query }) => {
  if (!query?.token) {
    return (
      <div>
        <p>Sorry you must supply a token</p>
        <RequestReset />
      </div>
    );
  }
  return (
    <div>
      <Reset token={query.token} />
    </div>
  );
};

export default ResetPage;
