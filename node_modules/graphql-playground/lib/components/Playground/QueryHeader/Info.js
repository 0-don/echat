"use strict";

var _style = require("styled-jsx/style");

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Info = function Info(props) {
  return React.createElement(
    "div",
    { className: "info", "data-jsx": 3557341422
    },
    React.createElement(_style2.default, {
      styleId: 3557341422,
      css: ".question-mark[data-jsx=\"3557341422\"] {width: 18px;height: 18px;}.tooltip[data-jsx=\"3557341422\"] {z-index: 20;width: 250px;padding-top: 5px;left: -50px;}.tooltip-content[data-jsx=\"3557341422\"][data-jsx=\"3557341422\"]:before {content: \"\";top: -4px;left: 55px;-webkit-transform: rotate(45deg);transform: rotate(45deg);width: 8px;height: 8px;}.bgWhite10,\n.question-mark[data-jsx=\"3557341422\"] {background-color: hsla(0,0%,100%,.1);}.flex,\n.question-mark[data-jsx=\"3557341422\"] {display: -ms-flexbox;display: flex;}.itemsCenter,\n.question-mark[data-jsx=\"3557341422\"] {-webkit-box-align: center;-ms-flex-align: center;-ms-grid-row-align: center;align-items: center;}.justifyCenter,\n.question-mark[data-jsx=\"3557341422\"] {-ms-flex-pack: center;justify-content: center;}.white40,\n.question-mark[data-jsx=\"3557341422\"] {color: hsla(0,0%,100%,.4);}.f12,\n.question-mark[data-jsx=\"3557341422\"] {font-size: 12px;}.fw6,\n.question-mark[data-jsx=\"3557341422\"] {font-weight: 600;}.br100,\n.question-mark[data-jsx=\"3557341422\"] {border-radius: 100%;}.pointer:hover,\n.question-mark[data-jsx=\"3557341422\"]:hover {cursor: pointer;}.dn,\n.tooltip[data-jsx=\"3557341422\"] {display: none;}.absolute,\n.tooltip[data-jsx=\"3557341422\"],\n.tooltip-content[data-jsx=\"3557341422\"][data-jsx=\"3557341422\"]:before {position: absolute;}.br2,\n.tooltip-content[data-jsx=\"3557341422\"] {border-radius: 2px;}.bgWhite,\n.tooltip-content[data-jsx=\"3557341422\"],\n.tooltip-content[data-jsx=\"3557341422\"][data-jsx=\"3557341422\"]:before {background-color: #fff;}.pa16,\n.tooltip-content[data-jsx=\"3557341422\"] {padding: 16px;}.black50,\n.tooltip-content[data-jsx=\"3557341422\"] {color: rgba(0,0,0,.5);}.f14,\n.tooltip-content[data-jsx=\"3557341422\"] {font-size: 14px;}.fw4,\n.tooltip-content[data-jsx=\"3557341422\"] {font-weight: 400;}.relative,\n.tooltip-content[data-jsx=\"3557341422\"],\n.info[data-jsx=\"3557341422\"] {position: relative;}.absolute,\n.tooltip[data-jsx=\"3557341422\"],\n.tooltip-content[data-jsx=\"3557341422\"][data-jsx=\"3557341422\"]:before {position: absolute;}.bgWhite,\n.tooltip-content[data-jsx=\"3557341422\"],\n.tooltip-content[data-jsx=\"3557341422\"][data-jsx=\"3557341422\"]:before {background-color: #fff;}.ml10,\n.info[data-jsx=\"3557341422\"] {margin-left: 10px;}.relative,\n.tooltip-content[data-jsx=\"3557341422\"],\n.info[data-jsx=\"3557341422\"] {position: relative;}.db,\n.info[data-jsx=\"3557341422\"][data-jsx=\"3557341422\"]:hover .tooltip[data-jsx=\"3557341422\"] {display: block;}.bgBlue,\n.info[data-jsx=\"3557341422\"][data-jsx=\"3557341422\"]:hover .question-mark[data-jsx=\"3557341422\"] {background-color: #2a7ed2;}.white,\n.info[data-jsx=\"3557341422\"][data-jsx=\"3557341422\"]:hover .question-mark[data-jsx=\"3557341422\"] {color: #fff;}"
    }),
    React.createElement(
      "div",
      { className: "question-mark", "data-jsx": 3557341422
      },
      "?"
    ),
    React.createElement(
      "div",
      { className: "tooltip", "data-jsx": 3557341422
      },
      React.createElement(
        "div",
        { className: "tooltip-content", "data-jsx": 3557341422
        },
        props.children
      )
    )
  );
};
exports.default = Info;
//# sourceMappingURL=Info.jsx.map