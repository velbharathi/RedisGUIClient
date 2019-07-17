import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// eslint-disable-next-line import/no-unresolved
import Icon from "components/icon";
import Button from "components/button";
import { copy } from "react-icons-kit/feather/copy";
import { chevronDown } from "react-icons-kit/feather/chevronDown";
import { chevronUp } from "react-icons-kit/feather/chevronUp";
import { copyToClipboard, copyFromAceEditor } from "utils";
// import "./style.css";

import AceEditor from "react-ace";

import "brace/mode/json";
import "brace/theme/github";

import styles from "./style.module.scss";

class ConnectionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRawData: false
    };
  }

  render() {
    const { activeConnection, activeConnections } = this.props;

    const serverInfo =
      activeConnections[activeConnection] &&
      activeConnections[activeConnection].info;

      console.log("server infor ", activeConnection, activeConnections, )

    if (!serverInfo || Object.keys(serverInfo).length <= 0) {
      return (
        <AceEditor
          mode="json"
          theme="github"
          height="100%"
          width="100%"
          editorProps={{ $blockScrolling: true }}
        />
      );
    }

    const serverInfoArray = Object.entries(serverInfo);
    const { showRawData } = this.state;
    return (
      <div>
        <div>
          <span className={styles.raw_data}>
            <h3 className={styles.title}>Raw Data</h3>
            <Icon
              size="1.5em"
              onClick={() => this.setState({ showRawData: !showRawData })}
              icon={showRawData ? chevronUp : chevronDown}
            />
          </span>
          {showRawData && (
            <div>
              <Button
                className={styles.copy_btn}
                onClick={() => {
                  console.log("clicked copy", copyToClipboard)
                  copyFromAceEditor(this.aceEditor.editor)
                }
                }
              >
                Copy
                <Icon icon={copy} />
              </Button>
              <AceEditor
                mode="json"
                theme="github"
                width="100%"
                ref={ref => (this.aceEditor = ref)}
                className={styles.ace_border}
                value={JSON.stringify(serverInfo, null, 4)}
                editorProps={{ $blockScrolling: true }}
              />
            </div>
          )}
        </div>
        {serverInfoArray.map(serverInfo => {
          const title = serverInfo[0];
          const info = Object.entries(serverInfo[1]);
          return (
            <div>
              <h3 className={styles.title}>{title}</h3>
              <table>
                {info.map(([key, value]) => (
                  <tr>
                    <td>{key}</td>
                    <td>
                      {typeof value === "object"
                        ? JSON.stringify(value)
                        : value}
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          );
        })}
      </div>
    );
  }
}

ConnectionDetails.propTypes = {
  activeConnection: PropTypes.string,
  active_connections: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = state => ({
  activeConnection: state.redis.active_connection,
  activeConnections: state.redis.active_connections
});

export default connect(mapStateToProps)(ConnectionDetails);
