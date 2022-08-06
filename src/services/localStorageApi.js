const SHOPPING_CART_KEY = 'online_store';
const MINUS = -1;

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

const setItem = async (product, operator) => {
  if (product) {
    const productsInCart = await getProductsInCart();
    if (productsInCart.some((p) => p.id === product.id)) {
      saveProductsInCart(productsInCart.map((p) => ((p.id === product.id)
        ? p.quantity + (1 * operator) : p.quantity)));
    } else {
      saveProductsInCart([...productsInCart, product]);
    }
  }
};

export const addProduct = (product) => setItem(product, 1);

export const subtractProduct = (product) => setItem(product, MINUS);

export const removeProductFromCart = (product) => {
  const productsInCart = getProductsInCart();
  saveProductsInCart(productsInCart.filter((p) => p.id !== product.id));
};

export const getProductQuantity = async (product) => {
  let productInCart = await getProductsInCart();
  if (productInCart[0]) {
    productInCart = productInCart.find((p) => p.id !== product.id);
    return typeof (productInCart.quantity) !== 'number' ? 0 : productInCart.quantity;
  } return 0;
};
