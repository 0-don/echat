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
var Icon_1 = require("graphcool-styles/dist/components/Icon/Icon");
var Tooltip_1 = require("../Tooltip");
var cn = require("classnames");
var GenerateCodeButton = /** @class */function (_super) {
    __extends(GenerateCodeButton, _super);
    function GenerateCodeButton(props) {
        var _this = _super.call(this, props) || this;
        _this.toggleTooltip = function () {
            _this.setState(function (state) {
                return { open: !state.open };
            });
        };
        _this.state = {
            open: false
        };
        return _this;
    }
    GenerateCodeButton.prototype.render = function () {
        var open = this.state.open;
        return React.createElement(
            "div",
            { className: "code-generation-button", "data-jsx": 401403508
            },
            React.createElement(_style2.default, {
                styleId: 401403508,
                css: ".code-generation-button[data-jsx=\"401403508\"] {z-index: 1005;top: -59px;right: 13px;z-index: 2;}.tooltip-text[data-jsx=\"401403508\"] {letter-spacing: 0.53px;}.generate-code[data-jsx=\"401403508\"] {padding: 8px;}.absolute,\n.code-generation-button[data-jsx=\"401403508\"] {position: absolute;}.pointer:hover,\n.code-generation-button[data-jsx=\"401403508\"]:hover,\n.icon[data-jsx=\"401403508\"]:hover {cursor: pointer;}.mr10,\n.tooltip-text[data-jsx=\"401403508\"] {margin-right: 10px;}.darkBlue50,\n.tooltip-text[data-jsx=\"401403508\"] {color: rgba(23,42,58,.5);}.fw6,\n.tooltip-text[data-jsx=\"401403508\"] {font-weight: 600;}.ttu,\n.tooltip-text[data-jsx=\"401403508\"] {text-transform: uppercase;}.f14,\n.tooltip-text[data-jsx=\"401403508\"] {font-size: 14px;}.pointer:hover,\n.code-generation-button[data-jsx=\"401403508\"]:hover,\n.icon[data-jsx=\"401403508\"]:hover {cursor: pointer;}.relative,\n.icon[data-jsx=\"401403508\"] {position: relative;}"
            }),
            React.createElement(
                "div",
                { className: cn('icon', { open: open }), "data-jsx": 401403508
                },
                React.createElement(
                    "div",
                    { className: "generate-code", onClick: this.toggleTooltip, "data-jsx": 401403508
                    },
                    React.createElement(Icon_1.default, { width: 4, height: 20, src: require('../../assets/icons/dots.svg') })
                ),
                React.createElement(
                    "div",
                    { className: "tooltip", "data-jsx": 401403508
                    },
                    React.createElement(
                        Tooltip_1.default,
                        { open: open, onClose: this.toggleTooltip, anchorOrigin: {
                                horizontal: 'center',
                                vertical: 'top'
                            } },
                        React.createElement(
                            "div",
                            {
                                "data-jsx": 401403508
                            },
                            React.createElement(
                                "div",
                                { className: "row", "data-jsx": 401403508
                                },
                                React.createElement(
                                    "span",
                                    { className: "tooltip-text", onClick: this.props.onOpenCodeGeneration, "data-jsx": 401403508
                                    },
                                    "Generate Code"
                                )
                            )
                        )
                    )
                )
            )
        );
    };
    return GenerateCodeButton;
}(React.Component);
exports.default = GenerateCodeButton;
//# sourceMappingURL=GenerateCodeButton.jsx.map