"use strict";

var _style = require("styled-jsx/style");

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __assign = undefined && undefined.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Modal = require("react-modal");
var HistoryHeader_1 = require("./HistoryPopup/HistoryHeader");
var HistoryItems_1 = require("./HistoryPopup/HistoryItems");
var graphcool_styles_1 = require("graphcool-styles");
var constants_1 = require("../constants");
var Theme_1 = require("./Theme");
var cn = require("classnames");
var QueryEditor_1 = require("./Playground/QueryEditor");
var HistoryPopup = /** @class */function (_super) {
    __extends(HistoryPopup, _super);
    function HistoryPopup(props) {
        var _this = _super.call(this, props) || this;
        _this.handleClickUse = function () {
            var _a = _this.state,
                searchTerm = _a.searchTerm,
                selectedFilter = _a.selectedFilter;
            // TODO refactor
            var items = _this.props.historyItems.filter(function (item) {
                return selectedFilter === 'STARRED' ? item.starred : true && (searchTerm && searchTerm.length > 0 ? item.query.toLowerCase().includes(searchTerm.toLowerCase()) : true);
            });
            var selectedItem = items[_this.state.selectedItemIndex];
            _this.props.onCreateSession(selectedItem);
            _this.props.onRequestClose();
        };
        _this.handleItemSelect = function (index) {
            _this.setState({ selectedItemIndex: index });
        };
        _this.handleSelectFilter = function (filter) {
            _this.setState({ selectedFilter: filter });
        };
        _this.handleSearch = function (term) {
            _this.setState({ searchTerm: term });
        };
        _this.state = {
            selectedFilter: 'HISTORY',
            selectedItemIndex: 0,
            searchTerm: ''
        };
        return _this;
    }
    HistoryPopup.prototype.render = function () {
        var _a = this.state,
            searchTerm = _a.searchTerm,
            selectedFilter = _a.selectedFilter;
        var localTheme = this.props.localTheme;
        var items = this.props.historyItems.filter(function (item) {
            return selectedFilter === 'STARRED' ? item.starred : true && (searchTerm && searchTerm.length > 0 ? item.query.toLowerCase().includes(searchTerm.toLowerCase()) : true);
        });
        var selectedItem = items[this.state.selectedItemIndex];
        var customModalStyle = constants_1.modalStyle;
        if (localTheme === 'light') {
            customModalStyle = __assign({}, constants_1.modalStyle, { overlay: __assign({}, constants_1.modalStyle.overlay, { backgroundColor: 'rgba(255,255,255,0.9)' }) });
        }
        return React.createElement(
            Modal,
            { isOpen: this.props.isOpen, onRequestClose: this.props.onRequestClose, contentLabel: "GraphiQL Session History", style: customModalStyle },
            React.createElement(_style2.default, {
                styleId: 119066466,
                css: ".history-popup[data-jsx=\"119066466\"] {min-height: 500px;}.right[data-jsx=\"119066466\"] {-moz-flex: 0 0 464px;-webkit-box-flex: 0;-ms-flex: 0 0 464px;flex: 0 0 464px;}.right-header[data-jsx=\"119066466\"] {padding-top: 20px;padding-bottom: 20px;}.right-header.light[data-jsx=\"119066466\"] {background-color: #f6f7f7;}.right-empty.light[data-jsx=\"119066466\"] {background-color: #f6f7f7;}.flex,\n.history-popup[data-jsx=\"119066466\"],\n.right-header[data-jsx=\"119066466\"],\n.right-empty[data-jsx=\"119066466\"],\n.use[data-jsx=\"119066466\"],\n.graphiql-wrapper[data-jsx=\"119066466\"],\n.big[data-jsx=\"119066466\"] {display: -ms-flexbox;display: flex;}.flex1,\n.left[data-jsx=\"119066466\"] {-ms-flex: 1;flex: 1;}.flex1,\n.flexAuto,\n.left[data-jsx=\"119066466\"],\n.graphiql-wrapper[data-jsx=\"119066466\"],\n.big[data-jsx=\"119066466\"] {min-width: 0;min-height: 0;}.bgWhite,\n.left[data-jsx=\"119066466\"] {background-color: #fff;}.z2,\n.right[data-jsx=\"119066466\"] {z-index: 2;}.justifyBetween,\n.right-header[data-jsx=\"119066466\"] {-ms-flex-pack: justify;justify-content: space-between;}.flex,\n.history-popup[data-jsx=\"119066466\"],\n.right-header[data-jsx=\"119066466\"],\n.right-empty[data-jsx=\"119066466\"],\n.use[data-jsx=\"119066466\"],\n.graphiql-wrapper[data-jsx=\"119066466\"],\n.big[data-jsx=\"119066466\"] {display: -ms-flexbox;display: flex;}.bgDarkBlue,\n.right-header[data-jsx=\"119066466\"],\n.right-empty[data-jsx=\"119066466\"] {background-color: #172a3a;}.itemsCenter,\n.right-header[data-jsx=\"119066466\"],\n.right-empty[data-jsx=\"119066466\"],\n.use[data-jsx=\"119066466\"] {-webkit-box-align: center;-ms-flex-align: center;-ms-grid-row-align: center;align-items: center;}.ph25,\n.right-header[data-jsx=\"119066466\"] {padding-left: 25px;padding-right: 25px;}.bgDarkBlue,\n.right-header[data-jsx=\"119066466\"],\n.right-empty[data-jsx=\"119066466\"] {background-color: #172a3a;}.h100,\n.right-empty[data-jsx=\"119066466\"],\n.graphiql-wrapper[data-jsx=\"119066466\"],\n.big[data-jsx=\"119066466\"] {height: 100%;}.flex,\n.history-popup[data-jsx=\"119066466\"],\n.right-header[data-jsx=\"119066466\"],\n.right-empty[data-jsx=\"119066466\"],\n.use[data-jsx=\"119066466\"],\n.graphiql-wrapper[data-jsx=\"119066466\"],\n.big[data-jsx=\"119066466\"] {display: -ms-flexbox;display: flex;}.justifyCenter,\n.right-empty[data-jsx=\"119066466\"] {-ms-flex-pack: center;justify-content: center;}.itemsCenter,\n.right-header[data-jsx=\"119066466\"],\n.right-empty[data-jsx=\"119066466\"],\n.use[data-jsx=\"119066466\"] {-webkit-box-align: center;-ms-flex-align: center;-ms-grid-row-align: center;align-items: center;}.f16,\n.right-empty-text[data-jsx=\"119066466\"] {font-size: 16px;}.white60,\n.right-empty-text[data-jsx=\"119066466\"] {color: hsla(0,0%,100%,.6);}.f14,\n.view[data-jsx=\"119066466\"],\n.use[data-jsx=\"119066466\"] {font-size: 14px;}.white40,\n.view[data-jsx=\"119066466\"] {color: hsla(0,0%,100%,.4);}.ttu,\n.view[data-jsx=\"119066466\"] {text-transform: uppercase;}.fw6,\n.view[data-jsx=\"119066466\"],\n.use[data-jsx=\"119066466\"] {font-weight: 600;}.f14,\n.view[data-jsx=\"119066466\"],\n.use[data-jsx=\"119066466\"] {font-size: 14px;}.fw6,\n.view[data-jsx=\"119066466\"],\n.use[data-jsx=\"119066466\"] {font-weight: 600;}.pv10,\n.use[data-jsx=\"119066466\"] {padding-top: 10px;padding-bottom: 10px;}.ph16,\n.use[data-jsx=\"119066466\"] {padding-left: 16px;padding-right: 16px;}.bgGreen,\n.use[data-jsx=\"119066466\"] {background-color: #27ae60;}.flex,\n.history-popup[data-jsx=\"119066466\"],\n.right-header[data-jsx=\"119066466\"],\n.right-empty[data-jsx=\"119066466\"],\n.use[data-jsx=\"119066466\"],\n.graphiql-wrapper[data-jsx=\"119066466\"],\n.big[data-jsx=\"119066466\"] {display: -ms-flexbox;display: flex;}.br2,\n.use[data-jsx=\"119066466\"] {border-radius: 2px;}.itemsCenter,\n.right-header[data-jsx=\"119066466\"],\n.right-empty[data-jsx=\"119066466\"],\n.use[data-jsx=\"119066466\"] {-webkit-box-align: center;-ms-flex-align: center;-ms-grid-row-align: center;align-items: center;}.pointer:hover,\n.use[data-jsx=\"119066466\"]:hover {cursor: pointer;}.mr6,\n.use-text[data-jsx=\"119066466\"] {margin-right: 6px;}.white,\n.use-text[data-jsx=\"119066466\"] {color: #fff;}.w100,\n.graphiql-wrapper[data-jsx=\"119066466\"] {width: 100%;}.h100,\n.right-empty[data-jsx=\"119066466\"],\n.graphiql-wrapper[data-jsx=\"119066466\"],\n.big[data-jsx=\"119066466\"] {height: 100%;}.relative,\n.graphiql-wrapper[data-jsx=\"119066466\"] {position: relative;}.flex,\n.history-popup[data-jsx=\"119066466\"],\n.right-header[data-jsx=\"119066466\"],\n.right-empty[data-jsx=\"119066466\"],\n.use[data-jsx=\"119066466\"],\n.graphiql-wrapper[data-jsx=\"119066466\"],\n.big[data-jsx=\"119066466\"] {display: -ms-flexbox;display: flex;}.flex1,\n.flexAuto,\n.left[data-jsx=\"119066466\"],\n.graphiql-wrapper[data-jsx=\"119066466\"],\n.big[data-jsx=\"119066466\"] {min-width: 0;min-height: 0;}.flexAuto,\n.graphiql-wrapper[data-jsx=\"119066466\"],\n.big[data-jsx=\"119066466\"] {-ms-flex: 1 1 auto;flex: 1 1 auto;}.h100,\n.right-empty[data-jsx=\"119066466\"],\n.graphiql-wrapper[data-jsx=\"119066466\"],\n.big[data-jsx=\"119066466\"] {height: 100%;}.flex,\n.history-popup[data-jsx=\"119066466\"],\n.right-header[data-jsx=\"119066466\"],\n.right-empty[data-jsx=\"119066466\"],\n.use[data-jsx=\"119066466\"],\n.graphiql-wrapper[data-jsx=\"119066466\"],\n.big[data-jsx=\"119066466\"] {display: -ms-flexbox;display: flex;}.flex1,\n.flexAuto,\n.left[data-jsx=\"119066466\"],\n.graphiql-wrapper[data-jsx=\"119066466\"],\n.big[data-jsx=\"119066466\"] {min-width: 0;min-height: 0;}.flexAuto,\n.graphiql-wrapper[data-jsx=\"119066466\"],\n.big[data-jsx=\"119066466\"] {-ms-flex: 1 1 auto;flex: 1 1 auto;}"
            }),
            React.createElement(
                "div",
                { className: cn('history-popup', localTheme), "data-jsx": 119066466
                },
                React.createElement(
                    "div",
                    { className: "left", "data-jsx": 119066466
                    },
                    React.createElement(HistoryHeader_1.default, { onSelectFilter: this.handleSelectFilter, selectedFilter: this.state.selectedFilter, onSearch: this.handleSearch }),
                    React.createElement(HistoryItems_1.default, { items: items, selectedItemIndex: this.state.selectedItemIndex, searchTerm: this.state.searchTerm, onItemSelect: this.handleItemSelect, onItemStarToggled: this.props.onItemStarToggled })
                ),
                Boolean(selectedItem) ? React.createElement(
                    "div",
                    { className: cn('right', localTheme), "data-jsx": 119066466
                    },
                    React.createElement(
                        "div",
                        { className: cn('right-header', localTheme), "data-jsx": 119066466
                        },
                        React.createElement("div", { className: "view", "data-jsx": 119066466
                        }),
                        React.createElement(
                            "div",
                            { className: "use", onClick: this.handleClickUse, "data-jsx": 119066466
                            },
                            React.createElement(
                                "div",
                                { className: "use-text", "data-jsx": 119066466
                                },
                                "Use"
                            ),
                            React.createElement(graphcool_styles_1.Icon, { src: require('../assets/icons/arrowRight.svg'), color: graphcool_styles_1.$v.white, stroke: true, width: 13, height: 13 })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: cn('big', {
                                'docs-graphiql': localTheme === 'light'
                            }), "data-jsx": 119066466
                        },
                        React.createElement(
                            "div",
                            { className: cn('big', {
                                    'graphiql-wrapper': localTheme === 'light'
                                }), "data-jsx": 119066466
                            },
                            React.createElement(
                                "div",
                                { className: "graphiql-container", "data-jsx": 119066466
                                },
                                React.createElement(
                                    "div",
                                    { className: "queryWrap", "data-jsx": 119066466
                                    },
                                    React.createElement(QueryEditor_1.QueryEditor, { value: selectedItem.query })
                                )
                            )
                        )
                    )
                ) : React.createElement(
                    "div",
                    { className: cn('right', localTheme), "data-jsx": 119066466
                    },
                    React.createElement(
                        "div",
                        { className: cn('right-empty', localTheme), "data-jsx": 119066466
                        },
                        React.createElement(
                            "div",
                            { className: "right-empty-text", "data-jsx": 119066466
                            },
                            "No History yet"
                        )
                    )
                )
            )
        );
    };
    return HistoryPopup;
}(React.Component);
exports.default = Theme_1.withTheme(HistoryPopup);
//# sourceMappingURL=HistoryPopup.jsx.map