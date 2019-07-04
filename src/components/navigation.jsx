import React, { Component } from "react";
import Axios from "axios";
import { withRouter } from "react-router-dom";

class Navigation extends Component {
  handleRedirect = () => {
    const path = "/";
    this.props.history.push(path);
  };

  handleLogOut = _ => {
    Axios({
      url: `http://localhost:3000/logOut`,
      method: "GET",
      withCredentials: true
    }).then(console.log("logged out"));
    // .then(this.handleRedirect());
  };

  render() {
    console.log("user= ", this.props.username);
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="text-white ">
            <ul className="navbar-nav mr-auto">
              <li className="">
                <span>Task </span>
              </li>
              <li>
                <span className="badge badge-pill badge-light ml-1 ">
                  {this.props.count}
                </span>
              </li>
            </ul>
          </div>

          <div className="mx-auto order-0">
            <span className="navbar-text mx-auto text-white">
              hi,{this.props.username}
            </span>
          </div>

          <div className="">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="/" onClick={this.handleLogOut}>
                  Log Out
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(Navigation);
