"use strict";

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
var PropTypes = require("prop-types");
var Theme = /** @class */function () {
    function Theme(theme) {
        this.theme = theme;
        this.subscriptions = [];
    }
    Theme.prototype.setTheme = function (theme) {
        this.theme = theme;
        this.subscriptions.forEach(function (f) {
            return f();
        });
    };
    Theme.prototype.subscribe = function (f) {
        this.subscriptions.push(f);
    };
    Theme.prototype.unsubscribe = function (f) {
        var i = this.subscriptions.indexOf(f);
        this.subscriptions.splice(i, 1);
    };
    return Theme;
}();
exports.Theme = Theme;
// tslint:disable-next-line
var ThemeProvider = /** @class */function (_super) {
    __extends(ThemeProvider, _super);
    function ThemeProvider(p, c) {
        var _this = _super.call(this, p, c) || this;
        // theme provider uses the same Theme object
        // during it's entire lifecycle
        _this.theme = new Theme(_this.props.theme);
        return _this;
    }
    // update theme whenever needed. This propagate changes to subscribed components
    ThemeProvider.prototype.componentWillReceiveProps = function (next) {
        this.theme.setTheme(next.theme);
    };
    ThemeProvider.prototype.getChildContext = function () {
        return { localTheme: this.theme };
    };
    ThemeProvider.prototype.render = function () {
        return this.props.children;
    };
    ThemeProvider.childContextTypes = {
        localTheme: PropTypes.object
    };
    return ThemeProvider;
}(React.PureComponent);
exports.default = ThemeProvider;
//# sourceMappingURL=ThemeProvider.jsx.map