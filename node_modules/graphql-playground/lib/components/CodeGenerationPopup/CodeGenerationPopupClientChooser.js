"use strict";

var _style = require("styled-jsx/style");

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var graphcool_styles_1 = require("graphcool-styles");
var cx = require("classnames");
var calculate_size_1 = require("calculate-size");
/* tslint:disable */
var Chooser = function Chooser(props) {
  return React.createElement(
    "div",
    { className: cx(graphcool_styles_1.$p.bb, graphcool_styles_1.$p.bt, graphcool_styles_1.$p.bl, graphcool_styles_1.$p.bBlack10, graphcool_styles_1.$p.flex1), "data-jsx": 1042326032
    },
    React.createElement(_style2.default, {
      styleId: 1042326032,
      css: ".condition-button[data-jsx=\"1042326032\"]:not(.bgGreen):hover {background-color: rgba(0, 0, 0, .1);}"
    }),
    React.createElement(
      "div",
      { className: cx(graphcool_styles_1.$p.pa38, graphcool_styles_1.$p.pt16, graphcool_styles_1.$p.flex, graphcool_styles_1.$p.flexColumn, graphcool_styles_1.$p.itemsCenter), "data-jsx": 1042326032
      },
      React.createElement(
        "h2",
        { className: cx(graphcool_styles_1.$p.fw3, graphcool_styles_1.$p.mb10, graphcool_styles_1.$p.tc), "data-jsx": 1042326032
        },
        "Client"
      ),
      React.createElement(
        "div",
        { className: cx(graphcool_styles_1.$p.dib, graphcool_styles_1.$p.mt25), "data-jsx": 1042326032
        },
        React.createElement(
          "div",
          { className: cx(graphcool_styles_1.$p.flex, graphcool_styles_1.$p.flexRow, graphcool_styles_1.$p.justifyAround, graphcool_styles_1.$p.ph16, graphcool_styles_1.$p.pv6, graphcool_styles_1.$p.relative, graphcool_styles_1.$p.itemsCenter), "data-jsx": 1042326032
          },
          props.clients.map(function (env) {
            var width = calculate_size_1.default(env.toUpperCase(), {
              fontSize: '14px',
              fontWeight: '600'
            }).width;
            return React.createElement(
              "div",
              { className: cx(graphcool_styles_1.$p.relative, graphcool_styles_1.$p.flex, graphcool_styles_1.$p.itemsCenter, graphcool_styles_1.$p.justifyCenter, graphcool_styles_1.$p.pointer), onClick: function onClick() {
                  return props.setClient(env);
                }, style: { width: width + 10 }, key: env, "data-jsx": 1042326032
              },
              React.createElement(
                "div",
                { className: cx('condition-button', graphcool_styles_1.$p.nowrap, graphcool_styles_1.$p.absolute, graphcool_styles_1.$p.ph10, graphcool_styles_1.$p.flex, graphcool_styles_1.$p.flexRow, graphcool_styles_1.$p.itemsCenter, (_a = {}, _a[cx(graphcool_styles_1.$p.pv6, graphcool_styles_1.$p.bgBlack04)] = props.client !== env, _a[cx(graphcool_styles_1.$p.bgGreen, graphcool_styles_1.$p.br2, graphcool_styles_1.$p.pv8, graphcool_styles_1.$p.z1)] = props.client === env, _a)), "data-jsx": 1042326032
                },
                React.createElement(
                  "div",
                  { className: cx(graphcool_styles_1.$p.ttu, graphcool_styles_1.$p.fw6, graphcool_styles_1.$p.f14, (_b = {}, _b[graphcool_styles_1.$p.black30] = props.client !== env, _b[graphcool_styles_1.$p.white] = props.client === env, _b)), "data-jsx": 1042326032
                  },
                  env
                )
              )
            );
            var _a, _b;
          })
        )
      )
    )
  );
};
exports.default = Chooser;
//# sourceMappingURL=CodeGenerationPopupClientChooser.jsx.map