import React, { Component } from "react";
import axios from "axios";
class LogIn extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    this.setState({ [name]: value });
  };

  onSubmit = event => {
    axios
      .post("https://leboncoin-api.herokuapp.com/api/user/log_in", {
        email: this.state.email,
        password: this.state.password
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

  render() {
    return (
      <div className="login">
        <div className="wrapper login-container">
          <h1>Connexion</h1>
          <form onSubmit={this.onSubmit}>
            <div className="input-email">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="text"
                value={this.state.email}
                onChange={this.handleChange}
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
              />
            </div>
            <button type="submit">Valider</button>
          </form>

          <div className="no-account">
            <span>Vous n'avez pas de compte ?</span>
            <button onClick={() => this.props.history.push("sign_up")}>
              Créer un compte
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default LogIn;
