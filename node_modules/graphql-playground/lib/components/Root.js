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
var react_router_dom_1 = require("react-router-dom");
var App_1 = require("./App");
var Root = /** @class */function (_super) {
    __extends(Root, _super);
    function Root() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Root.prototype.render = function () {
        return React.createElement(
            react_router_dom_1.BrowserRouter,
            null,
            React.createElement(
                react_router_dom_1.Switch,
                null,
                React.createElement(react_router_dom_1.Route, { path: "/:id", component: App_1.default }),
                React.createElement(react_router_dom_1.Redirect, { from: "/", to: "/new", component: App_1.default })
            )
        );
    };
    return Root;
}(React.Component);
exports.default = Root;
//# sourceMappingURL=Root.jsx.map