'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = mergePersistedState;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _actionTypesJs = require('./actionTypes.js');

var _actionTypesJs2 = _interopRequireDefault(_actionTypesJs);

/**
 * @description
 * mergePersistedState is a higher order reducer used to initialise
 * redux-localstorage to rehydrate the store by merging the application's initial
 * state with any persisted state.
 *
 * @param {Function} [merge = (i, p) => ({...i, ...p})] Function that merges the
 * initial state and persisted state and returns the result.
 *
 * @returns {Object} The new store state after passing through all reducers.
 */

function mergePersistedState() {
  var merge = arguments.length <= 0 || arguments[0] === undefined ? function (i, p) {
    return _extends({}, i, p);
  } : arguments[0];

  return function (next) {
    return function (state, action) {
      var finalState = action.type === _actionTypesJs2['default'].INIT && action.payload ? merge(state, action.payload) : state;

      return next(finalState, action);
    };
  };
}

module.exports = exports['default'];