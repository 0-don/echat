"use strict";

var _style = require("styled-jsx/style");

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var cn = require("classnames");
var graphcool_styles_1 = require("graphcool-styles");
function A(_a) {
    var hideArrow = _a.hideArrow,
        primary = _a.primary,
        button = _a.button,
        green = _a.green,
        white = _a.white,
        gray = _a.gray,
        greenOnWhite = _a.greenOnWhite,
        arrowToBottom = _a.arrowToBottom,
        arrowToLeft = _a.arrowToLeft,
        children = _a.children,
        className = _a.className,
        wrap = _a.wrap,
        onClick = _a.onClick;
    return React.createElement(
        "div",
        { className: cn('link', className, {
                primary: primary,
                button: button,
                green: green,
                'green-on-white': greenOnWhite,
                white: white,
                arrowToBottom: arrowToBottom,
                arrowToLeft: arrowToLeft,
                gray: gray,
                wrap: wrap
            }), onClick: onClick, "data-jsx": 384220977
        },
        React.createElement(_style2.default, {
            styleId: 384220977,
            css: ".link.gray[data-jsx=\"384220977\"] svg {fill: rgba(23, 42, 58, .5);}.link.gray[data-jsx=\"384220977\"]:hover svg {fill: rgba(23, 42, 58, .7);}.link.white[data-jsx=\"384220977\"] svg {fill: rgba(255, 255, 255, .5);}.link.white[data-jsx=\"384220977\"]:hover svg {fill: rgba(255, 255, 255, .7);}.link[data-jsx=\"384220977\"] a,.link[data-jsx=\"384220977\"] > div[data-jsx=\"384220977\"] {font-size: inherit;color: inherit;}.link.wrap[data-jsx=\"384220977\"] a,.link.wrap[data-jsx=\"384220977\"] > div[data-jsx=\"384220977\"] {white-space: normal;text-align: right;}.link.arrowToLeft[data-jsx=\"384220977\"] a,.link.arrowToLeft[data-jsx=\"384220977\"] > div[data-jsx=\"384220977\"] {font-size: inherit;color: inherit;-moz-flex-direction: row-reverse;-webkit-box-orient: horizontal;-webkit-box-direction: reverse;-ms-flex-direction: row-reverse;flex-direction: row-reverse;}.button[data-jsx=\"384220977\"] {transition: background .25s ease, box-shadow .25s ease,            -webkit-transform .25s ease;transition: background .25s ease, box-shadow .25s ease,            transform .25s ease;transition: background .25s ease, box-shadow .25s ease,            transform .25s ease, -webkit-transform .25s ease;}.button[data-jsx=\"384220977\"] svg {fill: #fff !important;}.link.button.white[data-jsx=\"384220977\"] svg {fill: rgba(23, 42, 58, 1) !important;}.button.green-on-white[data-jsx=\"384220977\"] svg {fill: rgba(39, 174, 96, 1) !important;}.link.arrowToBottom[data-jsx=\"384220977\"] .arrow {-webkit-transform: rotate(90deg) !important;transform: rotate(90deg) !important;}.link.arrowToLeft[data-jsx=\"384220977\"] .arrow {-webkit-transform: rotate(180deg) !important;transform: rotate(180deg) !important;}.link[data-jsx=\"384220977\"]:hover {color: #69a4e0;}.button[data-jsx=\"384220977\"]:hover {color: #fff;background: #3f8ad7;box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, .15);-webkit-transform: translate3D(0, -1px, 0);transform: translate3D(0, -1px, 0);}.button.green[data-jsx=\"384220977\"]:hover {background: #3cb66f;}.button.white[data-jsx=\"384220977\"]:hover {color: rgba(23, 42, 58, .8);background: #fff;}.button.green-on-white[data-jsx=\"384220977\"]:hover {color: #3cb66f;background: #fff;}.link[data-jsx=\"384220977\"]:hover .arrow {-webkit-animation:a384220977move 1s ease infinite;animation:a384220977move 1s ease infinite;}.link.arrowToBottom[data-jsx=\"384220977\"]:hover .arrow {-webkit-animation:a384220977moveToBottom 1s ease infinite;animation:a384220977moveToBottom 1s ease infinite;}.link.arrowToLeft[data-jsx=\"384220977\"]:hover .arrow {-webkit-animation:a384220977moveToLeft 1s ease infinite;animation:a384220977moveToLeft 1s ease infinite;}@-webkit-keyframes a384220977move {0% {-webkit-transform: translate3D(0, 0, 0);transform: translate3D(0, 0, 0);}50% {-webkit-transform: translate3D(3px, 0, 0);transform: translate3D(3px, 0, 0);}100% {-webkit-transform: translate3D(0, 0, 0);transform: translate3D(0, 0, 0);}}@keyframes a384220977move {0% {-webkit-transform: translate3D(0, 0, 0);transform: translate3D(0, 0, 0);}50% {-webkit-transform: translate3D(3px, 0, 0);transform: translate3D(3px, 0, 0);}100% {-webkit-transform: translate3D(0, 0, 0);transform: translate3D(0, 0, 0);}}@-webkit-keyframes a384220977moveToBottom {0% {-webkit-transform: rotate(90deg) translate3D(0, 0, 0);transform: rotate(90deg) translate3D(0, 0, 0);}50% {-webkit-transform: rotate(90deg) translate3D(3px, 0, 0);transform: rotate(90deg) translate3D(3px, 0, 0);}100% {-webkit-transform: rotate(90deg) translate3D(0, 0, 0);transform: rotate(90deg) translate3D(0, 0, 0);}}@keyframes a384220977moveToBottom {0% {-webkit-transform: rotate(90deg) translate3D(0, 0, 0);transform: rotate(90deg) translate3D(0, 0, 0);}50% {-webkit-transform: rotate(90deg) translate3D(3px, 0, 0);transform: rotate(90deg) translate3D(3px, 0, 0);}100% {-webkit-transform: rotate(90deg) translate3D(0, 0, 0);transform: rotate(90deg) translate3D(0, 0, 0);}}@-webkit-keyframes a384220977moveToLeft {0% {-webkit-transform: rotate(180deg) translate3D(0, 0, 0);transform: rotate(180deg) translate3D(0, 0, 0);}50% {-webkit-transform: rotate(180deg) translate3D(3px, 0, 0);transform: rotate(180deg) translate3D(3px, 0, 0);}100% {-webkit-transform: rotate(180deg) translate3D(0, 0, 0);transform: rotate(180deg) translate3D(0, 0, 0);}}@keyframes a384220977moveToLeft {0% {-webkit-transform: rotate(180deg) translate3D(0, 0, 0);transform: rotate(180deg) translate3D(0, 0, 0);}50% {-webkit-transform: rotate(180deg) translate3D(3px, 0, 0);transform: rotate(180deg) translate3D(3px, 0, 0);}100% {-webkit-transform: rotate(180deg) translate3D(0, 0, 0);transform: rotate(180deg) translate3D(0, 0, 0);}}@media (min-width: 1000px) {.link.primary[data-jsx=\"384220977\"] {font-size: 16px;}}.pointer:hover,\n.link[data-jsx=\"384220977\"]:hover {cursor: pointer;}.dib,\n.link[data-jsx=\"384220977\"] {display: inline-block;}.blue,\n.link[data-jsx=\"384220977\"] {color: #2a7ed2;}.f14,\n.link[data-jsx=\"384220977\"] {font-size: 14px;}.flex,\n.link[data-jsx=\"384220977\"],\n.link[data-jsx=\"384220977\"] a,\n.link[data-jsx=\"384220977\"] > div[data-jsx=\"384220977\"],\n.link.arrowToLeft[data-jsx=\"384220977\"] a,\n.link.arrowToLeft[data-jsx=\"384220977\"] > div[data-jsx=\"384220977\"] {display: -ms-flexbox;display: flex;}.itemsCenter,\n.link[data-jsx=\"384220977\"],\n.link[data-jsx=\"384220977\"] a,\n.link[data-jsx=\"384220977\"] > div[data-jsx=\"384220977\"],\n.link.arrowToLeft[data-jsx=\"384220977\"] a,\n.link.arrowToLeft[data-jsx=\"384220977\"] > div[data-jsx=\"384220977\"] {-webkit-box-align: center;-ms-flex-align: center;-ms-grid-row-align: center;align-items: center;}.darkBlue50,\n.link.gray[data-jsx=\"384220977\"] {color: rgba(23,42,58,.5);}.darkBlue70,\n.link.gray[data-jsx=\"384220977\"]:hover {color: rgba(23,42,58,.7);}.white50,\n.link.white[data-jsx=\"384220977\"] {color: hsla(0,0%,100%,.5);}.white70,\n.link.white[data-jsx=\"384220977\"]:hover {color: hsla(0,0%,100%,.7);}.flex,\n.link[data-jsx=\"384220977\"],\n.link[data-jsx=\"384220977\"] a,\n.link[data-jsx=\"384220977\"] > div[data-jsx=\"384220977\"],\n.link.arrowToLeft[data-jsx=\"384220977\"] a,\n.link.arrowToLeft[data-jsx=\"384220977\"] > div[data-jsx=\"384220977\"] {display: -ms-flexbox;display: flex;}.itemsCenter,\n.link[data-jsx=\"384220977\"],\n.link[data-jsx=\"384220977\"] a,\n.link[data-jsx=\"384220977\"] > div[data-jsx=\"384220977\"],\n.link.arrowToLeft[data-jsx=\"384220977\"] a,\n.link.arrowToLeft[data-jsx=\"384220977\"] > div[data-jsx=\"384220977\"] {-webkit-box-align: center;-ms-flex-align: center;-ms-grid-row-align: center;align-items: center;}.ttu,\n.link[data-jsx=\"384220977\"] a,\n.link[data-jsx=\"384220977\"] > div[data-jsx=\"384220977\"],\n.link.arrowToLeft[data-jsx=\"384220977\"] a,\n.link.arrowToLeft[data-jsx=\"384220977\"] > div[data-jsx=\"384220977\"] {text-transform: uppercase;}.tracked,\n.link[data-jsx=\"384220977\"] a,\n.link[data-jsx=\"384220977\"] > div[data-jsx=\"384220977\"],\n.link.arrowToLeft[data-jsx=\"384220977\"] a,\n.link.arrowToLeft[data-jsx=\"384220977\"] > div[data-jsx=\"384220977\"] {letter-spacing: 1px;}.fw6,\n.link[data-jsx=\"384220977\"] a,\n.link[data-jsx=\"384220977\"] > div[data-jsx=\"384220977\"],\n.link.arrowToLeft[data-jsx=\"384220977\"] a,\n.link.arrowToLeft[data-jsx=\"384220977\"] > div[data-jsx=\"384220977\"] {font-weight: 600;}.nowrap,\n.link[data-jsx=\"384220977\"] a,\n.link[data-jsx=\"384220977\"] > div[data-jsx=\"384220977\"],\n.link.arrowToLeft[data-jsx=\"384220977\"] a,\n.link.arrowToLeft[data-jsx=\"384220977\"] > div[data-jsx=\"384220977\"] {white-space: nowrap;}.noUnderline,\n.link[data-jsx=\"384220977\"] a,\n.link[data-jsx=\"384220977\"] > div[data-jsx=\"384220977\"],\n.link.arrowToLeft[data-jsx=\"384220977\"] a,\n.link.arrowToLeft[data-jsx=\"384220977\"] > div[data-jsx=\"384220977\"] {text-decoration: none;}.flex,\n.link[data-jsx=\"384220977\"],\n.link[data-jsx=\"384220977\"] a,\n.link[data-jsx=\"384220977\"] > div[data-jsx=\"384220977\"],\n.link.arrowToLeft[data-jsx=\"384220977\"] a,\n.link.arrowToLeft[data-jsx=\"384220977\"] > div[data-jsx=\"384220977\"] {display: -ms-flexbox;display: flex;}.itemsCenter,\n.link[data-jsx=\"384220977\"],\n.link[data-jsx=\"384220977\"] a,\n.link[data-jsx=\"384220977\"] > div[data-jsx=\"384220977\"],\n.link.arrowToLeft[data-jsx=\"384220977\"] a,\n.link.arrowToLeft[data-jsx=\"384220977\"] > div[data-jsx=\"384220977\"] {-webkit-box-align: center;-ms-flex-align: center;-ms-grid-row-align: center;align-items: center;}.ttu,\n.link[data-jsx=\"384220977\"] a,\n.link[data-jsx=\"384220977\"] > div[data-jsx=\"384220977\"],\n.link.arrowToLeft[data-jsx=\"384220977\"] a,\n.link.arrowToLeft[data-jsx=\"384220977\"] > div[data-jsx=\"384220977\"] {text-transform: uppercase;}.tracked,\n.link[data-jsx=\"384220977\"] a,\n.link[data-jsx=\"384220977\"] > div[data-jsx=\"384220977\"],\n.link.arrowToLeft[data-jsx=\"384220977\"] a,\n.link.arrowToLeft[data-jsx=\"384220977\"] > div[data-jsx=\"384220977\"] {letter-spacing: 1px;}.fw6,\n.link[data-jsx=\"384220977\"] a,\n.link[data-jsx=\"384220977\"] > div[data-jsx=\"384220977\"],\n.link.arrowToLeft[data-jsx=\"384220977\"] a,\n.link.arrowToLeft[data-jsx=\"384220977\"] > div[data-jsx=\"384220977\"] {font-weight: 600;}.nowrap,\n.link[data-jsx=\"384220977\"] a,\n.link[data-jsx=\"384220977\"] > div[data-jsx=\"384220977\"],\n.link.arrowToLeft[data-jsx=\"384220977\"] a,\n.link.arrowToLeft[data-jsx=\"384220977\"] > div[data-jsx=\"384220977\"] {white-space: nowrap;}.noUnderline,\n.link[data-jsx=\"384220977\"] a,\n.link[data-jsx=\"384220977\"] > div[data-jsx=\"384220977\"],\n.link.arrowToLeft[data-jsx=\"384220977\"] a,\n.link.arrowToLeft[data-jsx=\"384220977\"] > div[data-jsx=\"384220977\"] {text-decoration: none;}.br2,\n.button[data-jsx=\"384220977\"] {border-radius: 2px;}.pv6,\n.button[data-jsx=\"384220977\"] {padding-top: 6px;padding-bottom: 6px;}.ph10,\n.button[data-jsx=\"384220977\"] {padding-left: 10px;padding-right: 10px;}.buttonShadow,\n.button[data-jsx=\"384220977\"] {box-shadow: 0 1px 3px 0 rgba(0,0,0,.2);}.white,\n.button[data-jsx=\"384220977\"] {color: #fff;}.bgBlue,\n.button[data-jsx=\"384220977\"] {background-color: #2a7ed2;}.bgGreen,\n.button.green[data-jsx=\"384220977\"] {background-color: #27ae60;}.darkBlue,\n.link.button.white[data-jsx=\"384220977\"] {color: #172a3a;}.bgWhite,\n.link.button.white[data-jsx=\"384220977\"],\n.button.green-on-white[data-jsx=\"384220977\"] {background-color: #fff;}.green,\n.button.green-on-white[data-jsx=\"384220977\"] {color: #27ae60;}.bgWhite,\n.link.button.white[data-jsx=\"384220977\"],\n.button.green-on-white[data-jsx=\"384220977\"] {background-color: #fff;}.ml10,\n.link[data-jsx=\"384220977\"] .arrow {margin-left: 10px;}.ml0,\n.link.arrowToLeft[data-jsx=\"384220977\"] .arrow {margin-left: 0;}.mr10,\n.link.arrowToLeft[data-jsx=\"384220977\"] .arrow {margin-right: 10px;}"
        }),
        React.createElement(
            "div",
            {
                "data-jsx": 384220977
            },
            children ? children : 'Learn more',
            !hideArrow && React.createElement(graphcool_styles_1.Icon, { src: require('graphcool-styles/icons/fill/fullArrowRight.svg'), color: graphcool_styles_1.$v.blue, width: 14, height: 11, className: "arrow" })
        )
    );
}
exports.A = A;
function Button(_a) {
    var hideArrow = _a.hideArrow,
        primary = _a.primary,
        green = _a.green,
        white = _a.white,
        greenOnWhite = _a.greenOnWhite,
        arrowToBottom = _a.arrowToBottom,
        arrowToLeft = _a.arrowToLeft,
        children = _a.children,
        className = _a.className,
        wrap = _a.wrap,
        onClick = _a.onClick;
    return React.createElement(
        A,
        { button: true, hideArrow: hideArrow, primary: primary, green: green, white: white, greenOnWhite: greenOnWhite, arrowToBottom: arrowToBottom, arrowToLeft: arrowToLeft, className: className, wrap: wrap, onClick: onClick },
        children || null
    );
}
exports.Button = Button;
//# sourceMappingURL=Button.jsx.map