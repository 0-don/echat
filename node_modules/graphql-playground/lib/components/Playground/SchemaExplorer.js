"use strict";

var _style = require("styled-jsx/style");

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var QueryEditor_1 = require("./QueryEditor");
function SchemaExplorer(_a) {
  var idl = _a.idl,
      modelName = _a.modelName;
  return React.createElement(
    "div",
    { className: "schema-explorer", "data-jsx": 3889923712
    },
    React.createElement(_style2.default, {
      styleId: 3889923712,
      css: ".header[data-jsx=\"3889923712\"] {letter-spacing: 0.6px;}.h100,\n.schema-explorer[data-jsx=\"3889923712\"] {height: 100%;}.flex,\n.schema-explorer[data-jsx=\"3889923712\"] {display: -ms-flexbox;display: flex;}.flexColumn,\n.schema-explorer[data-jsx=\"3889923712\"] {-ms-flex-direction: column;flex-direction: column;}.bgDarkerBlue,\n.schema-explorer[data-jsx=\"3889923712\"] {background-color: #0f202e;}.flexFixed,\n.header[data-jsx=\"3889923712\"] {-ms-flex: 0 0 auto;flex: 0 0 auto;}.f16,\n.header[data-jsx=\"3889923712\"] {font-size: 16px;}.fw6,\n.header[data-jsx=\"3889923712\"] {font-weight: 600;}.pt16,\n.header[data-jsx=\"3889923712\"] {padding-top: 16px;}.pl16,\n.header[data-jsx=\"3889923712\"] {padding-left: 16px;}.pr16,\n.header[data-jsx=\"3889923712\"] {padding-right: 16px;}.white40,\n.header[data-jsx=\"3889923712\"] {color: hsla(0,0%,100%,.4);}.ttu,\n.header[data-jsx=\"3889923712\"] {text-transform: uppercase;}.dn,\n.schema-explorer[data-jsx=\"3889923712\"] .CodeMirror-cursor {display: none;}"
    }),
    React.createElement(
      "div",
      { className: "header", "data-jsx": 3889923712
      },
      "Schema for \u201E",
      modelName,
      "\u201C"
    ),
    React.createElement(QueryEditor_1.QueryEditor, { schema: null, value: idl || '', readOnly: true, hideLineNumbers: true })
  );
}
exports.default = SchemaExplorer;
//# sourceMappingURL=SchemaExplorer.jsx.map