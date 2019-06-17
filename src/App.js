import React, { Component } from "react";
import Footer from "../src/components/footer";
import Form from "./components/Form";

class App extends Component {
  render() {
    return (
      <div>
        <Form />

        <Footer />
      </div>
    );
  }
}

export default App;
