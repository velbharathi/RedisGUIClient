import React from "react";
import { connect } from "react-redux";
import SplitPane from "react-split-pane";

import Card from "../components/card";

import Connections from "./connections";
import ConnectionDetails from "./connections/connection_details";

import "./style.scss";

const Redis = () => (
  <div>
    <SplitPane split="vertical" defaultSize={200}>
      <div className="left-pane">
        <Connections />
      </div>
      <Card containerClassName="right-pane-card">
        <ConnectionDetails />
      </Card>
    </SplitPane>
  </div>
);

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(Redis);
