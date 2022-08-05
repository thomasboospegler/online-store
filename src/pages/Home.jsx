import React, { Component } from 'react';
import { getCategories } from '../services/api';

class Home extends Component {
  state = {
    categoriesList: [],
  }

  componentDidMount = async () => {
    const list = await getCategories();
    // const { categoriesList } = this.state;
    console.log('list: ', list);
    this.setState({ categoriesList: list });
  }

  render() {
    const { categoriesList } = this.state;
    // console.log('categoriesList: ', categoriesList);
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
      </div>
    );
  }
}

export default Home;
