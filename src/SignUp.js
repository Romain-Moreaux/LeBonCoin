import React, { Component } from "react";
import axios from "axios";

import clock from "./images/clock.svg";

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    errorMsg: false
  };

  handleChange = event => {
    const target = event.target;
    const name = target.name;

    // Utile si le formulaire contient des éléments "checkbox"
    const value = target.type === "checkbox" ? target.checked : target.value;

    // if (name === "confirmPassword" && value !== this.state.password) this.setState({errorMsg : true})

    this.setState({ [name]: value });
  };

  onSubmit = event => {
    axios
      .post(" https://leboncoin-api.herokuapp.com/api/user/sign_up", {
        email: this.state.email,
        password: this.state.password,
        username: this.state.username
      })
      .then(response => {
        console.log(response.data);
        if (response.data && response.data.token) {
          this.props.logIn({
            token: response.data.token,
            username: response.data.account.username,
            _id: response.data._id
          });

          this.props.history.push("/");
        }
      })
      .catch(err => {
        console.log(err);
      });
    event.preventDefault();
  };

  displayForm() {
    return (
      <form onSubmit={this.onSubmit}>
        <div className="input-username">
          <label htmlFor="username">username</label>
          <input
            id="username"
            name="username"
            type="text"
            value={this.state.username}
            onChange={this.handleChange}
            required
          />
        </div>
        <div className="input-email">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="text"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
        </div>
        <div className="input-password">
          <label htmlFor="password">password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
        </div>
        <div className="input-confirm">
          <label htmlFor="confirm password">confirm password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            required
          />
        </div>

        <button type="submit">Créer mon compte</button>
      </form>
    );
  }

  render() {
    console.log(this.state);

    return (
      <section className="sign-up">
        <div className="wrapper sign-up-container">
          <div className="box-left">
            <h1>Pourquoi créer un compte ?</h1>
            <div className="line">
              <div className="line-icon">
                <img src={clock} alt="" />
              </div>
              <div className="line-infos">
                <h4>Gagnez du temps</h4>
                <p>
                  Publiez vos annonces rapidement, avec vos informations
                  pré-remplies chaque fois que vous souhaitez déposer une
                  nouvelle annonce.
                </p>
              </div>
            </div>
            <div className="line">
              <div className="line-icon">
                <img src={clock} alt="" />
              </div>
              <div className="line-infos">
                <h4>Gagnez du temps</h4>
                <p>
                  Publiez vos annonces rapidement, avec vos informations
                  pré-remplies chaque fois que vous souhaitez déposer une
                  nouvelle annonce.
                </p>
              </div>
            </div>
            <div className="line">
              <div className="line-icon">
                <img src={clock} alt="" />
              </div>
              <div className="line-infos">
                <h4>Gagnez du temps</h4>
                <p>
                  Publiez vos annonces rapidement, avec vos informations
                  pré-remplies chaque fois que vous souhaitez déposer une
                  nouvelle annonce.
                </p>
              </div>
            </div>
          </div>
          <div className="box-right">
            <h2>Créer un compte</h2>
            {this.displayForm()}
          </div>
        </div>
      </section>
    );
  }
}

export default SignUp;
