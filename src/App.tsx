import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./src/pages/Home";
import Register from "./src/pages/Register";
import Participants from "./src/pages/Participants";

const App = () => {
  return (
    <Router>
      <div className="container  mx-auto">
        <nav className="bg-red-200">
          <ul>
            <li className="inline-block p-2">
              <Link to="/">Home</Link>
            </li>
            <li className="inline-block p-2">
              <Link to="/participants">Participants</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/participants">
            <Participants />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
