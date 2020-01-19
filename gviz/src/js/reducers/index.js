// src/js/reducers/index.js
import { GET_PROJECTS } from "../constants/action-types";

// the reducer pulls actions from action-types

const initialState = {
  projects: []
};

// the reducer sets an initial state

function rootReducer(state = initialState, action) {
  if (action.type === GET_PROJECTS) {
    return Object.assign({}, state, {
      projects: state.projects.concat(action.payload)
    });
  }

  return state;
}

// the reducer takes an action and state. it then triggers an action usinf defined action types and concats the new state to prev state (we can not mutate in place)
// it then returns the new state to whatever calls it

export default rootReducer;
