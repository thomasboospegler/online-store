const SHOPPING_CART_KEY = 'online_store';
// const MINUS = -1;

if (!JSON.parse(localStorage.getItem(SHOPPING_CART_KEY))) {
  localStorage.setItem(SHOPPING_CART_KEY, JSON.stringify([]));
}

export const saveProductsInCart = (productsInCart) => localStorage
  .setItem(SHOPPING_CART_KEY, JSON.stringify(productsInCart));

export const getProductsInCart = () => {
  const result = JSON
    .parse(localStorage.getItem(SHOPPING_CART_KEY));
  return result;
};

export const removeProductFromCart = (product) => {
  const productsInCart = getProductsInCart();
  if (productsInCart.length > 0) {
    saveProductsInCart(productsInCart.filter((p) => p.id !== product.id));
  }
};

const setItem = (product) => {
  if (product) {
    removeProductFromCart(product);
    const productsInCart = getProductsInCart();
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

export const getProductQuantity = (product) => {
  let productInCart = getProductsInCart();
  if (productInCart[0]) {
    productInCart = productInCart.find((p) => p.id !== product.id);
    return typeof (productInCart.quantity) !== 'number' ? 0 : productInCart.quantity;
  } return 0;
};

export const getComments = (id) => {
  const result = JSON
    .parse(localStorage.getItem(`comments_${id}`));
  return result;
};

export const saveComments = (id, comment) => {
  if (!JSON.parse(localStorage.getItem(`comments_${id}`))) {
    localStorage.setItem(`comments_${id}`, JSON.stringify([]));
  }
  localStorage.setItem(`comments_${id}`, JSON.stringify(comment));
};
