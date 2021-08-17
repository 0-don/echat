"use strict";

var _style = require("styled-jsx/style");

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var HistoryChooser_1 = require("./HistoryChooser");
var SearchBox_1 = require("../Playground/DocExplorer/SearchBox");
var HistoryHeader = function HistoryHeader(props) {
    return React.createElement(
        "div",
        { className: "history-header", "data-jsx": 3148687307
        },
        React.createElement(_style2.default, {
            styleId: 3148687307,
            css: ".pa16,\n.history-header[data-jsx=\"3148687307\"] {padding: 16px\n}.flex,\n.history-header[data-jsx=\"3148687307\"] {display: -ms-flexbox;display: flex\n}.justifyBetween,\n.history-header[data-jsx=\"3148687307\"] {-ms-flex-pack: justify;justify-content: space-between\n}.itemsCenter,\n.history-header[data-jsx=\"3148687307\"] {-webkit-box-align: center;-ms-flex-align: center;-ms-grid-row-align: center;align-items: center\n}.bgBlack02,\n.history-header[data-jsx=\"3148687307\"] {background-color: rgba(0,0,0,.02)\n}.pa0,\n.search-box[data-jsx=\"3148687307\"] {padding: 0\n}.bgTransparent,\n.search-box[data-jsx=\"3148687307\"] {background-color: transparent\n}"
        }),
        React.createElement(HistoryChooser_1.default, { onSelectFilter: props.onSelectFilter, selectedFilter: props.selectedFilter }),
        React.createElement(SearchBox_1.default, { placeholder: "Search the history...", onSearch: props.onSearch, clean: true, isShown: true })
    );
};
exports.default = HistoryHeader;
//# sourceMappingURL=HistoryHeader.jsx.map