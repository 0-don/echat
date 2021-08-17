"use strict";

var _style = require("styled-jsx/style");

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var QueryHeader = function QueryHeader(_a) {
  var onPrettify = _a.onPrettify,
      showQueryTitle = _a.showQueryTitle;
  return React.createElement(
    "div",
    { className: "query-header", "data-jsx": 2288579073
    },
    React.createElement(_style2.default, {
      styleId: 2288579073,
      css: ".graphiql-button[data-jsx=\"2288579073\"] {margin-right: 33px;padding: 5px 9px 6px 9px;letter-spacing: 0.53px;}.bgDarkerBlue,\n.query-header[data-jsx=\"2288579073\"] {background-color: #0f202e;}.pa25,\n.query-header[data-jsx=\"2288579073\"] {padding: 25px;}.flex,\n.query-header[data-jsx=\"2288579073\"] {display: -ms-flexbox;display: flex;}.justifyBetween,\n.query-header[data-jsx=\"2288579073\"] {-ms-flex-pack: justify;justify-content: space-between;}.itemsCenter,\n.query-header[data-jsx=\"2288579073\"] {-webkit-box-align: center;-ms-flex-align: center;-ms-grid-row-align: center;align-items: center;}.white50,\n.graphiql-button[data-jsx=\"2288579073\"] {color: hsla(0,0%,100%,.5);}.bgDarkBlue,\n.graphiql-button[data-jsx=\"2288579073\"] {background-color: #172a3a;}.ttu,\n.graphiql-button[data-jsx=\"2288579073\"] {text-transform: uppercase;}.f14,\n.graphiql-button[data-jsx=\"2288579073\"] {font-size: 14px;}.fw6,\n.graphiql-button[data-jsx=\"2288579073\"] {font-weight: 600;}.br2,\n.graphiql-button[data-jsx=\"2288579073\"] {border-radius: 2px;}.pointer:hover,\n.graphiql-button[data-jsx=\"2288579073\"]:hover {cursor: pointer;}"
    }),
    showQueryTitle && React.createElement(
      "div",
      { className: "editor-title", "data-jsx": 2288579073
      },
      "Query"
    ),
    React.createElement(
      "div",
      { className: "graphiql-button", onClick: onPrettify, "data-jsx": 2288579073
      },
      "Prettify"
    )
  );
};
exports.default = QueryHeader;
//# sourceMappingURL=QueryHeader.jsx.map