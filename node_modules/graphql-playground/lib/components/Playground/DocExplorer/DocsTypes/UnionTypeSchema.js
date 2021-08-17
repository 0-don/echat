"use strict";

var _style = require("styled-jsx/style");

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var UnionTypeSchema = function UnionTypeSchema(_a) {
  var schema = _a.schema,
      type = _a.type;
  var types = schema.getPossibleTypes(type);
  return React.createElement(
    "div",
    { className: "doc-type-schema", "data-jsx": 896998132
    },
    React.createElement(_style2.default, {
      styleId: 896998132,
      css: ".ph16,\n.doc-type-schema[data-jsx=\"896998132\"],\n.doc-value[data-jsx=\"896998132\"] {padding-left: 16px;padding-right: 16px\n}.pt20,\n.doc-type-schema[data-jsx=\"896998132\"] {padding-top: 20px\n}.overflowAuto,\n.doc-type-schema[data-jsx=\"896998132\"] {overflow: auto\n}.f14,\n.doc-type-schema[data-jsx=\"896998132\"] {font-size: 14px\n}.ph16,\n.doc-type-schema[data-jsx=\"896998132\"],\n.doc-value[data-jsx=\"896998132\"] {padding-left: 16px;padding-right: 16px\n}"
    }),
    React.createElement(
      "span",
      { className: "field-name", "data-jsx": 896998132
      },
      "union"
    ),
    ' ',
    React.createElement(
      "span",
      { className: "type-name", "data-jsx": 896998132
      },
      type.name
    ),
    ' = ',
    types.map(function (value, index) {
      return React.createElement(
        "div",
        { key: value.name, className: "doc-value", "data-jsx": 896998132
        },
        React.createElement(
          "span",
          { className: "type-name", "data-jsx": 896998132
          },
          value.name
        ),
        ' ',
        index < types.length - 1 && React.createElement(
          "span",
          {
            "data-jsx": 896998132
          },
          "|"
        )
      );
    })
  );
};
exports.default = UnionTypeSchema;
//# sourceMappingURL=UnionTypeSchema.jsx.map