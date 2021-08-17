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
var graphcool_styles_1 = require("graphcool-styles");
var Tab = /** @class */function (_super) {
    __extends(Tab, _super);
    function Tab(props) {
        var _this = _super.call(this, props) || this;
        _this.handleMouseOverCross = function () {
            _this.setState({ overCross: true });
        };
        _this.handleMouseOutCross = function () {
            _this.setState({ overCross: false });
        };
        _this.handleSelectSession = function () {
            _this.props.onSelectSession(_this.props.session);
        };
        _this.handleCloseSession = function (e) {
            e.stopPropagation();
            _this.props.onCloseSession(_this.props.session);
        };
        _this.state = {
            overCross: false
        };
        return _this;
    }
    Tab.prototype.render = function () {
        var _a = this.props,
            session = _a.session,
            index = _a.index,
            selectedSessionIndex = _a.selectedSessionIndex,
            localTheme = _a.localTheme;
        var queryTypes = session.queryTypes;
        return React.createElement(
            "div",
            { className: "tab " + (index === selectedSessionIndex && 'active') + " " + localTheme, onClick: this.handleSelectSession, "data-jsx": 3368031133
            },
            React.createElement(_style2.default, {
                styleId: 3368031133,
                css: ".tab[data-jsx=\"3368031133\"] {height: 43px;padding: 10px;padding-top: 9px;border-bottom: 2px solid #172a3a;}.tab[data-jsx=\"3368031133\"]:first-of-type {margin-left: 0;}.light.tab[data-jsx=\"3368031133\"] {background-color: #e7eaec;border-bottom: 2px solid #eeeff0;}.light.tab[data-jsx=\"3368031133\"].active[data-jsx=\"3368031133\"] {background-color: #eeeff0;}.tab[data-jsx=\"3368031133\"]:hover .close {opacity: 1;}.light.tab[data-jsx=\"3368031133\"]:hover {background-color: #eeeff0;}.red-dot[data-jsx=\"3368031133\"] {width: 7px;height: 7px;}.query-type[data-jsx=\"3368031133\"] {height: 21px;width: 21px;margin-right: 2px;}.close[data-jsx=\"3368031133\"] {top: 1px;height: 13px;width: 13px;opacity: 0}.close[data-jsx=\"3368031133\"].active[data-jsx=\"3368031133\"] {opacity: 1;}.close[data-jsx=\"3368031133\"].hasCircle[data-jsx=\"3368031133\"] {opacity: 1;}.plus[data-jsx=\"3368031133\"] {width: 43px;}.history[data-jsx=\"3368031133\"] {top: 15px;right: 56px;}.change-theme[data-jsx=\"3368031133\"] {top: 200px;right: 200px;}.border-bottom[data-jsx=\"3368031133\"] {height: 8px;background-color: #eeeff0;width: 100%;}.circle[data-jsx=\"3368031133\"] {font-size: 9px;top: -2px;}.flex,\n.tab[data-jsx=\"3368031133\"],\n.icons[data-jsx=\"3368031133\"],\n.query-type[data-jsx=\"3368031133\"],\n.plus[data-jsx=\"3368031133\"],\n.query-types[data-jsx=\"3368031133\"] {display: -ms-flexbox;display: flex;}.itemsCenter,\n.tab[data-jsx=\"3368031133\"],\n.icons[data-jsx=\"3368031133\"],\n.query-type[data-jsx=\"3368031133\"],\n.plus[data-jsx=\"3368031133\"] {-webkit-box-align: center;-ms-flex-align: center;-ms-grid-row-align: center;align-items: center;}.bgDarkerBlue,\n.tab[data-jsx=\"3368031133\"] {background-color: #0f202e;}.br2,\n.tab[data-jsx=\"3368031133\"],\n.query-type[data-jsx=\"3368031133\"] {border-radius: 2px;}.brTop,\n.tab[data-jsx=\"3368031133\"] {border-bottom-right-radius: 0;}.brRight,\n.brTop,\n.tab[data-jsx=\"3368031133\"] {border-bottom-left-radius: 0;}.ml10,\n.tab[data-jsx=\"3368031133\"],\n.close[data-jsx=\"3368031133\"] {margin-left: 10px;}.bbox,\n.tab[data-jsx=\"3368031133\"] {box-sizing: border-box;}.pointer:hover,\n.tab[data-jsx=\"3368031133\"]:hover,\n.history[data-jsx=\"3368031133\"]:hover,\n.change-theme[data-jsx=\"3368031133\"]:hover {cursor: pointer;}.nowrap,\n.tab[data-jsx=\"3368031133\"] {white-space: nowrap;}.bgDarkBlue,\n.tab[data-jsx=\"3368031133\"].active[data-jsx=\"3368031133\"],\n.tab[data-jsx=\"3368031133\"]:hover {background-color: #172a3a;}.bgDarkBlue,\n.tab[data-jsx=\"3368031133\"].active[data-jsx=\"3368031133\"],\n.tab[data-jsx=\"3368031133\"]:hover {background-color: #172a3a;}.flex,\n.tab[data-jsx=\"3368031133\"],\n.icons[data-jsx=\"3368031133\"],\n.query-type[data-jsx=\"3368031133\"],\n.plus[data-jsx=\"3368031133\"],\n.query-types[data-jsx=\"3368031133\"] {display: -ms-flexbox;display: flex;}.itemsCenter,\n.tab[data-jsx=\"3368031133\"],\n.icons[data-jsx=\"3368031133\"],\n.query-type[data-jsx=\"3368031133\"],\n.plus[data-jsx=\"3368031133\"] {-webkit-box-align: center;-ms-flex-align: center;-ms-grid-row-align: center;align-items: center;}.o50,\n.icons[data-jsx=\"3368031133\"],\n.operation-name[data-jsx=\"3368031133\"] {opacity: .5;}.o100,\n.icons[data-jsx=\"3368031133\"].active[data-jsx=\"3368031133\"],\n.operation-name[data-jsx=\"3368031133\"].active[data-jsx=\"3368031133\"],\n.close[data-jsx=\"3368031133\"].active[data-jsx=\"3368031133\"] {opacity: 1;}.br100,\n.red-dot[data-jsx=\"3368031133\"] {border-radius: 100%;}.bgrRed,\n.red-dot[data-jsx=\"3368031133\"] {background-color: #f25c54;}.mr10,\n.red-dot[data-jsx=\"3368031133\"],\n.viewer[data-jsx=\"3368031133\"] {margin-right: 10px;}.br2,\n.tab[data-jsx=\"3368031133\"],\n.query-type[data-jsx=\"3368031133\"] {border-radius: 2px;}.flex,\n.tab[data-jsx=\"3368031133\"],\n.icons[data-jsx=\"3368031133\"],\n.query-type[data-jsx=\"3368031133\"],\n.plus[data-jsx=\"3368031133\"],\n.query-types[data-jsx=\"3368031133\"] {display: -ms-flexbox;display: flex;}.itemsCenter,\n.tab[data-jsx=\"3368031133\"],\n.icons[data-jsx=\"3368031133\"],\n.query-type[data-jsx=\"3368031133\"],\n.plus[data-jsx=\"3368031133\"] {-webkit-box-align: center;-ms-flex-align: center;-ms-grid-row-align: center;align-items: center;}.justifyCenter,\n.query-type[data-jsx=\"3368031133\"],\n.plus[data-jsx=\"3368031133\"] {-ms-flex-pack: center;justify-content: center;}.mr4,\n.query-type[data-jsx=\"3368031133\"] {margin-right: 4px;}.fw7,\n.query-type[data-jsx=\"3368031133\"] {font-weight: 700;}.f12,\n.query-type[data-jsx=\"3368031133\"] {font-size: 12px;}.white,\n.light[data-jsx=\"3368031133\"] .query-type[data-jsx=\"3368031133\"] {color: #fff;}.bgPurple,\n.subscription[data-jsx=\"3368031133\"] {background-color: #a4036f;}.bgBlue,\n.query[data-jsx=\"3368031133\"] {background-color: #2a7ed2;}.bgLightOrange,\n.mutation[data-jsx=\"3368031133\"] {background-color: #f18f01;}.mr10,\n.red-dot[data-jsx=\"3368031133\"],\n.viewer[data-jsx=\"3368031133\"] {margin-right: 10px;}.o50,\n.icons[data-jsx=\"3368031133\"],\n.operation-name[data-jsx=\"3368031133\"] {opacity: .5;}.o100,\n.icons[data-jsx=\"3368031133\"].active[data-jsx=\"3368031133\"],\n.operation-name[data-jsx=\"3368031133\"].active[data-jsx=\"3368031133\"],\n.close[data-jsx=\"3368031133\"].active[data-jsx=\"3368031133\"] {opacity: 1;}.ml10,\n.tab[data-jsx=\"3368031133\"],\n.close[data-jsx=\"3368031133\"] {margin-left: 10px;}.relative,\n.close[data-jsx=\"3368031133\"],\n.circle[data-jsx=\"3368031133\"] {position: relative;}.o100,\n.icons[data-jsx=\"3368031133\"].active[data-jsx=\"3368031133\"],\n.operation-name[data-jsx=\"3368031133\"].active[data-jsx=\"3368031133\"],\n.close[data-jsx=\"3368031133\"].active[data-jsx=\"3368031133\"] {opacity: 1;}.flex,\n.tab[data-jsx=\"3368031133\"],\n.icons[data-jsx=\"3368031133\"],\n.query-type[data-jsx=\"3368031133\"],\n.plus[data-jsx=\"3368031133\"],\n.query-types[data-jsx=\"3368031133\"] {display: -ms-flexbox;display: flex;}.justifyCenter,\n.query-type[data-jsx=\"3368031133\"],\n.plus[data-jsx=\"3368031133\"] {-ms-flex-pack: center;justify-content: center;}.itemsCenter,\n.tab[data-jsx=\"3368031133\"],\n.icons[data-jsx=\"3368031133\"],\n.query-type[data-jsx=\"3368031133\"],\n.plus[data-jsx=\"3368031133\"] {-webkit-box-align: center;-ms-flex-align: center;-ms-grid-row-align: center;align-items: center;}.pointer:hover,\n.tab[data-jsx=\"3368031133\"]:hover,\n.history[data-jsx=\"3368031133\"]:hover,\n.change-theme[data-jsx=\"3368031133\"]:hover {cursor: pointer;}.absolute,\n.history[data-jsx=\"3368031133\"],\n.change-theme[data-jsx=\"3368031133\"] {position: absolute;}.absolute,\n.history[data-jsx=\"3368031133\"],\n.change-theme[data-jsx=\"3368031133\"] {position: absolute;}.pointer:hover,\n.tab[data-jsx=\"3368031133\"]:hover,\n.history[data-jsx=\"3368031133\"]:hover,\n.change-theme[data-jsx=\"3368031133\"]:hover {cursor: pointer;}.white40,\n.circle[data-jsx=\"3368031133\"] {color: hsla(0,0%,100%,.4);}.relative,\n.close[data-jsx=\"3368031133\"],\n.circle[data-jsx=\"3368031133\"] {position: relative;}.darkBlue40,\n.light[data-jsx=\"3368031133\"] .circle[data-jsx=\"3368031133\"] {color: rgba(23,42,58,.4);}.flex,\n.tab[data-jsx=\"3368031133\"],\n.icons[data-jsx=\"3368031133\"],\n.query-type[data-jsx=\"3368031133\"],\n.plus[data-jsx=\"3368031133\"],\n.query-types[data-jsx=\"3368031133\"] {display: -ms-flexbox;display: flex;}"
            }),
            React.createElement(
                "div",
                { className: "icons " + (index === selectedSessionIndex && 'active'), "data-jsx": 3368031133
                },
                session.subscriptionActive && React.createElement("div", { className: "red-dot", "data-jsx": 3368031133
                }),
                React.createElement(
                    "div",
                    { className: "query-types", "data-jsx": 3368031133
                    },
                    queryTypes.query && React.createElement(
                        "div",
                        { className: "query-type query", "data-jsx": 3368031133
                        },
                        "Q"
                    ),
                    (session.isSettingsTab || session.isConfigTab) && React.createElement(
                        "div",
                        { className: "query-type query", "data-jsx": 3368031133
                        },
                        React.createElement(Icon_1.default, { src: require('graphcool-styles/icons/fill/settings.svg'), width: 12, height: 12, color: "white" })
                    ),
                    queryTypes.mutation && React.createElement(
                        "div",
                        { className: "query-type mutation", "data-jsx": 3368031133
                        },
                        "M"
                    ),
                    queryTypes.subscription && React.createElement(
                        "div",
                        { className: "query-type subscription", "data-jsx": 3368031133
                        },
                        "S"
                    )
                )
            ),
            React.createElement(
                "div",
                { className: "operation-name " + (index === selectedSessionIndex && 'active'), "data-jsx": 3368031133
                },
                session.name || session.operationName || queryTypes.firstOperationName || 'New Tab'
            ),
            React.createElement(
                "div",
                { className: "close" + (index === selectedSessionIndex ? ' active' : '') + (session.isFile && session.hasChanged && !this.state.overCross ? ' hasCircle' : ''), onClick: this.handleCloseSession, onMouseEnter: this.handleMouseOverCross, onMouseLeave: this.handleMouseOutCross, "data-jsx": 3368031133
                },
                session.isFile && session.hasChanged && !this.state.overCross ? React.createElement(
                    "div",
                    { className: "circle", "data-jsx": 3368031133
                    },
                    "\u2B24"
                ) : React.createElement(Icon_1.default, { src: require('graphcool-styles/icons/stroke/cross.svg'), stroke: true, color: localTheme === 'dark' ? 'rgb(74, 85, 95)' : graphcool_styles_1.$v.darkBlue40, width: 12, height: 11, strokeWidth: 7 })
            )
        );
    };
    return Tab;
}(React.PureComponent);
exports.default = Tab;
//# sourceMappingURL=Tab.jsx.map