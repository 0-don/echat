"use strict";

var _style = require("styled-jsx/style");

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var EnumTypeSchema = function EnumTypeSchema(_a) {
  var type = _a.type;
  var values = type.getValues();
  var deprecatedValues = values.filter(function (value) {
    return value.isDeprecated;
  });
  return React.createElement(
    "div",
    { className: "doc-type-schema", "data-jsx": 3366725792
    },
    React.createElement(_style2.default, {
      styleId: 3366725792,
      css: ".ph16,\n.doc-type-schema[data-jsx=\"3366725792\"],\n.doc-value[data-jsx=\"3366725792\"] .field-name[data-jsx=\"3366725792\"],\n.doc-value-comment[data-jsx=\"3366725792\"] {padding-left: 16px;padding-right: 16px\n}.pt20,\n.doc-type-schema[data-jsx=\"3366725792\"] {padding-top: 20px\n}.overflowAuto,\n.doc-type-schema[data-jsx=\"3366725792\"] {overflow: auto\n}.f14,\n.doc-type-schema[data-jsx=\"3366725792\"] {font-size: 14px\n}.ph16,\n.doc-type-schema[data-jsx=\"3366725792\"],\n.doc-value[data-jsx=\"3366725792\"] .field-name[data-jsx=\"3366725792\"],\n.doc-value-comment[data-jsx=\"3366725792\"] {padding-left: 16px;padding-right: 16px\n}.ph16,\n.doc-type-schema[data-jsx=\"3366725792\"],\n.doc-value[data-jsx=\"3366725792\"] .field-name[data-jsx=\"3366725792\"],\n.doc-value-comment[data-jsx=\"3366725792\"] {padding-left: 16px;padding-right: 16px\n}.black50,\n.doc-value-comment[data-jsx=\"3366725792\"] {color: rgba(0,0,0,.5)\n}"
    }),
    React.createElement(
      "span",
      { className: "field-name", "data-jsx": 3366725792
      },
      "enum"
    ),
    ' ',
    React.createElement(
      "span",
      { className: "type-name", "data-jsx": 3366725792
      },
      type.name
    ),
    ' ',
    React.createElement(
      "span",
      { className: "brace", "data-jsx": 3366725792
      },
      '{'
    ),
    values.filter(function (value) {
      return !value.isDeprecated;
    }).map(function (value, index) {
      return React.createElement(Value, { key: value.name, first: index === 0, value: value });
    }),
    deprecatedValues.length > 0 && React.createElement("br", {
      "data-jsx": 3366725792
    }),
    deprecatedValues.map(function (value, index) {
      return React.createElement(Value, { first: index === 0, key: value.name, value: value, isDeprecated: true });
    }),
    React.createElement(
      "span",
      { className: "brace", "data-jsx": 3366725792
      },
      '}'
    )
  );
};
exports.default = EnumTypeSchema;
var Value = function Value(_a) {
  var value = _a.value,
      isDeprecated = _a.isDeprecated,
      first = _a.first;
  return React.createElement(
    "div",
    { className: "doc-value" + (first ? ' doc-value--first' : ''), "data-jsx": 1553157550
    },
    React.createElement(_style2.default, {
      styleId: 1553157550,
      css: ".doc-value[data-jsx=\"1553157550\"] {margin-top: 6px;}.doc-value--first[data-jsx=\"1553157550\"] {margin-top: 0px;}.doc-value[data-jsx=\"1553157550\"] .field-name[data-jsx=\"1553157550\"] {color: red;}.ph16,\n.doc-value[data-jsx=\"1553157550\"] .field-name[data-jsx=\"1553157550\"],\n.doc-value-comment[data-jsx=\"1553157550\"] {padding-left: 16px;padding-right: 16px;}.ph16,\n.doc-value[data-jsx=\"1553157550\"] .field-name[data-jsx=\"1553157550\"],\n.doc-value-comment[data-jsx=\"1553157550\"] {padding-left: 16px;padding-right: 16px;}.black50,\n.doc-value-comment[data-jsx=\"1553157550\"] {color: rgba(0,0,0,.5);}"
    }),
    React.createElement(
      "div",
      { className: "field-name", "data-jsx": 1553157550
      },
      value.name
    ),
    value.description && React.createElement(
      "div",
      { className: "doc-value-comment", "data-jsx": 1553157550
      },
      value.description
    ),
    isDeprecated && React.createElement(
      "div",
      { className: "doc-value-comment", "data-jsx": 1553157550
      },
      "Deprecated: ",
      value.deprecationReason
    )
  );
};
//# sourceMappingURL=EnumTypeSchema.jsx.map