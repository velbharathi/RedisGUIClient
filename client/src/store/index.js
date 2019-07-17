import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers";

export default function configureStore() {
  console.log("in store")
  return createStore(rootReducer, applyMiddleware(thunk));
}
