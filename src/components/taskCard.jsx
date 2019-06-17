import React, { Component } from "react";
import Axios from "axios";

class TaskCards extends Component {
  state = {
    todo: this.props.data
  };

  removeTask = task => {
    Axios.post(`http://localhost:3000/task/delete?id=${task}`)
      .then()
      .then(console.log("se elimino id_db=", task))
      .then(this.forceUpdate())
      .catch(err => console.error(err));
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
    const todos = this.props.data.map((todo, i) => {
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
            <div className="card-body">
              <p>{todo.id}</p>
            </div>
            <div className="card-footer">
              <button
                className="btn btn-danger"
                onClick={this.removeTask.bind(this, todo.id)}
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
        <div className="row bg-light">
          <div className="col-md-3 mt-4 ml-4 mr-4 mb-4" />
          <div className="col-md-8 mb-4">
            <div className="row ml-4">{todos}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default TaskCards;
