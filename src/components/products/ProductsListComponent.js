import PropTypes from 'prop-types';
import { Fragment } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button,
  Col,
} from 'reactstrap';
import { stripHtml } from 'string-strip-html';

export const ProductsListComponent = ({ products }) => {
  console.log('products: ', products);
  return (
    <>
      <div className='row row-cols-1 row-cols-lg-6'>
        {products.map((product) => {
          return (
            <Fragment key={product.id}>
              <Col className='mb-4'>
                <Card className="h-100">
                  <CardImg
                    top
                    width='100%'
                    src={product?.media?.source}
                    alt={product?.name}
                  />
                  <CardBody>
                    <CardTitle tag='h5'>{product?.name}</CardTitle>
                    <CardText>
                      {stripHtml(product?.description).result}
                    </CardText>
                    <Button>Button</Button>
                  </CardBody>
                </Card>
              </Col>
            </Fragment>
          );
        })}
      </div>
    </>
  );
};

ProductsListComponent.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};
