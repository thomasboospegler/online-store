import React, { Component } from 'react';
import Card from '../components/Card';
import { getProductsInCart, saveProductsInCart } from '../services/localStorageApi';

export default class Cart extends Component {
  state = {
    cartList: [],
  };

  componentDidUpdate = () => {
    const { cartList } = this.state;
    if (JSON.stringify(cartList) !== JSON.stringify(getProductsInCart())) {
      saveProductsInCart(cartList);
    }
  }

  componentDidMount = () => {
    const productList = getProductsInCart();
    this.setState({
      cartList: productList,
    });
  }

  saveCartInState = (productsLlist) => this
    .setState({ cartList: productsLlist });

  getCartInState = () => {
    const { cartList } = this.state;
    const result = cartList;
    return result;
  };

  removeProductFromArray = (product) => {
    const productsInState = this.getCartInState();
    if (productsInState.length > 0) {
      return (productsInState.filter((p) => p.id !== product.id));
    }
    return [];
  };

  removeProductFromState = (product) => {
    const productsInState = this.getCartInState();
    if (productsInState.length > 0) {
      this.saveCartInState(productsInState.filter((p) => p.id !== product.id));
    }
  };

  setItem = (product) => {
    if (product) {
      const productsInState = this.removeProductFromArray(product);
      if (product.quantity > 0) {
        this.saveCartInState([...productsInState || {}, product]);
      } else {
        this.removeProductFromState(product);
      }
    }
  };

  addProductQuantity = (product, quantity, avaliable) => {
    if (product.quantity < avaliable) {
      product.quantity += quantity;
      this.setItem(product/* , 1 */);
    }
  };

  subtractProductQuantity = (product, quantity) => {
    product.quantity -= quantity;
    this.setItem(product);
  };

  handleCardBtn = ({ target }, product, avaliable) => {
    const { name } = target;
    const { cartList } = this.state;
    if (name === 'addButton') {
      this.addProductQuantity(product, 1, avaliable);
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
    const { cartList } = this.state;
    return (
      cartList.length === 0
        ? <span data-testid="shopping-cart-empty-message">Seu carrinho está vazio</span>
        : (
          <div>
            {cartList.filter(({ quantity }) => quantity > 0)
              .map((item) => (<Card
                key={ item.id }
                cart
                id={ item.id }
                title={ item.title }
                thumbnail={ item.thumbnail }
                price={ item.price }
                quantity={ item.quantity }/* { this.getQuantityInCart(item) } */
                avaliableQuantity={ item.avaliableQuantity }
                onClick={ this.handleCardBtn }
              />))}
          </div>
        )
    );
  }
}
