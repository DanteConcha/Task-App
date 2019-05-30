import React, { Component } from "react";
import { toDo } from "../toDo.json";

class Navigation extends Component {
  state = {
    toDo
  };
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <span className="text-white ">
            <span>Task </span>
            <span className="badge badge-pill badge-light mr-2 ">
              {this.props.count}
            </span>
          </span>
        </nav>
      </div>
    );
  }
}

export default Navigation;
