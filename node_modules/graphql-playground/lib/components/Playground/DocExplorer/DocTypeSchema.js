"use strict";

var _style = require("styled-jsx/style");

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var TypeLink_1 = require("./TypeLink");
var DocTypeSchema = function DocTypeSchema(_a) {
  var type = _a.type,
      fields = _a.fields,
      interfaces = _a.interfaces,
      level = _a.level,
      sessionId = _a.sessionId;
  var nonDeprecatedFields = fields.filter(function (data) {
    return !data.isDeprecated;
  });
  var deprecatedFields = fields.filter(function (data) {
    return data.isDeprecated;
  });
  return React.createElement(
    "div",
    { className: "doc-type-schema", "data-jsx": 616352273
    },
    React.createElement(_style2.default, {
      styleId: 3162841368,
      css: "\n        .doc-type-schema .doc-category-item {\n          padding-left: 32px;\n        }\n        .doc-type-interface .field-name {\n          color: rgb(245, 160, 0);\n        }\n        .doc-type-interface .type-name {\n          color: #f25c54;\n        }\n      "
    }),
    React.createElement(_style2.default, {
      styleId: 3740414380,
      css: ".doc-type-schema-line[data-jsx=\"616352273\"] {white-space: nowrap;}.doc-value-comment[data-jsx=\"616352273\"] {padding-left: 32px;}.type-line[data-jsx=\"616352273\"] .type-name[data-jsx=\"616352273\"] {color: #f25c54;}.overflowAuto,\n.doc-type-schema[data-jsx=\"616352273\"] {overflow: auto;}.f14,\n.doc-type-schema[data-jsx=\"616352273\"] {font-size: 14px;}.ph16,\n.doc-type-schema-line[data-jsx=\"616352273\"] {padding-left: 16px;padding-right: 16px;}.pv6,\n.doc-type-schema-line[data-jsx=\"616352273\"] {padding-top: 6px;padding-bottom: 6px;}.pr16,\n.doc-value-comment[data-jsx=\"616352273\"] {padding-right: 16px;}.black50,\n.doc-value-comment[data-jsx=\"616352273\"] {color: rgba(0,0,0,.5);}.pl16,\n.doc-type-interface[data-jsx=\"616352273\"] {padding-left: 16px;}.darkBlue50,\n.brace[data-jsx=\"616352273\"] {color: rgba(23,42,58,.5);}.fw6,\n.brace[data-jsx=\"616352273\"] {font-weight: 600;}"
    }),
    React.createElement(
      "div",
      { className: "doc-type-schema-line type-line", "data-jsx": 616352273
      },
      React.createElement(
        "span",
        { className: "field-name", "data-jsx": 616352273
        },
        "type"
      ),
      ' ',
      React.createElement(
        "span",
        { className: "type-name", "data-jsx": 616352273
        },
        type.name
      ),
      ' ',
      interfaces.length === 0 && React.createElement(
        "span",
        { className: "brace", "data-jsx": 616352273
        },
        "{"
      )
    ),
    interfaces.map(function (data, index) {
      return React.createElement(TypeLink_1.default, { key: data.name, type: data, x: level, y: index, collapsable: true, className: "doc-type-interface", beforeNode: React.createElement(
          "span",
          { className: "field-name", "data-jsx": 616352273
          },
          "implements"
        ), afterNode: index === interfaces.length - 1 ? React.createElement(
          "span",
          { className: "brace", "data-jsx": 616352273
          },
          '{'
        ) : null, sessionId: sessionId });
    }),
    nonDeprecatedFields.map(function (data, index) {
      return React.createElement(TypeLink_1.default, { key: data.name, type: data, x: level, y: index + interfaces.length, collapsable: true, sessionId: sessionId });
    }),
    deprecatedFields.length > 0 && React.createElement("br", {
      "data-jsx": 616352273
    }),
    deprecatedFields.map(function (data, index) {
      return React.createElement(
        "div",
        { key: data.name, "data-jsx": 616352273
        },
        React.createElement(
          "span",
          { className: "doc-value-comment", "data-jsx": 616352273
          },
          "# Deprecated: ",
          data.deprecationReason
        ),
        React.createElement(TypeLink_1.default, { type: data, x: level, y: index + nonDeprecatedFields.length + interfaces.length, collapsable: true, sessionId: sessionId })
      );
    }),
    React.createElement(
      "div",
      { className: "doc-type-schema-line type-line", "data-jsx": 616352273
      },
      React.createElement(
        "span",
        { className: "brace", "data-jsx": 616352273
        },
        '}'
      )
    )
  );
};
exports.default = DocTypeSchema;
//# sourceMappingURL=DocTypeSchema.jsx.map