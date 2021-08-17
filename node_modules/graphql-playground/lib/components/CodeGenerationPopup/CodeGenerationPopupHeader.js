"use strict";

var _style = require("styled-jsx/style");

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react"); // tslint:disable-line
var graphcool_styles_1 = require("graphcool-styles");
var cx = require("classnames");
exports.default = function (props) {
  return React.createElement(
    "div",
    { className: cx(graphcool_styles_1.$p.flex, graphcool_styles_1.$p.justifyCenter, graphcool_styles_1.$p.black, graphcool_styles_1.$p.itemsCenter, graphcool_styles_1.$p.w100, 'container'), "data-jsx": 3419975726
    },
    React.createElement(_style2.default, {
      styleId: 3419975726,
      css: ".container[data-jsx=\"3419975726\"] {height: 103px;}"
    }),
    React.createElement(
      "div",
      { className: cx(graphcool_styles_1.$p.f25, graphcool_styles_1.$p.fw3, graphcool_styles_1.$p.flex, graphcool_styles_1.$p.flexRow, graphcool_styles_1.$p.itemsCenter), "data-jsx": 3419975726
      },
      "Generate Code for your",
      React.createElement(
        "div",
        { className: cx(graphcool_styles_1.$p.fw6, graphcool_styles_1.$p.ml6), "data-jsx": 3419975726
        },
        props.queryActive ? 'Query' : 'Mutation'
      )
    )
  );
};
//# sourceMappingURL=CodeGenerationPopupHeader.jsx.map