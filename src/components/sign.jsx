import React, { Component } from "react";
import { HashRouter as Router, Route, Redirect } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import Form from "./Form";

class Sign extends Component {
  state = {
    token: localStorage.getItem("token")
  };

  render() {
    return (
      <Router basename="/">
        <Route exact path="/" component={SignUpForm} />
        <Route
          path="/task"
          render={() =>
            typeof this.state.token === undefined ? (
              <Redirect to="/" />
            ) : (
              <Redirect to="/task" />
            )
          }
        />
        <Route exact path="/task" component={Form} />

        <Route path="/sign-in" component={SignInForm} />
      </Router>
    );
  }
}

export default Sign;
