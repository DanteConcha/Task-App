import React, { Component } from "react";
import Navigation from "./navigation";
import { toDo } from "../toDo.json";
import Form from "./Form";
class TaskCards extends Component {
  state = {
    toDo
  };

  removeTask = task => {
    this.state.toDo.splice(task, 1);
    this.setState({});
    console.log("elminado, restates=", this.state.toDo.length);
  };

  handleAddTask = toDo => {
    this.setState({
      toDo: [...this.state.toDo, toDo]
    });

    console.log("agregado");
  };

  handleBadges = task => {
    let badges = "badge badge-pill badge-";
    if (task === "low") {
      badges += "success";
    } else if (task === "medium") {
      badges += "warning";
    } else badges += "danger";
    return badges;
  };

  render() {
    const todos = this.state.toDo.map((todo, i) => {
      return (
        <div className="mr-4" key={i}>
          <div className="card mt-4 text-center">
            <div className="card-header">
              <h3>{todo.tittle}</h3>
              <span className={this.handleBadges(todo.priority)}>
                {todo.priority}
              </span>
            </div>

            <div className="card-body">
              <p>{todo.description}</p>
            </div>
            <div className="card-footer">
              <button
                className="btn btn-danger"
                onClick={this.removeTask.bind(this)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div>
        <Navigation count={this.state.toDo.length} />

        <div className="row bg-light">
          <div className="col-md-3 mt-4 ml-4 mr-4 mb-4">
            <Form add={this.handleAddTask} />
          </div>

          <div className="col-md-8 mb-4">
            <div className="row ml-4">{todos}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default TaskCards;
