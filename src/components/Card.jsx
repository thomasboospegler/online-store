import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Card extends Component {
  render() {
    const { title, price, thumbnail } = this.props;
    return (
      <section data-testid="product">
        <h3>{title}</h3>
        <img src={ thumbnail } alt={ title } />
        <span>{price}</span>
      </section>
    );
  }
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
};

export default Card;
