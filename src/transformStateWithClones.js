'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const ACTIONS = { addProperties, removeProperties, clear };
  const history = [];
  let currentState = { ...state };

  for (const action of actions) {
    currentState = ACTIONS[action.type](currentState, action);
    history.push({ ...currentState });
  }

  return history;
}

function addProperties(state, action) {
  return { ...state, ...action.extraData };
}

function removeProperties(state, action) {
  const newState = { ...state };

  action.keysToRemove.forEach((key) => delete newState[key]);

  return newState;
}

function clear(state) {
  return {};
}

module.exports = transformStateWithClones;
