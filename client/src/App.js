import React, { Component, lazy, Suspense } from "react";
import "./App.css";
import { Route } from "react-router-dom";

const Login = lazy(() => import("./Login"));

const Home = lazy(() => import("./Home"));

const LoadingMessage = () => "I'm loading...";

class App extends Component {
  render() {
    return (
      <Suspense fallback={<LoadingMessage />}>
        <Route path="/" exact component={Login} />
        <Route path="/home" component={Home} />
      </Suspense>
    );
  }
}

export default App;
