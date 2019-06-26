import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Axios from "axios";

class SignInForm extends Component {
  state = {
    email: "",
    password: "",
    username: "",
    token: localStorage.getItem("token")
  };

  handleInput = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
    console.log(value, name);
  };

  handleRedirect = () => {
    const path = "/task";

    this.props.history.push(path);
  };
  handleSubmit = e => {
    e.preventDefault();
    const userdata = this.state;
    Axios.post(
      `http://localhost:3000/login?email=${userdata.email}&password=${
        userdata.password
      }`
    )
      .then(
        data => {
          localStorage.setItem("token", data.data.token);
        },
        this.setState({
          email: "",
          password: "",
          username: ""
        })
      )
      .then(setTimeout(this.handleRedirect, 500))
      .catch(error => console.log(error, "no jala"));

    console.log(this.state);
  };
  render() {
    return (
      <div className="text-center">
        <form className="form-signin" onSubmit={this.handleSubmit}>
          <h1 className="h3 mb-3 font-weight-normal">Sign in</h1>
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Email address"
            name="email"
            value={this.state.email}
            onChange={this.handleInput}
            required
            autoFocus
          />
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.handleInput}
            required
            autoFocus
          />

          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Sign In
          </button>

          <Link to="/" className="FormField__Link">
            Create an account
          </Link>
          <p className="mt-5 mb-3 text-muted">&copy; 2019</p>
        </form>
      </div>
    );
  }
}

export default withRouter(SignInForm);
