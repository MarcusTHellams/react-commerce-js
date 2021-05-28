import PropTypes from 'prop-types';
import { Fragment } from 'react';
import BlockUi from 'react-block-ui';
import { useMutation } from 'react-query';
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
import { useCartContext } from '../../context/cartContext';
import { commerce } from '../../lib/commerce';

const mutationFn = async ({ productId, quantity = 1 }) => {
  const { cart } = await commerce.cart.add(productId, quantity);
  return cart;
};

export const ProductsListComponent = ({ products }) => {
  const { setCart } = useCartContext();

  const { mutate, isLoading } = useMutation({
    mutationFn,
    onSuccess: (cart) => {
      setCart(cart);
    },
  });

  const addToCartHandler = async (productId, quantity = 1) => {
    mutate({ productId, quantity });
  };

  return (
    <>
      <BlockUi blocking={isLoading}>
        <div className='row row-cols-1 row-cols-lg-3'>
          {products.map((product) => {
            return (
              <Fragment key={product.id}>
                <Col className='mb-4'>
                  <Card body className='h-100'>
                    <CardImg
                      top
                      src={product?.media?.source}
                      alt={product?.name}
                    />
                    <CardBody>
                      <CardTitle tag='h5'>
                        {product?.name} -{' '}
                        {product?.price?.formatted_with_symbol}
                      </CardTitle>
                      <CardText>
                        {stripHtml(product?.description).result}
                      </CardText>
                      <Button
                        onClick={() => {
                          addToCartHandler(product?.id);
                        }}
                        block
                        color='primary'
                      >
                        Add to Cart
                      </Button>
                    </CardBody>
                  </Card>
                </Col>
              </Fragment>
            );
          })}
        </div>
      </BlockUi>
    </>
  );
};

ProductsListComponent.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};
