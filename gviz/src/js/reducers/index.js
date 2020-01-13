// src/js/reducers/index.js
import { ADD_EXPERIMENT, TOGGLE_SIDEBAR, TOGGLE_EXPERIMENTMODAL } from "../constants/action-types";

// the reducer pulls actions from action-types

const initialState = {
  experiments: [],
  sidebarVisibility: true,
  experimentModalVisibility: false
};

// the reducer sets an initial state

function rootReducer(state = initialState, action) {
  if (action.type === ADD_EXPERIMENT) {
    return Object.assign({}, state, {
      articles: state.experiments.concat(action.payload)
    });
  }
  else if (action.type === TOGGLE_SIDEBAR) {
    return Object.assign({}, state, {
      sidebarVisibility: !state.sidebarVisibility
    });
  }
  else if (action.type === TOGGLE_EXPERIMENTMODAL) {
    return Object.assign({}, state, {
      experimentModalVisibility: !state.experimentModalVisibility
    });
  }
  return state;
}

// the reducer takes an action and state. it then triggers an action usinf defined action types and concats the new state to prev state (we can not mutate in place)
// it then returns the new state to whatever calls it

export default rootReducer;