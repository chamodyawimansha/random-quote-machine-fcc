import React, { Component } from "react";
import "./app.css";

class App extends Component {
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
        id="container"
        style={{
          backgroundColor: this.state.backgroundColor,
        }}
      >
        <div id="wrapper">
          <div className="" id="quote-box">
            <div
              className="quote-text"
              style={{ color: this.state.backgroundColor }}
            >
              <i className="fa fa-quote-left mr-2"></i>
              <p id="text">{this.state.quoteBody}</p>
              <i className="fa fa-quote-right mr-2"></i>
            </div>

            <div className="quote-author">
              <p id="author" style={{ color: this.state.backgroundColor }}>
                {" - " + this.state.quoteAuthor + " - "}
              </p>
            </div>

            <div className="buttons">
              <button
                id="new-quote"
                className="btn"
                style={{
                  backgroundColor: this.state.backgroundColor,
                  color: "#fff",
                }}
                onClick={this.getRandomQuote}
              >
                New Quote
              </button>
            </div>
            <div className="socialLinks">
              <a
                className="btn"
                id="tweet-quote"
                // title="Tweet¦ this quote!"
                target="_blank"
                href={
                  'https://twitter.com/intent/tweet?hashtags=quotes&text="' +
                  this.state.quoteBody +
                  '" ' +
                  this.state.quoteAuthor
                }
                style={{
                  backgroundColor: this.state.backgroundColor,
                  color: "#fff",
                }}
              >
                <i class="fa fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
