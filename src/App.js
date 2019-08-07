import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";
import axios from "axios";

// Components
import Offers from "./Offers";
import Product from "./Product";

const GET_OFFERS = "https://leboncoin-api.herokuapp.com/api/offer/with-count";
const GET_PRODUCT = " https://leboncoin-api.herokuapp.com/api/offer";

class App extends React.Component {
  state = {
    loading: false,
    offers: [],
    product: [],
    page: 1,
    totalPage: null,
    limit: 25,
    skip: 0
  };

  renderPagination() {
    let firstPage = this.state.page - 1;
    let lastPage = firstPage + 3;
    if (this.state.totalPage !== null && lastPage > this.state.totalPage) {
      const diff = lastPage - this.state.totalPage;
      firstPage -= diff;
      lastPage -= diff;
    }
    if (firstPage < 1) {
      const diff = 1 - firstPage;
      lastPage = lastPage + diff;
      firstPage = 1;
    }

    const options = ["first"];
    for (let index = 0; index < 4; index++) {
      options.push(firstPage + index);
    }
    options.push("last");

    const paginationItems = options.map(option => {
      return (
        <button
          key={option}
          className={
            "pagination-item " + (option === this.state.page ? "selected" : "")
          }
          onClick={() => {
            const target =
              option === "first"
                ? 1
                : option === "last"
                ? this.state.totalPage
                : option;
            this.setState({ page: target }, () => {
              this.getOffers();
            });
          }}
        >
          {option}
        </button>
      );
    });

    return <div className="pagination">{paginationItems}</div>;
  }

  getOffers = async () => {
    let url = `${GET_OFFERS}?skip=${this.state.skip}&limit=${this.state.limit}`;
    try {
      const response = await axios.get(url);
      this.setState({
        offers: response.data.offers,
        totalPage: Math.ceil(response.data.count / this.state.limit),
        skip: this.state.limit * this.state.page - this.state.limit,
        loading: this.state.loading && false
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  getProduct = async id => {
    let url = `${GET_PRODUCT}/${id}`;
    try {
      const response = await axios.get(url);
      console.log("GetProduct");
      this.setState({ product: response.data });
    } catch (error) {
      console.log(error.message);
    }
  };

  /*
    @exec `Class method`
  */
  componentDidMount = () => {
    this.setState({ page: 1 }, () => {
      this.getOffers();
    });
  };

  render() {
    console.log(this.state);

    return (
      <Router>
        <div className="App">
          <header className="header">
            <div className="wrapper header-container">
              <div className="menu-left">
                <span className="menu-logo">LeBonCoin</span>
                <span className="menu-link">déposer une annonce</span>
                <span className="menu-link">offres</span>
              </div>
              <div className="menu-right">
                <span className="menu-link">créer un compte</span>
                <span className="menu-link">se connecter</span>
              </div>
            </div>
          </header>
          <Route
            exact
            path="/"
            render={props => (
              <React.Fragment>
                <section className="post">
                  <div className="wrapper post-container">
                    <Offers
                      {...props}
                      data={this.state.offers}
                      getProductOnClick={id => {
                        this.getProduct(id);
                      }}
                    />
                    {this.renderPagination()}
                  </div>
                </section>
              </React.Fragment>
            )}
          />
          <Route
            path="/offer/:id"
            render={props => (
              <React.Fragment>
                <section className="product">
                  <div className="wrapper product-container">
                    <Product {...props} product={this.state.product} />
                  </div>
                </section>
              </React.Fragment>
            )}
          />
        </div>
        {/* END App */}
      </Router>
    );
  }
}

export default App;
