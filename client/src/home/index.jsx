import React, { Component } from "react";
import Axios from "axios";
import classnames from "classnames";
import SplitPane from "react-split-pane";
import Connections from "../connections";
import "./style.scss";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SplitPane split="vertical" minSize={50} defaultSize={100}>
        <div>
          <Connections />
        </div>
        <SplitPane split="horizontal">
          <div>right</div>
          <div />
        </SplitPane>
      </SplitPane>
    );
  }
}

export default Home;
