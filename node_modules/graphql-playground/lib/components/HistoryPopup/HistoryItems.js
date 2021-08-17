"use strict";

var _style = require("styled-jsx/style");

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var graphcool_styles_1 = require("graphcool-styles");
var cx = require("classnames");
/* tslint:disable */
var HistoryItems = function HistoryItems(_a) {
    var items = _a.items,
        onItemSelect = _a.onItemSelect,
        selectedItemIndex = _a.selectedItemIndex,
        onItemStarToggled = _a.onItemStarToggled;
    return React.createElement(
        "div",
        { className: "history-items", "data-jsx": 2570802384
        },
        React.createElement(_style2.default, {
            styleId: 2570802384,
            css: ".history-items[data-jsx=\"2570802384\"] {max-height: calc(100vh - 121px);}.item[data-jsx=\"2570802384\"] {padding: 25px 20px}.operation[data-jsx=\"2570802384\"] {margin-left: 20px;}.operation-icon[data-jsx=\"2570802384\"] {height: 21px;width: 21px}.overflowYScroll,\n.history-items[data-jsx=\"2570802384\"] {overflow-y: scroll;}.flex,\n.item[data-jsx=\"2570802384\"],\n.operation[data-jsx=\"2570802384\"],\n.star[data-jsx=\"2570802384\"],\n.viewer[data-jsx=\"2570802384\"],\n.left[data-jsx=\"2570802384\"],\n.right[data-jsx=\"2570802384\"],\n.operation-icon[data-jsx=\"2570802384\"] {display: -ms-flexbox;display: flex;}.itemsCenter,\n.item[data-jsx=\"2570802384\"],\n.operation[data-jsx=\"2570802384\"],\n.star[data-jsx=\"2570802384\"],\n.viewer[data-jsx=\"2570802384\"],\n.left[data-jsx=\"2570802384\"],\n.right[data-jsx=\"2570802384\"],\n.operation-icon[data-jsx=\"2570802384\"] {-webkit-box-align: center;-ms-flex-align: center;-ms-grid-row-align: center;align-items: center;}.justifyBetween,\n.item[data-jsx=\"2570802384\"] {-ms-flex-pack: justify;justify-content: space-between;}.bb,\n.item[data-jsx=\"2570802384\"] {border-bottom-style: solid;border-bottom-width: 1px;}.bBlack10,\n.item[data-jsx=\"2570802384\"] {border-color: rgba(0,0,0,.1);}.pointer:hover,\n.item[data-jsx=\"2570802384\"]:hover {cursor: pointer;}.bgBlack04,\n.item[data-jsx=\"2570802384\"].active[data-jsx=\"2570802384\"] {background-color: rgba(0,0,0,.04);}.flex,\n.item[data-jsx=\"2570802384\"],\n.operation[data-jsx=\"2570802384\"],\n.star[data-jsx=\"2570802384\"],\n.viewer[data-jsx=\"2570802384\"],\n.left[data-jsx=\"2570802384\"],\n.right[data-jsx=\"2570802384\"],\n.operation-icon[data-jsx=\"2570802384\"] {display: -ms-flexbox;display: flex;}.itemsCenter,\n.item[data-jsx=\"2570802384\"],\n.operation[data-jsx=\"2570802384\"],\n.star[data-jsx=\"2570802384\"],\n.viewer[data-jsx=\"2570802384\"],\n.left[data-jsx=\"2570802384\"],\n.right[data-jsx=\"2570802384\"],\n.operation-icon[data-jsx=\"2570802384\"] {-webkit-box-align: center;-ms-flex-align: center;-ms-grid-row-align: center;align-items: center;}.itemsCenter,\n.item[data-jsx=\"2570802384\"],\n.operation[data-jsx=\"2570802384\"],\n.star[data-jsx=\"2570802384\"],\n.viewer[data-jsx=\"2570802384\"],\n.left[data-jsx=\"2570802384\"],\n.right[data-jsx=\"2570802384\"],\n.operation-icon[data-jsx=\"2570802384\"] {-webkit-box-align: center;-ms-flex-align: center;-ms-grid-row-align: center;align-items: center;}.fw3,\n.operation-text[data-jsx=\"2570802384\"] {font-weight: 300;}.f20,\n.operation-text[data-jsx=\"2570802384\"] {font-size: 20px;}.mr16,\n.operation-text[data-jsx=\"2570802384\"] {margin-right: 16px;}.br2,\n.operation-icon[data-jsx=\"2570802384\"] {border-radius: 2px;}.flex,\n.item[data-jsx=\"2570802384\"],\n.operation[data-jsx=\"2570802384\"],\n.star[data-jsx=\"2570802384\"],\n.viewer[data-jsx=\"2570802384\"],\n.left[data-jsx=\"2570802384\"],\n.right[data-jsx=\"2570802384\"],\n.operation-icon[data-jsx=\"2570802384\"] {display: -ms-flexbox;display: flex;}.itemsCenter,\n.item[data-jsx=\"2570802384\"],\n.operation[data-jsx=\"2570802384\"],\n.star[data-jsx=\"2570802384\"],\n.viewer[data-jsx=\"2570802384\"],\n.left[data-jsx=\"2570802384\"],\n.right[data-jsx=\"2570802384\"],\n.operation-icon[data-jsx=\"2570802384\"] {-webkit-box-align: center;-ms-flex-align: center;-ms-grid-row-align: center;align-items: center;}.justifyCenter,\n.operation-icon[data-jsx=\"2570802384\"] {-ms-flex-pack: center;justify-content: center;}.mr4,\n.operation-icon[data-jsx=\"2570802384\"] {margin-right: 4px;}.fw7,\n.operation-icon[data-jsx=\"2570802384\"] {font-weight: 700;}.f12,\n.operation-icon[data-jsx=\"2570802384\"] {font-size: 12px;}.purple,\n.operation-icon[data-jsx=\"2570802384\"].subscription[data-jsx=\"2570802384\"] {color: #a4036f;}.bgPurple20,\n.operation-icon[data-jsx=\"2570802384\"].subscription[data-jsx=\"2570802384\"] {background-color: rgba(164,3,111,.2);}.blue,\n.operation-icon[data-jsx=\"2570802384\"].query[data-jsx=\"2570802384\"] {color: #2a7ed2;}.bgBlue20,\n.operation-icon[data-jsx=\"2570802384\"].query[data-jsx=\"2570802384\"] {background-color: rgba(42,126,210,.2);}.lightOrange,\n.operation-icon[data-jsx=\"2570802384\"].mutation[data-jsx=\"2570802384\"] {color: #f18f01;}.bgLightOrange20,\n.operation-icon[data-jsx=\"2570802384\"].mutation[data-jsx=\"2570802384\"] {background-color: rgba(241,143,1,.2);}.f14,\n.date[data-jsx=\"2570802384\"] {font-size: 14px;}.black50,\n.date[data-jsx=\"2570802384\"] {color: rgba(0,0,0,.5);}.ml16,\n.date[data-jsx=\"2570802384\"] {margin-left: 16px;}.ml6,\n.viewer[data-jsx=\"2570802384\"] {margin-left: 6px;}"
        }),
        items.map(function (item, index) {
            return React.createElement(
                "div",
                { key: item.id, className: cx('item', {
                        active: selectedItemIndex === index
                    }), onClick: function onClick() {
                        return onItemSelect(index);
                    }, "data-jsx": 2570802384
                },
                React.createElement(
                    "div",
                    { className: "left", "data-jsx": 2570802384
                    },
                    React.createElement(
                        "div",
                        { className: "star", onClick: function onClick() {
                                return onItemStarToggled(item);
                            }, "data-jsx": 2570802384
                        },
                        React.createElement(graphcool_styles_1.Icon, { src: require('../../assets/icons/star.svg'), color: item.starred ? 'rgb(221,171,0)' : graphcool_styles_1.$v.gray30, stroke: !item.starred, strokeWidth: 0.5, width: 25, height: 25 })
                    ),
                    React.createElement(
                        "div",
                        { className: "operation", "data-jsx": 2570802384
                        },
                        React.createElement(
                            "div",
                            { className: "operation-text", "data-jsx": 2570802384
                            },
                            item.operationName || item.queryTypes.firstOperationName || 'New Session'
                        ),
                        item.queryTypes.query && React.createElement(
                            "div",
                            { className: "operation-icon query", "data-jsx": 2570802384
                            },
                            "Q"
                        ),
                        item.queryTypes.mutation && React.createElement(
                            "div",
                            { className: "operation-icon mutation", "data-jsx": 2570802384
                            },
                            "M"
                        ),
                        item.queryTypes.subscription && React.createElement(
                            "div",
                            { className: "operation-icon subscription", "data-jsx": 2570802384
                            },
                            "S"
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "right", "data-jsx": 2570802384
                    },
                    item.date && React.createElement(
                        "div",
                        { className: "date", "data-jsx": 2570802384
                        },
                        typeof item.date.getMonth === 'function' && React.createElement(
                            "span",
                            {
                                "data-jsx": 2570802384
                            },
                            item.date.getMonth() + 1,
                            "/",
                            item.date.getDate(),
                            "/",
                            item.date.getFullYear().toString().slice(2, 4)
                        )
                    )
                )
            );
        })
    );
};
exports.default = HistoryItems;
//# sourceMappingURL=HistoryItems.jsx.map