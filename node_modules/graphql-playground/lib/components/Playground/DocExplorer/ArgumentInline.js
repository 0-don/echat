"use strict";

var _style = require("styled-jsx/style");

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var graphql_1 = require("graphql");
function Argument(_a) {
  var arg = _a.arg,
      showDefaultValue = _a.showDefaultValue;
  return React.createElement(
    "div",
    { className: "arg", "data-jsx": 2752276064
    },
    React.createElement(_style2.default, {
      styleId: 2752276064,
      css: ".ml16,\n.arg[data-jsx=\"2752276064\"] {\n    margin-left: 16px\n}"
    }),
    React.createElement(
      "span",
      { className: "arg-name", "data-jsx": 2752276064
      },
      arg.name
    ),
    ': ',
    React.createElement(
      "span",
      { className: "type-name", "data-jsx": 2752276064
      },
      renderType(arg.type)
    ),
    arg.defaultValue !== undefined && showDefaultValue !== false && React.createElement(
      "span",
      {
        "data-jsx": 2752276064
      },
      ' = ',
      React.createElement(
        "span",
        { className: "arg-default-value", "data-jsx": 2752276064
        },
        graphql_1.print(graphql_1.astFromValue(arg.defaultValue, arg.type))
      )
    )
  );
}
exports.default = Argument;
function renderType(type) {
  if (type instanceof graphql_1.GraphQLNonNull) {
    return React.createElement(
      "span",
      null,
      renderType(type.ofType),
      '!'
    );
  }
  if (type instanceof graphql_1.GraphQLList) {
    return React.createElement(
      "span",
      null,
      '[',
      renderType(type.ofType),
      ']'
    );
  }
  return React.createElement(
    "span",
    null,
    type.name
  );
}
//# sourceMappingURL=ArgumentInline.jsx.map