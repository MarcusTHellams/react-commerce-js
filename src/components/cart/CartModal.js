import PropTypes from 'prop-types';
import { Fragment, useCallback } from 'react';
import BlockUi from 'react-block-ui';
import { useMutation } from 'react-query';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Media,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
  Row,
  Col,
  Table,
  Alert,
} from 'reactstrap';
import { useCartContext } from '../../context/cartContext';
import useDynamicRefs from '../../hooks/useDynamicRefs';
import { commerce } from '../../lib/commerce';

const mutationFn = async ({ lineItemId, quantity }) => {
  const { cart } = await commerce.cart.update(lineItemId, { quantity });
  return cart;
};

const removeMutationFn = async ({ lineItemId }) => {
  const { cart } = await commerce.cart.remove(lineItemId);
  return cart;
};

const emptyMutationFn = async () => {
  const { cart } = await commerce.cart.empty();
  return cart;
};

export const CartModal = ({ line_items, ...modalProps }) => {
  const { cart, setCart } = useCartContext();

  const onSuccess = useCallback(
    (cart) => {
      setCart(cart);
    },
    [setCart]
  );

  const { mutate, isLoading } = useMutation({
    mutationKey: 'updateCart',
    mutationFn,
    onSuccess,
  });

  const removeFromCart = useMutation({
    mutationKey: 'removeFromCart',
    mutationFn: removeMutationFn,
    onSuccess,
  });

  const emptyCart = useMutation({
    mutationKey: 'emptyCart',
    mutationFn: emptyMutationFn,
    onSuccess: (cart) => {
      onSuccess(cart);
      modalProps.toggle();
    },
  });

  const removeFromCartHandler = (lineItemId) => {
    removeFromCart.mutate({ lineItemId });
  };

  const emptyCartHandler = () => {
    emptyCart.mutate();
  };

  const { getRef, setRef } = useDynamicRefs();

  const addSubtractHandler = (e) => {
    const {
      dataset: { trigger, action },
    } = e.target;
    const input = getRef(trigger).current;
    if (action === 'add') {
      input.value = +input.value + 1;
    } else {
      input.value = +input.value - 1;
    }
    mutate({ lineItemId: trigger, quantity: input.value });
  };

  return (
    <>
      <Modal {...modalProps}>
        <BlockUi
          blocking={
            isLoading || removeFromCart.isLoading || emptyCart.isLoading
          }
        >
          <ModalHeader toggle={modalProps.toggle}>
            Your Shopping Cart
          </ModalHeader>

          <ModalBody>
            {!!line_items &&
              line_items?.map((item) => {
                return (
                  <Fragment key={item?.id}>
                    <Media className='mb-4'>
                      <Media left href='#'>
                        <Media
                          className='mr-3'
                          object
                          style={{ maxWidth: '4.6875rem' }}
                          src={item?.media?.source}
                          alt={item?.name}
                        />
                      </Media>
                      <Media body>
                        <Media heading>{item?.name}</Media>
                        <Row>
                          <Col sm={5}>
                            <InputGroup size='sm'>
                              <InputGroupAddon addonType='prepend'>
                                <Button
                                  color='primary'
                                  outline
                                  onClick={addSubtractHandler}
                                  data-trigger={item?.id}
                                  data-action='minus'
                                >
                                  -
                                </Button>
                              </InputGroupAddon>
                              <Input
                                className='text-center'
                                plaintext
                                readOnly
                                innerRef={setRef(item?.id)}
                                defaultValue={item?.quantity}
                              />
                              <InputGroupAddon addonType='append'>
                                <Button
                                  color='primary'
                                  outline
                                  onClick={addSubtractHandler}
                                  data-trigger={item?.id}
                                  data-action='add'
                                >
                                  +
                                </Button>
                              </InputGroupAddon>
                            </InputGroup>
                            <p className='mt-2'>
                              {item?.line_total?.formatted_with_symbol}
                            </p>
                          </Col>
                          <Col className='text-right'>
                            <Button
                              onClick={removeFromCartHandler.bind(
                                this,
                                item?.id
                              )}
                              outline
                              color='danger'
                            >
                              Remove
                            </Button>
                          </Col>
                        </Row>
                      </Media>
                    </Media>
                  </Fragment>
                );
              })}

            {!line_items.length && (
              <Alert color='primary'>You have no items in your cart!</Alert>
            )}
          </ModalBody>
          <ModalFooter className='justify-content-start'>
            <Table borderless>
              <thead>
                <tr>
                  <td>Subtotal: </td>
                  <td className='text-right'>
                    {cart?.subtotal?.formatted_with_symbol}
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Button
                      disabled={!line_items?.length}
                      onClick={emptyCartHandler}
                      color='danger'
                      outline
                    >
                      Empty Cart
                    </Button>
                  </td>
                  <td className='text-right'>
                    <Button disabled={!line_items?.length} color='info' outline>
                      Checkout
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </ModalFooter>
        </BlockUi>
      </Modal>
    </>
  );
};

CartModal.propTypes = {
  line_items: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggle: PropTypes.func,
};
