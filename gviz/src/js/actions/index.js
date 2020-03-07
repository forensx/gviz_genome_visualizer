// src/js/actions/index.js
import { GET_PROJECTS } from "../constants/action-types";

export const getProjectsRedux = payload => ({
  type: GET_PROJECTS,
  payload
});

// one function per possible state action
