const SHOPPING_CART_KEY = 'online_store';
// const MINUS = -1;

if (!JSON.parse(localStorage.getItem(SHOPPING_CART_KEY))) {
  localStorage.setItem(SHOPPING_CART_KEY, JSON.stringify([]));
}

export const saveProductsInCart = (productsInCart) => localStorage
  .setItem(SHOPPING_CART_KEY, JSON.stringify(productsInCart));

export const getProductsInCart = async () => {
  const result = await JSON
    .parse(localStorage.getItem(SHOPPING_CART_KEY));
  return result;
};

export const removeProductFromCart = async (product) => {
  const productsInCart = await getProductsInCart();
  if (productsInCart.length > 0) {
    saveProductsInCart(productsInCart.filter((p) => p.id !== product.id));
  }
};

const setItem = async (product) => {
  if (product) {
    await removeProductFromCart(product);
    const productsInCart = await getProductsInCart();
    saveProductsInCart([...productsInCart || {}, product]);
  }
};

export const addProduct = (product) => {
  product.quantity += 1;
  setItem(product/* , 1 */);
};

export const subtractProduct = (product) => {
  if (product.quantity > 1) product.quantity -= 1;
  setItem(product/* , MINUS */);
};

export const getProductQuantity = async (product) => {
  let productInCart = await getProductsInCart();
  if (productInCart[0]) {
    productInCart = productInCart.find((p) => p.id !== product.id);
    return typeof (productInCart.quantity) !== 'number' ? 0 : productInCart.quantity;
  } return 0;
};
