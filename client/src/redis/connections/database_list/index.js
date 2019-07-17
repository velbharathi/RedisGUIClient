import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./style.module.scss";
import Icon from "components/icon";
import { chevronRight } from "react-icons-kit/feather/chevronRight";
import { chevronDown } from "react-icons-kit/feather/chevronDown";
import { database } from "react-icons-kit/feather/database";
import { feather as key } from "react-icons-kit/feather/feather";
import { fetchDatabase, hideDatabase } from "../actions";

const DatabasesList = ({
  info,
  host,
  fetchDatabase,
  connection,
  hideDatabase
}) => {
  console.log("info", info, connection);

  if (!info) {
    return null;
  }

  let li = Object.entries(info.keyspace).map(([db, details]) => {
    let showKeys = connection[db] && connection[db].is_open;
    return (
      <li>
        <Icon
          icon={showKeys ? chevronDown : chevronRight}
          onClick={() =>
            showKeys ? hideDatabase(host, db) : fetchDatabase(host, db)
          }
        />
        <Icon icon={database} />{`${db} (${details.keys})`}
        {showKeys && (
          <ul className={styles.list_style_none}>
            {connection[db].keys.map(elem => (
              
              <li className={styles.li_key}><span><Icon icon={key} />{elem}</span></li>
            ))}
          </ul>
        )}
      </li>
    );
  });
  return <ul className={styles.db_ul}>{li}</ul>;
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  fetchDatabase: bindActionCreators(fetchDatabase, dispatch),
  hideDatabase: bindActionCreators(hideDatabase, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatabasesList);
