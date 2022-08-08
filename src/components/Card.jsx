import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/Card.css';

class Card extends Component {
  render() {
    const { id, title, price, thumbnail,
      quantity, onClick, cart = false, avaliableQuantity } = this.props;
    const product = {
      id,
      title,
      price,
      thumbnail,
      quantity,
      avaliableQuantity,
    };
    return (
      <section data-testid="product" className="card-item-container">
        <div className="card-image">
          <img src={ thumbnail } alt={ title } />
        </div>

        <div className="card-item">
          <div className="card-description">

            <p data-testid="shopping-cart-product-name">
              {title}
            </p>

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
                    data-testid="product-decrease-quantity"
                    className="card-minus-btn"
                    type="button"
                    name="minusButton"
                    onClick={ (e) => onClick(e, product) }
                  >
                    {/* <img src="minus.svg" alt="" /> */}
                    ➖
                  </button>
                  <div className="card-quantity-span">
                    <span
                      data-testid="shopping-cart-product-quantity"
                      className="card-quantity-span"
                      name="name"
                    >
                      { quantity }
                    </span>
                  </div>
                  <button
                    data-testid="product-increase-quantity"
                    className="card-plus-btn"
                    type="button"
                    name="addButton"
                    onClick={ (e) => onClick(e, product, avaliableQuantity) }
                  >
                    {/* <img src="plus.svg" alt="" /> */}
                    ➕
                  </button>
                  <span
                    className="card-quantity-avaliable-quantity"
                  >
                    {`Em estoque:${avaliableQuantity}`}
                  </span>
                </div>)
              : (
                <div className="card-quantity">
                  <button
                    data-testid="product-add-to-cart"
                    className="card-cart-btn"
                    type="button"
                    name="addButton"
                    onClick={ (e) => onClick(e, product, avaliableQuantity) }
                  >
                    Adicionar ao Carrinho
                  </button>
                  <span
                    className="card-cart-avaliable-quantity"
                  >
                    {`Em estoque:${avaliableQuantity}`}
                  </span>
                  { quantity > 0
                  && (
                    <span
                      data-testid="shopping-cart-product-quantity"
                      className="card-cart-amount"
                    >
                      { quantity }
                    </span>)}
                </div>
              )}
          </div>
        </div>
        <div className="card-buttons">
          <button
            className="card-delete-btn"
            data-testid="remove-product"
            type="button"
            name="removeButton"
            onClick={ (e) => onClick(e, product) }
          >
            ❌
          </button>
        </div>
      </section>
    );
  }
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  cart: PropTypes.bool,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  avaliableQuantity: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

Card.defaultProps = {
  cart: false,
};

export default Card;
