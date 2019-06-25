import React, { Component } from "react";
import { Redirect } from "react-router-dom";
class autToken extends Component {
  state = { token: localStorage.getItem("token") };

  render() {
    if (this.state.token) {
      return <Redirect to="task" />;
    } else {
      console.log(this.state.token);
      return (
        <div>
          <p>no token</p>
        </div>
      );
    }
  }
}

export default autToken;
