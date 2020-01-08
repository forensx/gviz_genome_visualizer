// src/js/actions/index.js
import { ADD_EXPERIMENT, TOGGLE_SIDEBAR } from "../constants/action-types";

export function addExperiment(payload) {
  return { type: ADD_EXPERIMENT, payload };
}

export function toggleSidebar() {
  return { type: TOGGLE_SIDEBAR };
}

// one function per possible state action