import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quoteBody: "",
      quoteAuthor: "",
      backgroundColor: "",
    };

    this.getRandomQuote = this.getRandomQuote.bind(this);
  }

  async componentDidMount() {
    this.getRandomQuote();
  }

  async getRandomQuote() {
    try {
      const response = await fetch("https://quote-api.glitch.me/pull/1");
      const data = await response.json();
      this.setState({
        quoteBody: data[0].body,
        quoteAuthor: data[0].author,
      });
    } catch (err) {
      console.log("API Error = " + err);
    }
  }

  async getRandomColor() {}

  render() {
    return (
      <div className="h-100 row align-items-center">
        <div className="">
          <h1>{this.state.quoteBody}</h1>
        </div>
      </div>
    );
  }
}

export default App;
