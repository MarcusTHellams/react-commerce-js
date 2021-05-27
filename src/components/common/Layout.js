import { Container } from 'reactstrap';
import PropTypes from 'prop-types';

export const Layout = ({ children, className = '', ...containerProps }) => {
  const _className = `mt-5${className.length ? ` ${className}` : ''}`;
  return (
    <>
      <Container className={_className} {...containerProps}>
        {children}
      </Container>
    </>
  );
};

Layout.propTypes = {
  className: PropTypes.string,
};
