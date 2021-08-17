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
var graphcool_styles_1 = require("graphcool-styles");
var keycode = require("keycode");
var HttpListItem = /** @class */function (_super) {
    __extends(HttpListItem, _super);
    function HttpListItem(props) {
        var _this = _super.call(this, props) || this;
        _this.setRef = function (ref) {
            _this.inputRef = ref;
        };
        _this.handleKeyDown = function (e) {
            // Handle enter press and save header
            if (keycode(e) === 'enter' && _this.state.editing) {
                _this.handleValidate();
            }
        };
        _this.handleEditChange = function (_a) {
            var target = _a.target;
            _this.setState((_b = {}, _b[target.name] = target.value, _b.editing = true, _b));
            var _b;
        };
        _this.handleValidate = function () {
            if (_this.state.name && _this.state.value) {
                _this.props.onChange(_this.props.index, {
                    name: _this.state.name,
                    value: _this.state.value
                });
                _this.setState({ editing: false });
            }
        };
        _this.handleDelete = function () {
            _this.props.onDelete(_this.props.index);
        };
        _this.state = {
            name: props.header.name,
            value: props.header.value,
            editing: false
        };
        return _this;
    }
    HttpListItem.prototype.componentDidMount = function () {
        // If new element focus it
        if (this.props.index === -1) {
            this.inputRef.focus();
        }
    };
    HttpListItem.prototype.render = function () {
        var _a = this.state,
            editing = _a.editing,
            name = _a.name,
            value = _a.value;
        return React.createElement(
            "div",
            { className: "row", "data-jsx": 1796854545
            },
            React.createElement(_style2.default, {
                styleId: 1796854545,
                css: ".row[data-jsx=\"1796854545\"] .name[data-jsx=\"1796854545\"] {-moz-flex: 0 30%;-webkit-box-flex: 0;-ms-flex: 0 30%;flex: 0 30%;}.row[data-jsx=\"1796854545\"] .value[data-jsx=\"1796854545\"] {-moz-flex: 0 60%;-webkit-box-flex: 0;-ms-flex: 0 60%;flex: 0 60%;}.row[data-jsx=\"1796854545\"] input[data-jsx=\"1796854545\"] {background: transparent;}.flex,\n.row[data-jsx=\"1796854545\"],\n.row[data-jsx=\"1796854545\"] .icon[data-jsx=\"1796854545\"] {display: -ms-flexbox;display: flex;}.flexRow,\n.row[data-jsx=\"1796854545\"] {-ms-flex-direction: row;flex-direction: row;}.itemsCenter,\n.row[data-jsx=\"1796854545\"] {-webkit-box-align: center;-ms-flex-align: center;-ms-grid-row-align: center;align-items: center;}.bb,\n.row[data-jsx=\"1796854545\"] {border-bottom-style: solid;border-bottom-width: 1px;}.bBlack10,\n.row[data-jsx=\"1796854545\"] {border-color: rgba(0,0,0,.1);}.ph16,\n.row[data-jsx=\"1796854545\"] {padding-left: 16px;padding-right: 16px;}.pv10,\n.row[data-jsx=\"1796854545\"] {padding-top: 10px;padding-bottom: 10px;}.toe,\n.row[data-jsx=\"1796854545\"] .name[data-jsx=\"1796854545\"],\n.row[data-jsx=\"1796854545\"] .value[data-jsx=\"1796854545\"] {text-overflow: ellipsis;}.overflowHidden,\n.row[data-jsx=\"1796854545\"] .name[data-jsx=\"1796854545\"],\n.row[data-jsx=\"1796854545\"] .value[data-jsx=\"1796854545\"] {overflow: hidden;}.nowrap,\n.row[data-jsx=\"1796854545\"] .name[data-jsx=\"1796854545\"],\n.row[data-jsx=\"1796854545\"] .value[data-jsx=\"1796854545\"] {white-space: nowrap;}.toe,\n.row[data-jsx=\"1796854545\"] .name[data-jsx=\"1796854545\"],\n.row[data-jsx=\"1796854545\"] .value[data-jsx=\"1796854545\"] {text-overflow: ellipsis;}.overflowHidden,\n.row[data-jsx=\"1796854545\"] .name[data-jsx=\"1796854545\"],\n.row[data-jsx=\"1796854545\"] .value[data-jsx=\"1796854545\"] {overflow: hidden;}.nowrap,\n.row[data-jsx=\"1796854545\"] .name[data-jsx=\"1796854545\"],\n.row[data-jsx=\"1796854545\"] .value[data-jsx=\"1796854545\"] {white-space: nowrap;}.f14,\n.row[data-jsx=\"1796854545\"] input[data-jsx=\"1796854545\"] {font-size: 14px;}.darkBlue50,\n.row[data-jsx=\"1796854545\"] input[data-jsx=\"1796854545\"] {color: rgba(23,42,58,.5);}.w100,\n.row[data-jsx=\"1796854545\"] input[data-jsx=\"1796854545\"] {width: 100%;}.pointer:hover,\n.row[data-jsx=\"1796854545\"] .icon[data-jsx=\"1796854545\"]:hover {cursor: pointer;}.tr,\n.row[data-jsx=\"1796854545\"] .icon[data-jsx=\"1796854545\"] {text-align: right;}.flex,\n.row[data-jsx=\"1796854545\"],\n.row[data-jsx=\"1796854545\"] .icon[data-jsx=\"1796854545\"] {display: -ms-flexbox;display: flex;}.justifyCenter,\n.row[data-jsx=\"1796854545\"] .icon[data-jsx=\"1796854545\"] {-ms-flex-pack: center;justify-content: center;}.flex1,\n.row[data-jsx=\"1796854545\"] .icon[data-jsx=\"1796854545\"] {-ms-flex: 1;flex: 1;}.flex1,\n.flexAuto,\n.row[data-jsx=\"1796854545\"] .icon[data-jsx=\"1796854545\"] {min-width: 0;min-height: 0;}"
            }),
            React.createElement(
                "div",
                { className: "name input", "data-jsx": 1796854545
                },
                React.createElement("input", { ref: this.setRef, name: "name", placeholder: "Type a name...", value: name, onChange: this.handleEditChange, onKeyDown: this.handleKeyDown, "data-jsx": 1796854545
                })
            ),
            React.createElement(
                "div",
                { className: "value input", "data-jsx": 1796854545
                },
                React.createElement("input", { name: "value", placeholder: "Type the content...", value: value, onChange: this.handleEditChange, onKeyDown: this.handleKeyDown, "data-jsx": 1796854545
                })
            ),
            editing ? React.createElement(
                "div",
                { className: "icon", onClick: this.handleValidate, "data-jsx": 1796854545
                },
                React.createElement(graphcool_styles_1.Icon, { src: require('graphcool-styles/icons/fill/check.svg'), color: graphcool_styles_1.$v.darkBlue50, width: 20, height: 20 })
            ) : React.createElement(
                "div",
                { className: "icon", onClick: this.handleDelete, "data-jsx": 1796854545
                },
                React.createElement(graphcool_styles_1.Icon, { src: require('graphcool-styles/icons/stroke/cross.svg'), color: graphcool_styles_1.$v.darkBlue50, width: 10, height: 10, stroke: true, strokeWidth: 6 })
            )
        );
    };
    return HttpListItem;
}(React.Component);
exports.default = HttpListItem;
//# sourceMappingURL=HttpListItem.jsx.map