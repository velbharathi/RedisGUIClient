import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import classnames from "classnames";
import { chevronRight } from "react-icons-kit/feather/chevronRight";
import { chevronDown } from "react-icons-kit/feather/chevronDown";
import { refreshCw } from "react-icons-kit/feather/refreshCw";
import Icon from "components/icon";
import {
  fetchHosts,
  fetchServerInfo,
  setActiveConnection,
  fetchDatabases,
  toggleDatabasesView
} from "./actions";
import ToolTip from "components/tooltip";
import DatabasesList from "./database_list";
import styles from "./style.module.scss";

class Connections extends Component {
  propTypes = {
    connections: PropTypes.arrayOf(PropTypes.string),
    fetchConnections: PropTypes.func,
    setActiveConnection: PropTypes.func,
    hosts: PropTypes.object
  };

  defaultProps = {
    connections: []
  };

  componentDidMount() {
    const { fetchHosts } = this.props;
    fetchHosts();
    fetchDatabases("localhost");
  }

  render() {
    console.log("state", this.state, this);
    const {
      hosts,
      fetchServerInfo,
      active_connections,
      toggleDatabasesView
    } = this.props;
    console.log("HOsts", hosts);
    return (
      <div className={styles.connections_container}>
        <div className={styles.connections_header}>Available Connections</div>
        <ul className={styles.no_ul}>
          {Object.keys(hosts).map(hostname => {
            const isActiveConnections = active_connections[hostname];
            return (
              <li>
                <span className={styles.display_flex}>
                  {isActiveConnections && (
                    <Icon
                      onClick={() => toggleDatabasesView(hostname)}
                      icon={
                        isActiveConnections.show_databases
                          ? chevronDown
                          : chevronRight
                      }
                    />
                  )}
                  <ToolTip message={hostname}>
                    <span
                      onClick={() => fetchServerInfo(hostname)}
                      className={classnames("nowarp", styles.hostname, {
                        [styles.active_hosts]: isActiveConnections
                      })}
                    >
                      {hostname}
                    </span>
                  </ToolTip>
                  {isActiveConnections && (
                    <Icon
                      className={styles.padding_left_two}
                      onClick={() => fetchServerInfo(hostname)}
                      icon={refreshCw}
                    />
                  )}
                </span>
                {isActiveConnections && isActiveConnections.show_databases && (
                  <DatabasesList
                    info={isActiveConnections.info}
                    host={hostname}
                    connection={active_connections[hostname]}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hosts: state.redis.hosts,
  active_connections: state.redis.active_connections
});

const mapDispatchToProps = dispatch => ({
  fetchHosts: bindActionCreators(fetchHosts, dispatch),
  fetchServerInfo: bindActionCreators(fetchServerInfo, dispatch),
  setActiveConnection: bindActionCreators(setActiveConnection, dispatch),
  toggleDatabasesView: bindActionCreators(toggleDatabasesView, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Connections);
