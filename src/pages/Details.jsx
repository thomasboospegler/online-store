import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductId } from '../services/api';
import { getProductsInCart, saveProductsInCart } from '../services/localStorageApi';

class Details extends Component {
  state = {
    productDetails: [],
    quantity: 0,
  };

  componentDidMount() {
    const { match: { params: { id: productId } } } = this.props;
    const cartList = getProductsInCart();
    const product = cartList.filter((item) => item.id === productId);
    this.fetchId(productId);
    if (product.length > 0) {
      this.setState({
        quantity: product[0].quantity,
      });
    }
  }

  fetchId = async (productId) => {
    const response = await getProductId(productId);
    const { id, price, thumbnail, title, shipping } = response;
    const cartList = getProductsInCart();
    const product = cartList.filter((item) => item.id === productId);
    const shippings = shipping.free_shipping;
    const result = { id,
      price,
      quantity: product.length > 0 ? product[0].quantity : 0,
      thumbnail,
      shippings,
      title,
      available_quantity: response.available_quantity };
    this.setState({
      productDetails: result,
    });
    console.log(result);
  }

  handleBtnChange = () => {
    let cartList = getProductsInCart();
    const { productDetails } = this.state;
    productDetails.quantity += 1;
    this.setState({
      quantity: productDetails.quantity,
    });
    cartList = cartList.filter((item) => item.id !== productDetails.id);
    saveProductsInCart([...cartList, productDetails]);
  }

  render() {
    const { productDetails, quantity } = this.state;
    return (
      <section>
        <Link to="/cart">
          <button data-testid="shopping-cart-button" type="button">
            Carrinho
          </button>
        </Link>
        <h3 data-testid="product-detail-name">{productDetails.title}</h3>
        <p data-testid="product-detail-price">{`R$ ${productDetails.price}`}</p>
        <img
          data-testid="product-detail-image"
          src={ productDetails.thumbnail }
          alt={ productDetails.price }
        />
        {productDetails.shippings ? <p data-testid="free-shipping">Frete Gratis</p> : ''}
        <h4>Especificações Técnicas</h4>
        <ul>
          <li>{productDetails.warranty}</li>
          <li>{`Quantidade: ${productDetails.available_quantity}`}</li>
          <li>Outras Especificações...</li>
        </ul>
        <div className="card-quantity">
          <button
            data-testid="product-detail-add-to-cart"
            type="button"
            className="card-cart-btn"
            onClick={ this.handleBtnChange }
          >
            Adicionar ao carrinho
          </button>
          { quantity > 0
          && (
            <span
              className="card-cart-amount"
            >
              { quantity }
            </span>)}
        </div>
      </section>
    );
  }
}

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default Details;
