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
var ageOfDate_1 = require("./util/ageOfDate");
var ResultViewer_1 = require("./ResultViewer");
var Results = /** @class */function (_super) {
    __extends(Results, _super);
    function Results() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Results.prototype.render = function () {
        var _this = this;
        return React.createElement(
            "div",
            { className: 'result-window' + (this.props.disableResize ? ' disableResize' : ''), ref: this.props.setRef, "data-jsx": 1814441036
            },
            React.createElement(_style2.default, {
                styleId: 1814441036,
                css: ".result-window.disableResize[data-jsx=\"1814441036\"] .CodeMirror-gutters {cursor: default !important;}.subscription-time[data-jsx=\"1814441036\"] {height: 17px;margin-top: 12px;margin-bottom: 4px}.subscription-time[data-jsx=\"1814441036\"][data-jsx=\"1814441036\"]:before {content: '';top: 9px;left: 95px;border-top: 1px solid rgba(255, 255, 255, .2);}.subscription-time-text[data-jsx=\"1814441036\"] {padding-left: 15px;}.result-viewer-wrapper[data-jsx=\"1814441036\"] {position: absolute;top: 0;left: 0;right: 0;bottom: 0;overflow: auto;}.bgDarkBlue,\n.result-window[data-jsx=\"1814441036\"],\n.subscription-time-text[data-jsx=\"1814441036\"] {background-color: #172a3a;}.nosb,\n.result-window[data-jsx=\"1814441036\"] {-ms-overflow-style: none;}.nosb::-webkit-scrollbar,\n.result-window[data-jsx=\"1814441036\"]::-webkit-scrollbar {display: none;}.relative,\n.result-window[data-jsx=\"1814441036\"],\n.subscription-time[data-jsx=\"1814441036\"] {position: relative;}.relative,\n.result-window[data-jsx=\"1814441036\"],\n.subscription-time[data-jsx=\"1814441036\"] {position: relative;}.absolute,\n.subscription-time[data-jsx=\"1814441036\"][data-jsx=\"1814441036\"]:before {position: absolute;}.w100,\n.subscription-time[data-jsx=\"1814441036\"][data-jsx=\"1814441036\"]:before {width: 100%;}.bgDarkBlue,\n.result-window[data-jsx=\"1814441036\"],\n.subscription-time-text[data-jsx=\"1814441036\"] {background-color: #172a3a;}.white50,\n.subscription-time-text[data-jsx=\"1814441036\"] {color: hsla(0,0%,100%,.5);}.f12,\n.subscription-time-text[data-jsx=\"1814441036\"] {font-size: 12px;}"
            }),
            this.props.responses.map(function (response) {
                return React.createElement(
                    "div",
                    { key: response.resultID || String(response.time), "data-jsx": 1814441036
                    },
                    _this.props.responses.length > 1 && response.time && React.createElement(
                        "div",
                        { className: "subscription-time", "data-jsx": 1814441036
                        },
                        React.createElement(
                            "div",
                            { className: "subscription-time-text", "data-jsx": 1814441036
                            },
                            ageOfDate_1.default(response.time)
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "result-viewer-wrapper", "data-jsx": 1814441036
                        },
                        React.createElement(ResultViewer_1.ResultViewer, { value: response.date, hideGutters: _this.props.hideGutters })
                    )
                );
            })
        );
    };
    return Results;
}(React.Component);
exports.default = Results;
//# sourceMappingURL=Results.jsx.map