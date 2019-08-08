import React from "react";
import { Link, NavLink, withRouter } from "react-router-dom";

class Header extends React.Component {
  onLogOut = event => {
    this.props.logOut();
    this.props.history.push("/");
  };

  render() {
    return (
      <header className="header">
        <div className="wrapper header-container">
          <div className="menu-left">
            <span className="menu-logo">
              <Link to="/">LeBonCoin</Link>
            </span>
            <span className="menu-link">
              <NavLink to="/publish">déposer une annonce</NavLink>
            </span>
            <span className="menu-link">
              <NavLink to="/">offres</NavLink>
            </span>
          </div>
          {this.props.user._id ? (
            <div className="menu-right">
              <span
                onClick={() =>
                  this.props.history.push("/profile/" + this.props.user._id)
                }
                className="menu-link"
              >
                {this.props.user.username}
              </span>
              <span onClick={this.onLogOut} className="menu-link">
                Déconnexion
              </span>
            </div>
          ) : (
            <div className="menu-right">
              <span
                onClick={() => this.props.history.push("sign_up")}
                className="menu-link"
              >
                créer un compte
              </span>
              <span
                onClick={() => this.props.history.push("log_in")}
                className="menu-link"
              >
                se connecter
              </span>
            </div>
          )}
        </div>
      </header>
    );
  }
}

export default withRouter(Header);
