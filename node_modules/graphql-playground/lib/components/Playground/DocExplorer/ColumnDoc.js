"use strict";

var _style = require("styled-jsx/style");

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var cx = require("classnames");
var constants_1 = require("../../../constants");
var ColumnDoc = function ColumnDoc(_a) {
  var children = _a.children,
      first = _a.first,
      _b = _a.overflow,
      overflow = _b === void 0 ? true : _b,
      _c = _a.width,
      width = _c === void 0 ? constants_1.columnWidth : _c;
  return React.createElement(
    "div",
    { className: cx('graph-docs-column', { first: first, overflow: overflow }), style: { width: width }, "data-jsx": 4055467984
    },
    React.createElement(_style2.default, {
      styleId: 4055467984,
      css: ".overflow[data-jsx=\"4055467984\"] {overflow-x: hidden;overflow-y: scroll;}.flexFixed,\n.graph-docs-column[data-jsx=\"4055467984\"] {-ms-flex: 0 0 auto;flex: 0 0 auto;}.pb20,\n.graph-docs-column[data-jsx=\"4055467984\"] {padding-bottom: 20px;}.br,\n.graph-docs-column[data-jsx=\"4055467984\"] {border-right-style: solid;border-right-width: 1px;}.bBlack10,\n.graph-docs-column[data-jsx=\"4055467984\"] {border-color: rgba(0,0,0,.1);}.flex,\n.graph-docs-column[data-jsx=\"4055467984\"] {display: -ms-flexbox;display: flex;}.flexColumn,\n.graph-docs-column[data-jsx=\"4055467984\"] {-ms-flex-direction: column;flex-direction: column;}"
    }),
    children
  );
};
exports.default = ColumnDoc;
//# sourceMappingURL=ColumnDoc.jsx.map