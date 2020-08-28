import React, { Component } from "react";

class App extends Component {
  quoteBoxStyles = {};

  constructor(props) {
    super(props);

    this.state = {
      quoteBody: "",
      quoteAuthor: "",
      backgroundColor: "",
    };

    this.getRandomQuote = this.getRandomQuote.bind(this);
    this.getRandomColor = this.getRandomColor.bind(this);
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
      this.getRandomColor();
    } catch (err) {
      console.log("API Error = " + err);
    }
  }

  async getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    this.setState({ backgroundColor: color });
  }

  render() {
    return (
      <div
        style={{
          backgroundColor: this.state.backgroundColor,
          height: "100vh",
          transition: "background-color 0.5s ease",
        }}
      >
        <div
          className=""
          id="quote-box"
          style={{
            backgroundColor: "#FFF",
          }}
        >
          <p id="text">{this.state.quoteBody}</p>
          <p id="author">{this.state.quoteAuthor}</p>
          <button
            id="new-quote"
            className="btn btn-primary"
            onClick={this.getRandomQuote}
          >
            New Quote
          </button>
        </div>
      </div>
    );
  }
}

export default App;
