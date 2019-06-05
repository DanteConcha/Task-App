import React, { Component } from "react";
import { toDo } from "../toDo.json";

class Form extends Component {
  state = {
    tittle: "",
    responsible: "",
    description: "",
    priority: "low",
    toDo
  };

  render() {
    return (
      <div className="card bg-light">
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
          <button type="submit" className="btn btn-primary">
            save
          </button>
        </form>
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
    this.props.add(this.state);
    this.setState({
      title: "",
      responsible: "",
      description: "",
      priority: "low"
    });
  };
}

export default Form;
