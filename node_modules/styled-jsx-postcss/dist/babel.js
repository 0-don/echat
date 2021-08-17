'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (_ref) {
  let t = _ref.types;

  const getCss = exprPath => {
    const node = exprPath.node;

    if (t.isStringLiteral(node)) {
      return {
        path: exprPath,
        source: node.value
      };
    }

    if (node.expressions.length === 0) {
      return {
        path: exprPath,
        source: node.quasis[0].value.cooked
      };
    }

    let source = '';
    const replacements = [];
    node.expressions.forEach((e, i) => {
      const r = `___styledjsxexpression${i}___`;
      source += node.quasis[i].value.cooked + r;
      replacements.push({
        replacement: r,
        initial: `$\{${(0, _babelGenerator2.default)(e).code}}`
      });
    });
    source += node.quasis[node.quasis.length - 1].value.cooked;

    return {
      path: exprPath,
      replacements,
      source
    };
  };

  const makeExpression = (src, isTemplateLiteral) => {
    if (!isTemplateLiteral) {
      return t.stringLiteral(src);
    }
    // build the expression from src
    let css;
    (0, _babelTraverse2.default)((0, _babylon.parse)(`\`${src}\``), {
      TemplateLiteral(path) {
        if (!css) {
          css = path.node;
        }
      }
    });
    return css;
  };

  return {
    inherits: _babel2.default,
    visitor: {
      JSXOpeningElement: {
        enter(path) {
          var _path$get = path.get('name');

          const node = _path$get.node;
          const name = node.name;

          if (!t.isJSXIdentifier(node) || name !== STYLE_COMPONENT) {
            return;
          }

          const processing = path
          // get the attribute containing the css
          .get('attributes').filter((_ref2) => {
            let node = _ref2.node;
            return node.name.name === STYLE_COMPONENT_CSS;
          })
          // get the value's expression
          .map(cssPath => cssPath.get('value').get('expression'))
          // get the css
          .map(getCss)
          // process the css
          .map((() => {
            var _ref3 = _asyncToGenerator(function* (css) {
              const source = yield (0, _processor2.default)(css.source);
              return _extends({}, css, {
                source
              });
            });

            return function (_x) {
              return _ref3.apply(this, arguments);
            };
          })());

          let css;
          let wait = true;
          function resolved(result) {
            css = result;
            wait = false;
          }
          Promise.all(processing).then(resolved).catch(resolved);
          (0, _deasync.loopWhile)(() => wait);

          if (css instanceof Error || css.name === 'CssSyntaxError') {
            throw css;
          }

          // remove placeholders
          // and convert source to JSXExpressionContainer
          css.map((_ref4) => {
            let path = _ref4.path,
                replacements = _ref4.replacements,
                source = _ref4.source;
            return {
              path,
              replacement: makeExpression(replacements ? replacePlaceholders(replacements, source) : source, Boolean(replacements))
            };
          })
          // replace the path
          .forEach(replace);
        }
      }
    }
  };
};

var _babylon = require('babylon');

var _babel = require('styled-jsx/babel');

var _babel2 = _interopRequireDefault(_babel);

var _babelGenerator = require('babel-generator');

var _babelGenerator2 = _interopRequireDefault(_babelGenerator);

var _babelTraverse = require('babel-traverse');

var _babelTraverse2 = _interopRequireDefault(_babelTraverse);

var _deasync = require('deasync');

var _processor = require('./processor');

var _processor2 = _interopRequireDefault(_processor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const STYLE_COMPONENT = '_JSXStyle';
const STYLE_COMPONENT_CSS = 'css';

function replacePlaceholders(replacements, src) {
  return replacements.reduce((src, currentReplacement) => {
    src = src.replace(currentReplacement.replacement, currentReplacement.initial);
    return src;
  }, src);
}

function replace(_ref5) {
  let path = _ref5.path,
      replacement = _ref5.replacement;

  path.replaceWith(replacement);
}