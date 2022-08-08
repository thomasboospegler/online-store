export const saveCartInState = (productsLlist, state) => state
  .setState({ cartList: productsLlist });

export const getCartInState = (state) => {
  const { cartList } = state;
  const result = cartList;
  return result;
};

export const removeProductFromState = async (product, state) => {
  const productsInState = await getCartInState(state);
  if (productsInState.length > 0) {
    saveCartInState(productsInState.filter((p) => p.id !== product.id), state);
  }
};

export const setItem = async (product, state) => {
  if (product) {
    await removeProductFromState(product, state);
    const productsInState = await getCartInState(state);
    saveCartInState([...productsInState || {}, product], state);
  }
};

export const addProductQuantity = (product, state) => {
  product.quantity += 1;
  setItem(product, state);
};

export const subtractProductQuantity = (product) => {
  if (product.quantity > 1) product.quantity -= 1;
  setItem(product, state);
};

export const getQuantityInCart = (item, state) => {
  const { cartList } = state;
  const result = cartList.filter(({ id }) => id === item.id);
  return !result[0] ? 0 : result[0].quantity || 0;
};
