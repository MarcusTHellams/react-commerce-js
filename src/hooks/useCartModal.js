import { useCallback } from 'react';
import { useMutation } from 'react-query';
import { useCartContext } from '../context/cartContext';
import { commerce } from '../lib/commerce';
import useDynamicRefs from './useDynamicRefs';

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

export const useCartModal = (modalProps) => {
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

  const removeFromCartHandler = useCallback(
    (lineItemId) => {
      removeFromCart.mutate({ lineItemId });
    },
    [removeFromCart]
  );

  const emptyCartHandler = useCallback(() => {
    emptyCart.mutate();
  }, [emptyCart]);

  const { getRef, setRef } = useDynamicRefs();

  const addSubtractHandler = useCallback(
    (e) => {
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
    },
    [getRef, mutate]
  );

  return {
    addSubtractHandler,
    cart,
    emptyCart,
    emptyCartHandler,
    isLoading,
    removeFromCart,
    removeFromCartHandler,
    setRef,
  };
};
