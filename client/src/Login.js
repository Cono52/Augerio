import React, { Component } from "react";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  handleSubmit = e => {
    const { email, password } = this.state;
    fetch("http://192.168.1.104:3001/user/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => {
        if (res.status === 200) this.props.history.push("/home");
      })
      .catch(error => console.error("Error:", error));
  };

  render() {
    const { email, password } = this.state;
    return (
      <form onSubmit={e => e.preventDefault()}>
        <label>
          Email:
          <input type="text" value={email} onChange={this.handleEmailChange} />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={this.handlePasswordChange}
          />
        </label>
        <button type="submit" onClick={this.handleSubmit}>
          Login
        </button>
      </form>
    );
  }
}

export default Login;
