import React, { Component } from 'react';
import Card from '../components/Card';
import { getProductsInCart, saveProductsInCart } from '../services/localStorageApi';

export default class Cart extends Component {
  state = {
    products: [],
    cartList: [],
  };

  componentDidUpdate = async () => {
    const { cartList } = this.state;
    if (JSON.stringify(cartList) !== await JSON.stringify(getProductsInCart())) {
      saveProductsInCart(cartList);
    }
  }

  componentDidMount = async () => {
    const productList = await getProductsInCart();
    this.setState({
      cartList: productList,
      products: productList,
    });
  }

  saveCartInState = (productsLlist) => this
    .setState({ cartList: productsLlist });

  getCartInState = () => {
    const { cartList } = this.state;
    const result = cartList;
    return result;
  };

  removeProductFromState = async (product) => {
    const productsInState = await this.getCartInState();
    if (productsInState.length > 0) {
      this.saveCartInState(productsInState.filter((p) => p.id !== product.id));
    }
  };

  setItem = async (product) => {
    if (product) {
      await this.removeProductFromState(product);
      const productsInState = await this.getCartInState();
      if (product.quantity > 0) {
        this.saveCartInState([...productsInState || {}, product]);
      }
    }
  };

  addProductQuantity = (product, quantity) => {
    product.quantity += quantity;
    this.setItem(product/* , 1 */);
  };

  subtractProductQuantity = (product, quantity) => {
    product.quantity -= quantity;
    this.setItem(product/* , MINUS */);
  };

  handleCardBtn = async ({ target }, product) => {
    const { name } = target;
    const { cartList } = this.state;
    if (name === 'addButton') {
      // addProduct(product);
      this.addProductQuantity(product, 1);
    }
    if ((name === 'minusButton') && (product.quantity > 1)) {
      this.subtractProductQuantity(product, 1);
    }
    if (name === 'removeButton') {
      this.subtractProductQuantity(product, product.quantity);
    }
    saveProductsInCart(cartList);
  }

  getQuantityInCart = (item) => {
    const { cartList } = this.state;
    const result = cartList.filter(({ id }) => id === item.id);
    return !result[0] ? 0 : result[0].quantity || 0;
  }

  render() {
    const { products } = this.state;
    return (
      products.length === 0
        ? <span data-testid="shopping-cart-empty-message">Seu carrinho está vazio</span>
        : (
          <div>
            {products.filter(({ quantity }) => quantity > 0)
              .map((item) => {
                const quantity = this.getQuantityInCart(item, this.state);
                return (<Card
                  key={ item.id }
                  cart
                  id={ item.id }
                  title={ item.title }
                  thumbnail={ item.thumbnail }
                  price={ item.price }
                  quantity={ quantity }
                  onClick={ (e) => this.handleCardBtn(e, item) }
                />);
              })}
          </div>
        )

    );
  }
}
