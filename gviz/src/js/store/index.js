import { createStore } from "redux";
import rootReducer from "../reducers/index";

const store = createStore(rootReducer);

// here, the store hosts the rootReducer (reducers.js)

export default store;