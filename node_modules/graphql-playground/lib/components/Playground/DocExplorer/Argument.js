"use strict";

var _style = require("styled-jsx/style");

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var graphql_1 = require("graphql");
var TypeLink_1 = require("./TypeLink");
function Argument(_a) {
  var arg = _a.arg,
      showDefaultValue = _a.showDefaultValue,
      x = _a.x,
      y = _a.y,
      sessionId = _a.sessionId;
  return React.createElement(
    "span",
    { className: "arg", "data-jsx": 1496810799
    },
    React.createElement(_style2.default, {
      styleId: 1496810799,
      css: ".arg[data-jsx=\"1496810799\"]:after {content: '';}"
    }),
    React.createElement(TypeLink_1.default, { type: arg, x: x, y: y, sessionId: sessionId, afterNode: arg.defaultValue !== undefined && showDefaultValue !== false && React.createElement(
        "span",
        {
          "data-jsx": 1496810799
        },
        ' = ',
        React.createElement(
          "span",
          { className: "arg-default-value", "data-jsx": 1496810799
          },
          graphql_1.print(graphql_1.astFromValue(arg.defaultValue, arg.type))
        )
      ) })
  );
}
exports.default = Argument;
//# sourceMappingURL=Argument.jsx.map