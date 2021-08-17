'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _transformStateJs = require('../../transformState.js');

var _transformStateJs2 = _interopRequireDefault(_transformStateJs);

var _adapterJs = require('./adapter.js');

var _adapterJs2 = _interopRequireDefault(_adapterJs);

exports['default'] = function (storage) {
  return (0, _transformStateJs2['default'])(JSON.stringify, JSON.parse)((0, _adapterJs2['default'])(storage));
};

module.exports = exports['default'];