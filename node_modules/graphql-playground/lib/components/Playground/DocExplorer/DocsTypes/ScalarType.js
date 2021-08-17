"use strict";

var _style = require("styled-jsx/style");

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ScalarTypeSchema = function ScalarTypeSchema(_a) {
  var type = _a.type;
  return React.createElement(
    "div",
    { className: "doc-type-schema", "data-jsx": 2805731928
    },
    React.createElement(_style2.default, {
      styleId: 2805731928,
      css: ".ph16,\n.doc-type-schema[data-jsx=\"2805731928\"] {\n    padding-left: 16px;\n    padding-right: 16px\n}\n.pt20,\n.doc-type-schema[data-jsx=\"2805731928\"] {\n    padding-top: 20px\n}\n.overflowAuto,\n.doc-type-schema[data-jsx=\"2805731928\"] {\n    overflow: auto\n}\n.f14,\n.doc-type-schema[data-jsx=\"2805731928\"] {\n    font-size: 14px\n}"
    }),
    React.createElement(
      "span",
      { className: "field-name", "data-jsx": 2805731928
      },
      "scalar"
    ),
    ' ',
    React.createElement(
      "span",
      { className: "type-name", "data-jsx": 2805731928
      },
      type.name
    )
  );
};
exports.default = ScalarTypeSchema;
//# sourceMappingURL=ScalarType.jsx.map