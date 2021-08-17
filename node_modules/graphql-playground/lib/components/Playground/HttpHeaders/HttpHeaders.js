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
var Tooltip_1 = require("../../Tooltip");
var HttpListItem_1 = require("./HttpListItem");
var HttpHeaders = /** @class */function (_super) {
    __extends(HttpHeaders, _super);
    function HttpHeaders(props) {
        var _this = _super.call(this, props) || this;
        _this.handleToggle = function () {
            _this.setState({ open: !_this.state.open });
        };
        _this.handleClickNewHeader = function () {
            _this.setState({ newHeader: true });
        };
        _this.handleChange = function (index, header) {
            var headers = _this.props.headers;
            if (typeof headers.asMutable === 'function') {
                headers = headers.asMutable();
            }
            if (headers) {
                // If new item add it at the end of the array
                if (index === -1) {
                    headers = headers.concat([header]);
                } else {
                    headers[index] = header;
                }
                if (_this.props.onChange) {
                    _this.props.onChange(headers);
                }
            }
            _this.setState({ newHeader: false });
        };
        _this.handleDelete = function (index) {
            // If delete new item
            if (index === -1) {
                _this.setState({ newHeader: false });
                return;
            }
            var headers = _this.props.headers;
            if (headers) {
                if (headers.asMutable) {
                    headers = headers.asMutable();
                }
                headers.splice(index, 1);
                if (_this.props.onChange) {
                    _this.props.onChange(headers);
                }
            }
        };
        _this.state = {
            open: false,
            newHeader: false
        };
        return _this;
    }
    HttpHeaders.prototype.render = function () {
        var _this = this;
        var headers = this.props.headers;
        var _a = this.state,
            open = _a.open,
            newHeader = _a.newHeader;
        return React.createElement(
            "div",
            { className: "http-headers-container", "data-jsx": 315274078
            },
            React.createElement(_style2.default, {
                styleId: 3782052646,
                css: "\n          .http-headers-container .tooltip-content {\n            padding: 0 !important;\n          }\n        "
            }),
            React.createElement(_style2.default, {
                styleId: 4001992061,
                css: ".http-headers-container[data-jsx=\"315274078\"] {top: -57px;left: 25px;z-index: 3;}.graphiql-button[data-jsx=\"315274078\"] {padding: 5px 9px 6px 9px;}.http-headers-container[data-jsx=\"315274078\"] .list-content[data-jsx=\"315274078\"] {text-transform: none;width: 400px;}.row.row-inactive[data-jsx=\"315274078\"] {border: none;}.absolute,\n.http-headers-container[data-jsx=\"315274078\"] {position: absolute;}.white50,\n.graphiql-button[data-jsx=\"315274078\"] {color: hsla(0,0%,100%,.5);}.bgDarkBlue,\n.graphiql-button[data-jsx=\"315274078\"] {background-color: #172a3a;}.ttu,\n.graphiql-button[data-jsx=\"315274078\"] {text-transform: uppercase;}.f14,\n.graphiql-button[data-jsx=\"315274078\"] {font-size: 14px;}.fw6,\n.graphiql-button[data-jsx=\"315274078\"] {font-weight: 600;}.br2,\n.graphiql-button[data-jsx=\"315274078\"] {border-radius: 2px;}.pointer:hover,\n.graphiql-button[data-jsx=\"315274078\"]:hover,\n.row.row-inactive[data-jsx=\"315274078\"]:hover {cursor: pointer;}.relative,\n.graphiql-button[data-jsx=\"315274078\"] {position: relative;}.flex,\n.http-headers-container[data-jsx=\"315274078\"] .list-content[data-jsx=\"315274078\"],\n.row[data-jsx=\"315274078\"] {display: -ms-flexbox;display: flex;}.flexColumn,\n.http-headers-container[data-jsx=\"315274078\"] .list-content[data-jsx=\"315274078\"] {-ms-flex-direction: column;flex-direction: column;}.flex,\n.http-headers-container[data-jsx=\"315274078\"] .list-content[data-jsx=\"315274078\"],\n.row[data-jsx=\"315274078\"] {display: -ms-flexbox;display: flex;}.flexRow,\n.row[data-jsx=\"315274078\"] {-ms-flex-direction: row;flex-direction: row;}.itemsCenter,\n.row[data-jsx=\"315274078\"] {-webkit-box-align: center;-ms-flex-align: center;-ms-grid-row-align: center;align-items: center;}.bb,\n.row[data-jsx=\"315274078\"] {border-bottom-style: solid;border-bottom-width: 1px;}.bBlack10,\n.row[data-jsx=\"315274078\"] {border-color: rgba(0,0,0,.1);}.ph16,\n.row[data-jsx=\"315274078\"] {padding-left: 16px;padding-right: 16px;}.pv10,\n.row[data-jsx=\"315274078\"] {padding-top: 10px;padding-bottom: 10px;}.pointer:hover,\n.graphiql-button[data-jsx=\"315274078\"]:hover,\n.row.row-inactive[data-jsx=\"315274078\"]:hover {cursor: pointer;}.darkBlue50,\n.row.row-inactive[data-jsx=\"315274078\"] {color: rgba(23,42,58,.5);}"
            }),
            React.createElement(
                "div",
                { className: "graphiql-button", onClick: this.handleToggle, "data-jsx": 315274078
                },
                "Http Headers (",
                headers && headers.length || 0,
                ")"
            ),
            React.createElement(
                Tooltip_1.default,
                { open: open, onClose: this.handleToggle, anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'left'
                    } },
                React.createElement(
                    "div",
                    { className: "list-content", "data-jsx": 315274078
                    },
                    headers && headers.map(function (header, index) {
                        return React.createElement(HttpListItem_1.default, { key: index, index: index, header: header, onChange: _this.handleChange, onDelete: _this.handleDelete });
                    }),
                    newHeader && React.createElement(HttpListItem_1.default, { index: -1, header: { name: '', value: '' }, onChange: this.handleChange, onDelete: this.handleDelete }),
                    React.createElement(
                        "div",
                        { className: "row row-inactive", onClick: this.handleClickNewHeader, "data-jsx": 315274078
                        },
                        "+ add new Header"
                    )
                )
            )
        );
    };
    HttpHeaders.defaultProps = {
        headers: []
    };
    return HttpHeaders;
}(React.PureComponent);
exports.default = HttpHeaders;
//# sourceMappingURL=HttpHeaders.jsx.map