'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = bufferActions;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _actionTypesJs = require('./actionTypes.js');

var _actionTypesJs2 = _interopRequireDefault(_actionTypesJs);

/*
 * Middleware for intercepting and queueing actions until actionTypes.INIT
 * has been dispatched. This action will be dispatched first, followed by
 * any queued actions in the order they were originally dispatched.
 */

function bufferActions() {
  var type = arguments.length <= 0 || arguments[0] === undefined ? _actionTypesJs2['default'].INIT : arguments[0];

  var buffer = true;
  var queue = [];

  return function () {
    return function (next) {
      return function (action) {
        if (!buffer) return next(action);

        if (action.type === type) {
          buffer = false;
          next(action);
          queue.forEach(function (queuedAction) {
            next(queuedAction);
          });
          queue = null;
        } else {
          queue.push(action);
        }

        return action;
      };
    };
  };
}

module.exports = exports['default'];