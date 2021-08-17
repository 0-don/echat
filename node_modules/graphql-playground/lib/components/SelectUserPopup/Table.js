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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_virtualized_1 = require("react-virtualized");
function pZ(n) {
    return n < 10 ? "0" + n : n;
}
var TableComponent = /** @class */function (_super) {
    __extends(TableComponent, _super);
    function TableComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.rowClassName = function (_a) {
            var index = _a.index;
            return "table-row " + (_this.props.rows[index] && _this.props.rows[index].selected ? 'selected' : '');
        };
        _this.noRowsRenderer = function () {
            return React.createElement(
                "div",
                { className: "no-rows", "data-jsx": 4141945394
                },
                React.createElement(_style2.default, {
                    styleId: 4141945394,
                    css: ".w100,\n.no-rows[data-jsx=\"4141945394\"] {\n    width: 100%\n}\n.h100,\n.no-rows[data-jsx=\"4141945394\"] {\n    height: 100%\n}\n.flex,\n.no-rows[data-jsx=\"4141945394\"] {\n    display: -ms-flexbox;\n    display: flex\n}\n.justifyCenter,\n.no-rows[data-jsx=\"4141945394\"] {\n    -ms-flex-pack: center;\n    justify-content: center\n}\n.itemsCenter,\n.no-rows[data-jsx=\"4141945394\"] {\n    -webkit-box-align: center;\n    -ms-flex-align: center;\n    -ms-grid-row-align: center;\n    align-items: center\n}"
                }),
                React.createElement(
                    "div",
                    {
                        "data-jsx": 4141945394
                    },
                    "No Users"
                )
            );
        };
        _this.rowGetter = function (_a) {
            var index = _a.index;
            var row = _this.props.rows[index];
            if (!row) {
                return {};
            }
            return Object.keys(row).reduce(function (prev, current) {
                prev[current] = _this.textToString(row[current]);
                return prev;
            }, {});
        };
        // private cellRenderer = ({key, style, columnIndex, rowIndex}) => {
        //   const field = this.props.fields[columnIndex]
        //   const {selectedRow} = this.state
        //   return (
        //     <div
        //       key={key}
        //       style={style}
        //       className={`cell ${selectedRow === rowIndex ? 'selected' : ''}`}
        //       onClick={() => this.selectRow(rowIndex)}
        //     >
        //       <style jsx>{`
        //         .cell {
        //           @inherit: .bbox, .pv16, .ph25, .f16;
        //           &.selected {
        //             @inherit: .bgBlue, .white;
        //           }
        //         }
        //       `}</style>
        //       {this.textToString(this.props.rows[rowIndex][field])}
        //     </div>
        //   )
        // }
        // private selectRow(rowIndex: number) {
        //   this.setState({selectedRow: rowIndex} as State)
        // }
        _this.isRowLoaded = function (_a) {
            var index = _a.index;
            var loaded = Boolean(_this.props.rows[index]);
            return loaded;
        };
        _this.state = {
            height: 400,
            rowHeight: 54,
            overscanRowCount: 20,
            selectedRow: -1
        };
        global.t = _this;
        return _this;
    }
    TableComponent.prototype.render = function () {
        var _this = this;
        var _a = this.props,
            rowCount = _a.rowCount,
            fields = _a.fields;
        var _b = this.state,
            height = _b.height,
            rowHeight = _b.rowHeight,
            overscanRowCount = _b.overscanRowCount;
        return React.createElement(
            "div",
            { className: "popup-table", "data-jsx": 3629592743
            },
            React.createElement(_style2.default, {
                styleId: 3629592743,
                css: "\n          .popup-table {\n            padding-top: 30px;\n          }\n          .popup-table .table-row:focus {\n            outline: none;\n}\n          .ReactVirtualized__Table__Grid {\n            box-shadow: 0 1px 4px rgba(0, 0, 0, .1);\n          }\n          .bgBlack02,\n.popup-table {\n            background-color: rgba(0,0,0,.02);\n}\n          .w100,\n.popup-table {\n            width: 100%;\n}\n          .overflowXScroll,\n.popup-table {\n            overflow-x: scroll;\n}\n          .flex,\n.popup-table .table-row {\n            display: -ms-flexbox;\n            display: flex;\n}\n          .pointer:hover,\n.popup-table .table-row:hover {\n            cursor: pointer;\n}\n          .bgBlue,\n.popup-table .table-row.selected {\n            background-color: #2a7ed2;\n}\n          .white,\n.popup-table .table-row.selected {\n            color: #fff;\n}\n          .bgWhite,\n.ReactVirtualized__Table__Grid {\n            background-color: #fff;\n}\n          .fw6,\n.table-header {\n            font-weight: 600;\n}\n          .ph25,\n.ReactVirtualized__Table__headerColumn,\n.ReactVirtualized__Table__rowColumn {\n            padding-left: 25px;\n            padding-right: 25px;\n}\n          .pv16,\n.ReactVirtualized__Table__headerColumn,\n.ReactVirtualized__Table__rowColumn {\n            padding-top: 16px;\n            padding-bottom: 16px;\n}\n          .bbox,\n.ReactVirtualized__Table__headerColumn {\n            box-sizing: border-box;\n}\n          .overflowHidden,\n.ReactVirtualized__Table__headerColumn,\n.ReactVirtualized__Table__rowColumn {\n            overflow: hidden;\n}\n          .toe,\n.ReactVirtualized__Table__headerColumn,\n.ReactVirtualized__Table__rowColumn {\n            text-overflow: ellipsis;\n}\n          .black60,\n.ReactVirtualized__Table__headerColumn {\n            color: rgba(0,0,0,.6);\n}\n          .overflowHidden,\n.ReactVirtualized__Table__headerColumn,\n.ReactVirtualized__Table__rowColumn {\n            overflow: hidden;\n}\n          .ph25,\n.ReactVirtualized__Table__headerColumn,\n.ReactVirtualized__Table__rowColumn {\n            padding-left: 25px;\n            padding-right: 25px;\n}\n          .pv16,\n.ReactVirtualized__Table__headerColumn,\n.ReactVirtualized__Table__rowColumn {\n            padding-top: 16px;\n            padding-bottom: 16px;\n}\n          .toe,\n.ReactVirtualized__Table__headerColumn,\n.ReactVirtualized__Table__rowColumn {\n            text-overflow: ellipsis;\n}\n          .br,\n.ReactVirtualized__Table__rowColumn {\n            border-right-style: solid;\n            border-right-width: 1px;\n}\n          .bb,\n.ReactVirtualized__Table__rowColumn {\n            border-bottom-style: solid;\n            border-bottom-width: 1px;\n}\n          .bBlack10,\n.ReactVirtualized__Table__rowColumn {\n            border-color: rgba(0,0,0,.1);\n}\n          .nowrap,\n.ReactVirtualized__Table__rowColumn {\n            white-space: nowrap;\n}\n        "
            }),
            React.createElement(
                react_virtualized_1.InfiniteLoader,
                { isRowLoaded: this.isRowLoaded, loadMoreRows: this.props.loadMoreRows, rowCount: rowCount },
                function (_a) {
                    var onRowsRendered = _a.onRowsRendered,
                        registerChild = _a.registerChild;
                    return React.createElement(
                        react_virtualized_1.Table,
                        { headerHeight: 54, height: height, noRowsRenderer: _this.noRowsRenderer, overscanRowCount: overscanRowCount, rowHeight: rowHeight, rowCount: rowCount, rowGetter: _this.rowGetter, headerClassName: "table-header", ref: registerChild, width: fields.map(function (field) {
                                return field.width;
                            }).reduce(function (acc, value) {
                                return acc + value;
                            }, 0), onRowsRendered: onRowsRendered, onRowClick: _this.props.onRowSelection, rowClassName: _this.rowClassName, scrollToIndex: _this.props.scrollToIndex },
                        fields.map(function (field) {
                            return React.createElement(react_virtualized_1.Column, { key: field.name, label: field.name, dataKey: field.name, width: field.width });
                        })
                    );
                }
            )
        );
    };
    TableComponent.prototype.textToString = function (value) {
        if (value instanceof Date) {
            return pZ(value.getMonth() + 1) + "/" + pZ(value.getDate()) + "/" + value.getFullYear().toString().slice(2, 4) + " " + (value.getHours() + ":" + pZ(value.getMinutes()) + ":" + pZ(value.getSeconds()));
        }
        return String(value);
    };
    return TableComponent;
}(React.Component);
exports.default = TableComponent;
//# sourceMappingURL=Table.jsx.map