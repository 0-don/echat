"use strict";

var _style = require("styled-jsx/style");

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var graphcool_styles_1 = require("graphcool-styles");
var cx = require("classnames");
/* tslint:disable */
var HistoryChooser = function HistoryChooser(_a) {
  var selectedFilter = _a.selectedFilter,
      onSelectFilter = _a.onSelectFilter;
  return React.createElement(
    "div",
    {
      "data-jsx": 254006001
    },
    React.createElement(_style2.default, {
      styleId: 254006001,
      css: ".filter[data-jsx=\"254006001\"] {padding: 5px 13px 6px 13px;margin: 0 -2px;height: 24px}.filter[data-jsx=\"254006001\"].active[data-jsx=\"254006001\"] {padding: 7px 9px 8px 9px}.flex,\n.chooser[data-jsx=\"254006001\"],\n.filter[data-jsx=\"254006001\"] {display: -ms-flexbox;display: flex}.itemsCenter,\n.chooser[data-jsx=\"254006001\"],\n.filter[data-jsx=\"254006001\"] {-webkit-box-align: center;-ms-flex-align: center;-ms-grid-row-align: center;align-items: center}.br2,\n.filter[data-jsx=\"254006001\"] {border-radius: 2px}.relative,\n.filter[data-jsx=\"254006001\"] {position: relative}.pointer:hover,\n.filter[data-jsx=\"254006001\"]:hover {cursor: pointer}.ttu,\n.filter[data-jsx=\"254006001\"] {text-transform: uppercase}.flex,\n.chooser[data-jsx=\"254006001\"],\n.filter[data-jsx=\"254006001\"] {display: -ms-flexbox;display: flex}.itemsCenter,\n.chooser[data-jsx=\"254006001\"],\n.filter[data-jsx=\"254006001\"] {-webkit-box-align: center;-ms-flex-align: center;-ms-grid-row-align: center;align-items: center}.black30,\n.filter[data-jsx=\"254006001\"] {color: rgba(0,0,0,.3)}.fw6,\n.filter[data-jsx=\"254006001\"] {font-weight: 600}.f14,\n.filter[data-jsx=\"254006001\"] {font-size: 14px}.bgBlack07,\n.filter[data-jsx=\"254006001\"] {background-color: rgba(0,0,0,.07)}.cbox,\n.filter[data-jsx=\"254006001\"] {box-sizing: content-box}.z2,\n.filter[data-jsx=\"254006001\"].active[data-jsx=\"254006001\"] {z-index: 2}.white,\n.filter[data-jsx=\"254006001\"].active[data-jsx=\"254006001\"] {color: #fff}.bgGreen,\n.filter[data-jsx=\"254006001\"].active[data-jsx=\"254006001\"] {background-color: #27ae60}.ml6,\n.filter-text[data-jsx=\"254006001\"] {margin-left: 6px}"
    }),
    React.createElement(
      "div",
      { className: "chooser", "data-jsx": 254006001
      },
      React.createElement(
        "div",
        { className: cx('filter', {
            active: selectedFilter === 'HISTORY'
          }), onClick: function onClick() {
            return onSelectFilter('HISTORY');
          }, "data-jsx": 254006001
        },
        React.createElement(graphcool_styles_1.Icon, { src: require('graphcool-styles/icons/stroke/history.svg'), color: selectedFilter === 'HISTORY' ? graphcool_styles_1.$v.white : graphcool_styles_1.$v.gray30, stroke: true, strokeWidth: 3, width: 25, height: 25 }),
        React.createElement(
          "div",
          { className: "filter-text", "data-jsx": 254006001
          },
          "History"
        )
      ),
      React.createElement(
        "div",
        { className: cx('filter', {
            active: selectedFilter === 'STARRED'
          }), onClick: function onClick() {
            return onSelectFilter('STARRED');
          }, "data-jsx": 254006001
        },
        React.createElement(graphcool_styles_1.Icon, { src: require('../../assets/icons/star.svg'), color: selectedFilter === 'STARRED' ? graphcool_styles_1.$v.white : graphcool_styles_1.$v.gray30, width: 16, height: 16 }),
        React.createElement(
          "div",
          { className: "filter-text", "data-jsx": 254006001
          },
          "Starred"
        )
      )
    )
  );
};
exports.default = HistoryChooser;
//# sourceMappingURL=HistoryChooser.jsx.map