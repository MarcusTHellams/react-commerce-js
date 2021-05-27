import PropTypes from "prop-types";
import { Fragment } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button,
  Col,
} from "reactstrap";
import { stripHtml } from "string-strip-html";
import { useCartContext } from "../../context/cartContext";
import { commerce } from "../../lib/commerce";

export const ProductsListComponent = ({ products }) => {
  console.log("products: ", products[0]);
  const { cart, setCart } = useCartContext();
  console.log('cart: ', cart);

  const addToCartHandler = async (productId, quantity = 1) => {
    try {
      const { cart } = await commerce.cart.add(productId, quantity);
      setCart(cart);
    } catch (error) {
      console.log("There was a problem adding the item to the cart", error);
    }
  };

  return (
    <>
      <div className="row row-cols-1 row-cols-lg-3">
        {products.map((product) => {
          return (
            <Fragment key={product.id}>
              <Col className="mb-4">
                <Card body className="h-100">
                  <CardImg
                    top
                    src={product?.media?.source}
                    alt={product?.name}
                  />
                  <CardBody>
                    <CardTitle tag="h5">
                      {product?.name} - {product?.price?.formatted_with_symbol}
                    </CardTitle>
                    <CardText>
                      {stripHtml(product?.description).result}
                    </CardText>
                    <Button
                      onClick={() => {
                        addToCartHandler(product?.id);
                      }}
                      block
                      color="primary"
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
    </>
  );
};

ProductsListComponent.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};
