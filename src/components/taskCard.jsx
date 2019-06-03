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
    badges += this.state.toDo.priority === "low" ? "success" : "warning";
    console.log(this.state.toDo.priority);
    return badges;
  };

  render() {
    let badges;
    const todos = this.state.toDo.map((todo, i) => {
      return (
        <div className="col-md-4" key={i}>
          <div className="card ml-2 mt-4 ">
            <div className="card-header">
              <h3>{todo.tittle}</h3>
              <span
                className={
                  ((badges +=
                    todo.priority === "low"
                      ? "badge badge-pill badge-success"
                      : "badge badge-pill badge-warning"),
                  (badges +=
                    todo.priority === "high"
                      ? "badge badge-pill badge-danger"
                      : ""))
                }
              >
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
      <div className="TaskCards">
        <Navigation count={this.state.toDo.length} />
        <Form add={this.handleAddTask} />
        <div className="row mt-4 ">{todos}</div>
      </div>
    );
  }
}

export default TaskCards;
