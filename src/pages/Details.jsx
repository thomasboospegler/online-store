import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductId } from '../services/api';
import { getProductsInCart, saveProductsInCart, saveComments,
  getComments } from '../services/localStorageApi';

class Details extends Component {
  state = {
    productDetails: [],
    quantity: 0,
    evaluation: '',
    email: '',
    rating: '',
    commentsList: [],
    validatedEmail: true,
    checked: [false, false, false, false, false],
  };

  componentDidMount() {
    const { match: { params: { id: productId } } } = this.props;
    const cartList = getProductsInCart();
    const product = cartList ? cartList.filter((item) => item.id === productId) : [];
    this.fetchId(productId);
    const { match: { params: { id } } } = this.props;
    if (product.length > 0) {
      this.setState({
        quantity: product[0].quantity,
      });
    }
    this.setState({ commentsList: getComments(id) || [] });
  }

  fetchId = async (productId) => {
    const response = await getProductId(productId);
    const { id, price, thumbnail, title } = response;
    const cartList = getProductsInCart();
    const product = cartList ? cartList.filter((item) => item.id === productId) : [];
    const result = { id,
      price,
      quantity: product.length > 0 ? product[0].quantity : 0,
      thumbnail,
      title,
      available_quantity: response.available_quantity };
    this.setState({
      productDetails: result,
    });
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

  handleChange = ({ target }) => {
    const { name, value, type } = target;
    if (type === 'checkbox') {
      const { checked } = this.state;
      for (let index = 0; index < checked.length; index += 1) {
        if (index < Number(value)) checked[index] = true;
        else checked[index] = false;
      }
      return this.setState({ rating: value });
    }
    this.setState({ [name]: value });
  }

  validatedInputs = () => {
    const { email, rating } = this.state;
    const regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
    const validEmail = regex.test(email);
    const validGrade = rating !== '';
    return validEmail && validGrade;
  }

  handleSubmitBtn = (event) => {
    event.preventDefault();
    const { email, evaluation, rating } = this.state;
    const result = { email, evaluation, rating };
    const { match: { params: { id } } } = this.props;
    const isEmailValidated = this.validatedInputs();
    if (isEmailValidated) {
      const savedLocal = getComments(id);
      if (savedLocal) saveComments(id, [...savedLocal || {}, result]);
      else saveComments(id, [result]);
    }
    this.setState({
      evaluation: '',
      email: '',
      rating: '',
      commentsList: getComments(id),
      validatedEmail: isEmailValidated,
      checked: [false, false, false, false, false],
    });
  }

  render() {
    const inputCounter = ['1', '2', '3', '4', '5'];
    const { productDetails, quantity, evaluation, email,
      commentsList, checked, validatedEmail } = this.state;
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
            <span className="card-cart-amount">
              { quantity }
            </span>)}
        </div>
        <form className="comments-container">
          <input
            type="text"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            data-testid="product-detail-email"
            required
          />
          {inputCounter.map((num, i) => (
            <label htmlFor={ `${num}-input` } key={ num }>
              <input
                type="checkbox"
                id={ `${num}-input` }
                data-testid={ `${num}-rating` }
                name={ `checkbox${num}` }
                value={ num }
                checked={ checked[i] }
                onChange={ this.handleChange }
              />
            </label>
          ))}
          <textarea
            name="evaluation"
            id="product-detail-evaluation"
            cols="30"
            rows="10"
            data-testid="product-detail-evaluation"
            value={ evaluation }
            onChange={ this.handleChange }
            required
          />
          <button
            type="submit"
            data-testid="submit-review-btn"
            onClick={ this.handleSubmitBtn }
          >
            Enviar
          </button>
        </form>
        {!validatedEmail && <div data-testid="error-msg">Campos inválidos</div>}
        <section>
          {commentsList && commentsList.map((comment, index) => (
            <div key={ index }>
              <p data-testid="review-card-email">{comment.email}</p>
              <p data-testid="review-card-rating">{comment.rating}</p>
              <p data-testid="review-card-evaluation">{comment.evaluation}</p>
            </div>
          ))}
        </section>
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
