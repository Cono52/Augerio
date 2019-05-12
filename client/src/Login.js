import React from "react";

function Login(props) {
  return (
    <div>
      <label>
        Email:
        <input type="text" />
      </label>
      <label>
        Password:
        <input type="password" />
      </label>
      <button onClick={() => props.history.push("/home")}>Login</button>
    </div>
  );
}

export default Login;
