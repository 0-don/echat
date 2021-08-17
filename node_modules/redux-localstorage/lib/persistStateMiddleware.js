'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = persistStateMiddleware;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _actionTypesJs = require('./actionTypes.js');

var _actionTypesJs2 = _interopRequireDefault(_actionTypesJs);

function persistStateMiddleware(storage) {
  var key = arguments.length <= 1 || arguments[1] === undefined ? 'redux-localstorage' : arguments[1];

  return function (store) {
    function persistState() {
      storage.put(key, store.getState(), function (err) {
        if (err) console.error('Unable to persist state to storage:', err); // eslint-disable-line no-console
      });
    }

    return function (next) {
      return function (action) {
        var result = next(action);

        if (action.type !== _actionTypesJs2['default'].INIT) {
          persistState();
        }

        return result;
      };
    };
  };
}

module.exports = exports['default'];