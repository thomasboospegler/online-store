import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/Card.css';

class Card extends Component {
  render() {
    const { id, title, price, thumbnail, quantity, onClick, cart = false } = this.props;
    const product = {
      id,
      title,
      price,
      thumbnail,
      quantity,
    };
    return (
      <section data-testid="product" className="card-item-container">
        <div className="card-image">
          <img src={ thumbnail } alt={ title } />
        </div>

        <div className="card-item">
          <div className="card-description">
            {cart
              ? (
                <p data-testid="shopping-cart-product-name">
                  {title}
                </p>)
              : (
                <p>
                  {title}
                </p>)}
          </div>
          <div className="card-price-quantity">
            <span className="card-price">
              R$
              {price}
            </span>
            <Link
              to={ `/details/${id}` }
              data-testid="product-detail-link"
            >
              Mais Detalhes
            </Link>
            {cart
              ? (
                <div className="card-quantity">
                  <button
                    className="card-minus-btn"
                    type="button"
                    name="minusButton"
                    onClick={ onClick }
                  >
                    {/* <img src="minus.svg" alt="" /> */}
                    ➖
                  </button>
                  <input
                    data-testid="shopping-cart-product-quantity"
                    type="text"
                    name="name"
                    value={ quantity }
                  />
                  <button
                    data-testid="product-add-to-cart"
                    className="card-plus-btn"
                    type="button"
                    name="addButton"
                    onClick={ (e) => onClick(e, product) }
                  >
                    {/* <img src="plus.svg" alt="" /> */}
                    ➕
                  </button>
                </div>)
              : (
                <div className="card-quantity">
                  <button
                    data-testid="product-add-to-cart"
                    className="card-cart-btn"
                    type="button"
                    name="addButton"
                    onClick={ (e) => onClick(e, product) }
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              )}
          </div>
        </div>
        <div className="card-buttons">
          <span className="card-delete-btn">❌</span>
        </div>
      </section>
    );
  }
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  cart: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Card;
