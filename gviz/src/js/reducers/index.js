// src/js/reducers/index.js
import { ADD_ARTICLE } from "../constants/action-types";

// the reducer pulls actions from action-types

const initialState = {
  articles: []
};

// the reducer sets an initial state

function rootReducer(state = initialState, action) {
  if (action.type === ADD_ARTICLE) {
    return Object.assign({}, state, {
      articles: state.articles.concat(action.payload)
    });
  }
  return state;
}

// the reducer takes an action and state. it then triggers an action usinf defined action types and concats the new state to prev state (we can not mutate in place)
// it then returns the new state to whatever calls it

export default rootReducer;