'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = transformState;

function transformState(down, up) {
  var finalDown = typeof down === 'function' ? [down] : down;

  var finalUp = typeof up === 'function' ? [up] : up;

  return function (storage) {
    return _extends({}, storage, {

      put: function put(key, state, callback) {
        var transformedState = finalDown ? finalDown.reduce(function (s, t) {
          return t(s);
        }, state) : state;

        storage.put(key, transformedState, callback);
      },

      get: function get(key, callback) {
        storage.get(key, function (err, state) {
          if (err || !state) return callback(err, state);

          var transformedState = finalUp ? finalUp.reduce(function (s, t) {
            return t(s);
          }, state) : state;

          callback(null, transformedState);
        });
      }
    });
  };
}

module.exports = exports['default'];