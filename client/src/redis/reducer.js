import { updateObject, createReducer } from "reducers/util";

import {
  ADD_TO_CONNECTIONS,
  SET_ACTIVE_CONNECTION,
  SET_HOSTS,
  SET_SERVER_INFO,
  TOGGLE_DATABASES_VIEW,
  SET_KEYS_TO_DATABASE,
  HIDE_DATABASE
} from "./connections/actions";

const initialState = {
  hosts: {},
  active_connections: {},
  active_connection: null
};

function setHosts(redisState, action) {
  return updateObject(redisState, { hosts: action.hosts });
}

function setServerInfo(redisState, action) {
  let active_connections = redisState.active_connections;
  active_connections[action.host].info = action.info;
  console.log("active aocnec", active_connections, action);
  return updateObject(redisState, { active_connections });
}

function addToConnections(redisState, action) {
  let connections = redisState.active_connections;
  connections[action.host] = connections[action.host]
    ? connections[action.host]
    : {};
  return updateObject(redisState, { active_connections: connections });
}

function setActiveConnection(redisState, action) {

  console.log("done seting active connecitons: ", action)

  return updateObject(redisState, { active_connection: action.host });
}

function toggleDatabasesView(redisState, action) {
  let connections = redisState.active_connections;
  console.log("show databases; ", connections, action)
  connections[action.host].show_databases = !connections[action.host].show_databases;
  return updateObject(redisState, { active_connections: connections });
}

function setKeysToDatabase(redisState, action) {
  let connections = redisState.active_connections;
  connections[action.host][`db${action.db}`] = { is_open: true };
  connections[action.host][`db${action.db}`].keys = action.keys;
  return updateObject(redisState, { active_connections: connections });
}

function hideDatabase(redisState, action){
  console.log("inside hide db: ")
  let connections = redisState.active_connections;
  connections[action.host][`${action.db}`] = { is_open: false };
  return updateObject(redisState, { active_connections: connections });
}

const redisReducer = createReducer(initialState, {
  [SET_HOSTS]: setHosts,
  [SET_SERVER_INFO]: setServerInfo,
  [ADD_TO_CONNECTIONS]: addToConnections,
  [SET_ACTIVE_CONNECTION]: setActiveConnection,
  [TOGGLE_DATABASES_VIEW]: toggleDatabasesView,
  [SET_KEYS_TO_DATABASE]: setKeysToDatabase,
  [HIDE_DATABASE]: hideDatabase
});

export default redisReducer;
