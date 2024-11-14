import { Component } from "react";
import axios from "axios";

// Импорт файла со стилями
import "./style.css";

// Страничка туду
export class TodoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      query: "",
      hello: "",
    };
  }

  render() {
    return (
      <div className="todo-page">
        <h1>Query</h1>
        <input
          type="text"
          placeholder="Your name..."
          onChange={this.#handleQueryChange.bind(this)}
        />
        <h2 id="query">{this.state.query}</h2>
        <button onClick={this.#handleQueryGet.bind(this)}>Send</button>

        <br />
        <hr />

        <h2>Count: {this.state.count}</h2>
        <input id="count" type="number" placeholder="Count..." />
        <br />
        <br />
        <button onClick={this.#handleCountChange.bind(this)}>Get</button>
        <button onClick={this.#handleCountChangePost.bind(this)}>Post</button>

        <br />
        <hr />

        <h1>Hello</h1>
        <button onClick={this.#handleHelloClick.bind(this)}>Click</button>
        <h2>{this.state.hello}</h2>
      </div>
    );
  }

  #handleQueryChange(event) {
    this.setState({
      query: event.target.value,
    });
  }

  #handleCountChange(event) {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8081/count");
        console.log(response.data.count); // LES GOOOO IT WORKS
        this.setState({
          count: response.data.count,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    this.setState({
      count:
        this.state.count + parseInt(document.getElementById("count").value),
    });
  }

  #handleHelloClick(event) {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:8082/get", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response.data); // LES GOOOO IT WORKS
        this.setState({
          hello: response.data,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }

  #handleCountChangePost(event) {
    const dataToSend = {
      count: parseInt(document.getElementById("count").value),
    };
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8081/count",
          dataToSend,
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        console.log(response.data.count); // LES GOOOO IT WORKS
        this.setState({
          count: response.data.count,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }

  #handleQueryGet(event) {
    const query = this.state.query;
    const params = {
      name: query,
    };

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8083/api/user",
          { params },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        console.log(response.data);
        this.setState({
          query: response.data,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }
}
