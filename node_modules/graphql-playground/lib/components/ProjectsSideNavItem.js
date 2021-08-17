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
var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
    if (Object.defineProperty) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var cx = require("classnames");
var index_1 = require("../styled/index");
var ProjectsSideNavItem = /** @class */function (_super) {
    __extends(ProjectsSideNavItem, _super);
    function ProjectsSideNavItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selectEndpoint = function () {
            _this.props.onSelectEnv(_this.props.env, _this.props.projectName);
        };
        return _this;
    }
    ProjectsSideNavItem.prototype.render = function () {
        var _a = this.props,
            env = _a.env,
            activeEnv = _a.activeEnv,
            count = _a.count,
            deep = _a.deep,
            activeProjectName = _a.activeProjectName,
            projectName = _a.projectName;
        var active = activeEnv === env && activeProjectName === projectName;
        return React.createElement(
            ListItem,
            { className: cx({ active: active, deep: deep }), onClick: this.selectEndpoint },
            React.createElement(
                "span",
                null,
                env
            ),
            React.createElement(
                Count,
                { className: cx('count', { active: active }) },
                count
            )
        );
    };
    return ProjectsSideNavItem;
}(React.Component);
exports.default = ProjectsSideNavItem;
var ListItem = index_1.styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: 10px 10px;\n  font-weight: 600;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  cursor: pointer;\n  padding-left: 38px;\n  padding-right: 10px;\n  font-size: 12px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  &.deep {\n    padding-top: 10px;\n    padding-bottom: 10px;\n    padding-left: 43px;\n    padding-right: 10px;\n  }\n  &.active {\n    background: ", ";\n    position: relative;\n    &:before {\n      content: '';\n      border-radius: 2px;\n      background: ", ";\n      position: absolute;\n      top: -2px;\n      bottom: -2px;\n      left: -2px;\n      width: 6px;\n    }\n  }\n  &:hover {\n    background: ", ";\n    .count {\n      color: white;\n    }\n  }\n"], ["\n  padding: 10px 10px;\n  font-weight: 600;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  cursor: pointer;\n  padding-left: 38px;\n  padding-right: 10px;\n  font-size: 12px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  &.deep {\n    padding-top: 10px;\n    padding-bottom: 10px;\n    padding-left: 43px;\n    padding-right: 10px;\n  }\n  &.active {\n    background: ", ";\n    position: relative;\n    &:before {\n      content: '';\n      border-radius: 2px;\n      background: ", ";\n      position: absolute;\n      top: -2px;\n      bottom: -2px;\n      left: -2px;\n      width: 6px;\n    }\n  }\n  &:hover {\n    background: ", ";\n    .count {\n      color: white;\n    }\n  }\n"])), function (p) {
    return p.theme.colours.darkBlue;
}, function (p) {
    return p.theme.colours.green;
}, function (p) {
    return p.theme.colours.darkBlue;
});
var Count = index_1.styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  border-radius: 6px;\n  width: 18px;\n  height: 18px;\n  line-height: 18px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 11px;\n  font-weight: bold;\n  background: rgba(255, 255, 255, 0.05);\n  color: rgba(255, 255, 255, 0.3);\n  transition: 0.1s linear all;\n  &.active {\n    color: white;\n  }\n"], ["\n  border-radius: 6px;\n  width: 18px;\n  height: 18px;\n  line-height: 18px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 11px;\n  font-weight: bold;\n  background: rgba(255, 255, 255, 0.05);\n  color: rgba(255, 255, 255, 0.3);\n  transition: 0.1s linear all;\n  &.active {\n    color: white;\n  }\n"])));
var templateObject_1, templateObject_2;
//# sourceMappingURL=ProjectsSideNavItem.jsx.map