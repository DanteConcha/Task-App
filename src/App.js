import React, { Component } from "react";

import TaskCard from "../src/components/taskCard";
import Footer from "../src/components/footer";

class App extends Component {
  render() {
    return (
      <div>
        <TaskCard />
        <Footer />
      </div>
    );
  }
}

export default App;
