import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

class Home extends Component {
  state = {
    categoriesList: [],
  }

  componentDidMount = async () => {
    const list = await getCategories();
    this.setState({ categoriesList: list });
  }

  render() {
    const { categoriesList } = this.state;
    return (
      <div>

        <div className="home-categories-container">
          <div className="home-categories">
            {/* <ul> */}
            {categoriesList.map(({ id, name }) => (
              <button
                type="button"
                data-testid="category"
                value={ id }
                key={ id }
              >
                {name}
              </button>))}
            {/* </ul> */}
          </div>
        </div>

        <span
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </span>

        <Link to="/cart">
          <button data-testid="shopping-cart-button" type="button">
            Carrinho
          </button>
        </Link>

      </div>
    );
  }
}

export default Home;
