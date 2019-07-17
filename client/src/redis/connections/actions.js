import Axios from "axios";

/** *************************************************
 **************** ACTION CONSTANTS *****************
 ************************************************** */
export const ADD_TO_CONNECTIONS = "ADD_TO_CONNECTIONS";
export const SET_ACTIVE_CONNECTION = "SET_ACTIVE_CONNECTION";
export const SET_CONNECTION_INFO = "SET_CONNECTION_INFO";
export const SET_HOSTS = "SET_HOSTS";
export const SET_SERVER_INFO = "FETCH_SERVER_INFO";
export const TOGGLE_DATABASES_VIEW = "TOGGLE_DATABASES_VIEW";
export const SET_KEYS_TO_DATABASE = "SET_KEYS_TO_DATABASE";
export const HIDE_DATABASE = "HIDE_DATABASE";
/** *************************************************
 ************** dispatch return object fns *********
 ************************************************** */

/**
 * @param {String} hosts
 * @returns
 */
function setHosts(hosts) {
  return {
    type: SET_HOSTS,
    hosts
  };
}

function setServerInfo(host, info) {
  console.log("setting server info", host, info);
  return {
    type: SET_SERVER_INFO,
    host,
    info
  };
}

function setConnections(host) {
  return {
    type: ADD_TO_CONNECTIONS,
    host
  };
}

function setConnectionInfo(host, info) {
  return {
    type: SET_CONNECTION_INFO,
    name: host,
    info
  };
}

function setToggleDatabasesView(host) {
  return {
    type: TOGGLE_DATABASES_VIEW,
    host
  };
}

function setKeysToDatabase(host, db, keys) {
  return {
    type: SET_KEYS_TO_DATABASE,
    host,
    db,
    keys
  };
}

function setHideDatabase(host, db) {
  return {
    type: HIDE_DATABASE,
    host,
    db
  };
}

/** ****************************************************
 ****************** Export functions ******************
 ***************************************************** */

/**
 * fetch connection info the selected host
 *
 * @param {String} host
 */
export function fetchConnectionInfo(host) {
  return dispatch => {
    const params = {
      host
    };
    Axios.get("/redis/info", { params }).then(resp => {
      console.log("info", resp.data);
      dispatch(setConnectionInfo(host, resp.data));
    });
  };
}

/**
 * set the selected connection name to show
 * the connection information
 *
 * @export
 * @param {String} host
 * @returns {Dispatch Object}
 */
export function setActiveConnection(host) {
  fetchConnectionInfo(host);
  return {
    type: SET_ACTIVE_CONNECTION,
    host
  };
}

export function toggleDatabasesView(host) {
  return dispatch => dispatch(setToggleDatabasesView(host));
}

/**
 * returns the list of available host names
 *
 * @export
 * @returns {Dispatch Object}
 */
export function fetchHosts() {
  return dispatch =>
    Axios.get("/redis").then(resp => {
      const hosts = {};
      resp.data.forEach(host => {
        hosts[host] = null;
      });
      dispatch(setHosts(hosts));
    });
}

/**
 * fetchs the server info of the given host
 *
 * @export
 * @param {String} host
 * @returns {Dispatch Object}
 */
export function fetchServerInfo(host) {
  return dispatch =>
    Axios.get(`/redis/${host}`).then(resp => {
      dispatch(setConnections(host));
      dispatch(setActiveConnection(host));
      dispatch(setServerInfo(host, resp.data));
    });
}

/**
 *
 *
 * @export
 * @param {*} host
 */
export function fetchDatabases(host) {
  const params = {
    connection_name: host
  };
  Axios.get(`/redis/${host}/db`, { params }).then(resp => {
    console.log("databases", resp.data);
  });
}

export function fetchDatabase(host, db) {
  console.log("in fetch keys");
  return async dispatch => {
    db = db.replace("db", "");
    let response = await Axios.get(`/redis/${host}/db/${db}`);
    let data = response.data;
    console.log("data ", data);

    if ("string" === typeof data) {
      data = data.replace("\\s", "").replace(/]\[/g, ",");
      data = JSON.parse(data);
    }

    console.log(`/redis/${host}/db/${db}`, data);
    dispatch(setKeysToDatabase(host, db, data));
  };;
}

export function hideDatabase(host, db) {
  console.log("in hide db");;
  return dispatch => {
    dispatch(setHideDatabase(host, db));
  };
}
