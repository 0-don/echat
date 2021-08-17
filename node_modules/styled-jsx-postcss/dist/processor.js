'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _postcssLoadPlugins = require('postcss-load-plugins');

var _postcssLoadPlugins2 = _interopRequireDefault(_postcssLoadPlugins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

let plugins;
let processor;

exports.default = (() => {
  var _ref = _asyncToGenerator(function* (src) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (!plugins) {
      const pluginsInfo = yield (0, _postcssLoadPlugins2.default)(options.env || process.env);
      plugins = pluginsInfo.plugins;
    }
    if (!processor) {
      processor = (0, _postcss2.default)(plugins);
    }
    const result = yield processor.process(src, {
      map: {
        inline: false,
        annotation: false
      }
    });
    return result.css;
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})();