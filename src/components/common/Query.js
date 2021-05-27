import PropTypes from 'prop-types';
import { useQuery } from 'react-query';

export const Query = ({ render, queryFn, queryKey, queryOptions = {} }) => {
  const { isLoading, isError, ...rest } = useQuery(queryKey, queryFn, queryOptions);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>Error</h1>;
  }
  return <>{render({ ...rest })}</>;
};

Query.propTypes = {
  queryFn: PropTypes.func.isRequired,
  queryKey: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  queryOptions: PropTypes.object,
  render: PropTypes.func.isRequired,
};
