import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Axios from "axios";
import "../sign-up-styles.css";

class SignUpForm extends Component {
  state = {
    email: "",
    password: "",
    username: ""
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
    Axios.get(
      `http://localhost:3000/signUp?username=${userdata.username}&email=${
        userdata.email
      }&password=${userdata.password}`,
      { withCredentials: true }
    )
      .then(
        this.setState({
          email: "",
          password: "",
          username: ""
        })
      )
      .then(setTimeout(this.handleRedirect, 500))
      .catch(error => console.log(error, "no jala"));

    console.log("data= ", this.state);
  };
  render() {
    return (
      <div className="text-center body">
        <form className="form-signin" onSubmit={this.handleSubmit}>
          <h1 className="h3 mb-3 font-weight-normal">Sign Up</h1>
          <label htmlFor="name" className="sr-only">
            UserName
          </label>
          <input
            type="text"
            id="username"
            className="form-control"
            placeholder="Enter your username"
            name="username"
            value={this.state.username}
            onChange={this.handleInput}
            required
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
          />
          <label htmlFor="email" className="sr-only">
            E-mail Address
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="your e-mail please :D"
            name="email"
            value={this.state.email}
            onChange={this.handleInput}
            required
          />

          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Sign Up
          </button>

          <Link to="/sign-in" className="FormField__Link">
            I'm already member
          </Link>
          <p className="mt-5 mb-3 text-muted">&copy; 2019</p>
        </form>
      </div>
    );
  }
}

export default withRouter(SignUpForm);
