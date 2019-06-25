import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

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

  handleSubmit = e => {
    e.preventDefault();
    const data = this.state;
    Axios.post(
      `http://localhost:3000/signUp?username=${data.username}&email=${
        data.email
      }&password=${data.password}`
    ).then(
      this.setState({
        email: "",
        password: "",
        username: ""
      })
    );
    console.log("The form was submitted with the following data:");
    console.log(this.state);
  };
  render() {
    return (
      <div className="text-center row md-4">
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
          <Link to="/task">
            <button className="btn btn-lg btn-primary btn-block" type="submit">
              Sign Up
            </button>
          </Link>

          <Link to="/sign-in" className="FormField__Link">
            I'm already member
          </Link>
          <p className="mt-5 mb-3 text-muted">&copy; 2019</p>
        </form>
      </div>
    );
  }
}

export default SignUpForm;
