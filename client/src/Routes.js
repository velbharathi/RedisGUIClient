// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Redis from "./redis";
import "./App.css";
import "./scss/common.scss";


// eslint-disable-next-line react/prefer-stateless-function
class Routes extends Component {
  render() {
    console.log(this.props);
    return (
      <Router>
        <div className="routes">
          <Route exact path="/" component={Redis} />
        </div>
      </Router>
    );
  }
}

export default connect(store => ({ store }))(Routes);
