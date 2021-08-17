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
var CopyToClipboard = require("react-copy-to-clipboard");
var cn = require("classnames");
var Copy = /** @class */function (_super) {
    __extends(Copy, _super);
    function Copy(props) {
        var _this = _super.call(this, props) || this;
        _this.onCopy = function () {
            _this.setState({ copied: true });
            _this.copyTimer = window.setTimeout(function () {
                return _this.setState({ copied: false });
            }, 500);
        };
        _this.state = {
            copied: false
        };
        return _this;
    }
    Copy.prototype.componentWillUnmount = function () {
        clearTimeout(this.copyTimer);
    };
    Copy.prototype.render = function () {
        var _a = this.props,
            text = _a.text,
            className = _a.className;
        var color = this.props.color;
        color = color || graphcool_styles_1.$v.blue;
        return React.createElement(
            CopyToClipboard,
            { text: text, onCopy: this.onCopy },
            React.createElement(
                "div",
                { className: cn('copy', className), "data-jsx": 693600364
                },
                React.createElement(_style2.default, {
                    styleId: 693600364,
                    css: "@-webkit-keyframes a693600364copying {0% {opacity: 0;-webkit-transform: translate(-50%, 0);transform: translate(-50%, 0);}50% {opacity: 1;}100% {opacity: 0;-webkit-transform: translate(-50%, -50px);transform: translate(-50%, -50px);}}@keyframes a693600364copying {0% {opacity: 0;-webkit-transform: translate(-50%, 0);transform: translate(-50%, 0);}50% {opacity: 1;}100% {opacity: 0;-webkit-transform: translate(-50%, -50px);transform: translate(-50%, -50px);}}.indicator[data-jsx=\"693600364\"] {top: -20px;left: 50%;-webkit-transform: translate(-50%, 0);transform: translate(-50%, 0);-webkit-animation:a693600364copying 700ms linear;animation:a693600364copying 700ms linear;}.relative,\n.copy[data-jsx=\"693600364\"] {position: relative;}.absolute,\n.indicator[data-jsx=\"693600364\"] {position: absolute;}"
                }),
                this.state.copied && React.createElement(
                    "div",
                    { className: "indicator", style: { color: color }, "data-jsx": 693600364
                    },
                    "Copied"
                ),
                this.props.children
            )
        );
    };
    return Copy;
}(React.Component);
exports.default = Copy;
//# sourceMappingURL=Copy.jsx.map