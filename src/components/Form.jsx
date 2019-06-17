import React, { Component } from "react";
//import { toDo } from "../toDo.json";
import Axios from "axios";
import TaskCards from "./taskCard";
import Navigation from "./navigation";
//import {} from "../App";
class Form extends Component {
  state = {
    tittle: "",
    responsible: "",
    description: "",
    priority: "low",
    task: []
  };

  componentDidMount() {
    this.getTask();
  }

  getTask = _ => {
    Axios.get("http://localhost:3000/task")
      .then(data => {
        console.log(data.data.db, "app js state");
        this.setState({ task: data.data.db });
      })

      .catch(error => console.log(error, "no jala"));
  };
  render() {
    return (
      <div className="card bg-light">
        <Navigation count={this.state.task.length} />
        <form className="card-body" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="tittle"
              className="form-control"
              placeholder="Tittle"
              value={this.state.tittle}
              onChange={this.handleInput}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="responsible"
              className="form-control"
              placeholder="Responsible"
              value={this.state.responsible}
              onChange={this.handleInput}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="description"
              className="form-control"
              placeholder="Description"
              value={this.state.description}
              onChange={this.handleInput}
            />
          </div>
          <div className="form-group">
            <select
              name="priority"
              className="form-control"
              value={this.state.priority}
              onChange={this.handleInput}
            >
              <option>low</option>
              <option>medium</option>
              <option>high</option>
            </select>
          </div>
          <button className="btn btn-primary" type="submit">
            save
          </button>
        </form>
        <TaskCards data={this.state.task} />
      </div>
    );
  }

  handleInput = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const tasks = this.state;
    Axios.post(
      `http://localhost:3000/task/add?tittle=${tasks.tittle}&responsible=${
        tasks.responsible
      }&description=${tasks.description}&priority=${tasks.priority}`
    )
      .then(
        this.setState({
          title: "",
          responsible: "",
          description: "",
          priority: "low"
        })
      )
      .then(this.getTask)

      .catch(err => console.error(err));
  };
}

export default Form;
