import React, { Component } from "react";
import Axios from "axios";
import TaskCards from "./taskCard";
import Navigation from "./navigation";
import Footer from "./Footer";

class Form extends Component {
  state = {
    tittle: "",
    responsible: "",
    description: "",
    priority: "low",
    task: [],
    verify: false,
    username: ""
  };

  componentDidMount() {
    this.getTask();
  }

  getTask = _ => {
    Axios({
      url: `http://localhost:3000/task`,
      method: "GET",
      withCredentials: true
    })
      .then(data => {
        console.log(data.data, "app js state");
        this.setState({ task: data.data.db, username: data.data.user });
      })

      .catch(error => console.log(error, "no jala"));
    Axios({
      url: `http://localhost:3000/verify`,
      method: "get",
      withCredentials: true
    }).then(data => {
      console.log("server=", data.data);
      this.setState({
        verify: data.data
      });
    });
  };

  render() {
    if (!this.state.verify) {
      return (
        <div>
          <p>incorrect password, try again</p>
        </div>
      );
    } else {
      return (
        <div>
          <div className="card bg-light">
            <Navigation
              count={this.state.task.length}
              username={this.state.username}
            />
            <form className="card-body" onSubmit={this.handleSubmit}>
              <div className="form-group ">
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
          </div>
          <TaskCards data={this.state.task} update={this.getTask} />
          <Footer />
        </div>
      );
    }
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
    Axios({
      url: `http://localhost:3000/task/add?tittle=${tasks.tittle}&responsible=${
        tasks.responsible
      }&description=${tasks.description}&priority=${tasks.priority}`,
      method: "POST",
      withCredentials: true
    })
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
