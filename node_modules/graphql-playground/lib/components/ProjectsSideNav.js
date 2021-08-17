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
var ProjectsSideNavItem_1 = require("./ProjectsSideNavItem");
var graphcool_styles_1 = require("graphcool-styles");
var index_1 = require("../styled/index");
var theme = require("styled-theming");
var polished_1 = require("polished");
var util_1 = require("./util");
var ProjectsSideNav = /** @class */function (_super) {
    __extends(ProjectsSideNav, _super);
    function ProjectsSideNav() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProjectsSideNav.prototype.render = function () {
        var _this = this;
        var _a = this.props,
            config = _a.config,
            folderName = _a.folderName,
            onNewWorkspace = _a.onNewWorkspace,
            isElectron = _a.isElectron;
        var endpoints = config.extensions && config.extensions.endpoints;
        var projects = config.projects;
        return React.createElement(
            SideNav,
            null,
            React.createElement(
                List,
                { isElectron: isElectron },
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        TitleRow,
                        null,
                        React.createElement(
                            Title,
                            null,
                            folderName
                        ),
                        React.createElement(graphcool_styles_1.Icon, { src: require('graphcool-styles/icons/fill/settings.svg'), width: 18, height: 18, onClick: this.props.onEditConfig, className: 'settings-icon' })
                    ),
                    endpoints && this.renderEndpoints(endpoints),
                    projects && Object.keys(projects).map(function (projectName) {
                        var project = projects[projectName];
                        var projectEndpoints = project.extensions && project.extensions.endpoints;
                        if (!projectEndpoints) {
                            return null;
                        }
                        return React.createElement(
                            Project,
                            { key: projectName },
                            React.createElement(
                                ProjectName,
                                null,
                                projectName
                            ),
                            _this.renderEndpoints(projectEndpoints, projectName)
                        );
                    })
                )
            ),
            this.props.showNewWorkspace && React.createElement(
                Footer,
                null,
                React.createElement(
                    WorkspaceButton,
                    { onClick: onNewWorkspace },
                    React.createElement(graphcool_styles_1.Icon, { src: require('graphcool-styles/icons/stroke/addFull.svg'), stroke: true, color: graphcool_styles_1.$v.darkBlue, width: 14, height: 14, strokeWidth: 6 }),
                    "NEW WORKSPACE"
                )
            )
        );
    };
    ProjectsSideNav.prototype.renderEndpoints = function (endpoints, projectName) {
        var _this = this;
        return Object.keys(endpoints).map(function (env) {
            var endpoint = util_1.getEndpointFromEndpointConfig(endpoints[env]).endpoint;
            var count = _this.props.getSessionCount(endpoint);
            return React.createElement(ProjectsSideNavItem_1.default, { key: env, env: env, onSelectEnv: _this.props.onSelectEnv, activeEnv: _this.props.activeEnv, count: count, deep: Boolean(projectName), projectName: projectName, activeProjectName: _this.props.activeProjectName });
        });
    };
    return ProjectsSideNav;
}(React.Component);
exports.default = ProjectsSideNav;
var textColor = theme('mode', {
    light: function light(p) {
        return p.theme.colours.white;
    },
    dark: function dark(p) {
        return p.theme.colours.white;
    }
});
var backgroundColor = theme('mode', {
    light: function light(p) {
        return p.theme.colours.darkBlue;
    },
    dark: function dark(p) {
        return p.theme.colours.darkBlue;
    }
});
var darkerBackgroundColor = theme('mode', {
    light: function light(p) {
        return p.theme.colours.darkerBlue;
    },
    dark: function dark(p) {
        return p.theme.colours.darkerBlue;
    }
});
var borderColor = theme('mode', {
    light: function light(p) {
        return p.theme.colours.darkestBlue;
    },
    dark: function dark(p) {
        return p.theme.colours.darkestBlue;
    }
});
var footerBackgroundColor = theme('mode', {
    light: function light(p) {
        return p.theme.colours.darkBlue;
    },
    dark: function dark(p) {
        return p.theme.colours.darkBlue;
    }
});
var buttonFontColor = theme('mode', {
    light: function light(p) {
        return p.theme.colours.darkBlue;
    },
    dark: function dark(p) {
        return p.theme.colours.darkBlue;
    }
});
var buttonBackgroundColor = theme('mode', {
    light: function light(p) {
        return '#B9BFC4';
    },
    dark: function dark(p) {
        return '#B9BFC4';
    }
});
var buttonHoverBackgroundColor = theme('mode', {
    light: function light(p) {
        return polished_1.darken(0.1, '#B9BFC4');
    },
    dark: function dark(p) {
        return polished_1.darken(0.1, '#B9BFC4');
    }
});
var iconColor = theme('mode', {
    light: function light(p) {
        return p.theme.colours.white20;
    },
    dark: function dark(p) {
        return p.theme.colours.white20;
    }
});
var iconColorActive = theme('mode', {
    light: function light(p) {
        return p.theme.colours.white60;
    },
    dark: function dark(p) {
        return p.theme.colours.white60;
    }
});
var Project = index_1.styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin-bottom: 12px;\n"], ["\n  margin-bottom: 12px;\n"])));
var SideNav = index_1.styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: relative;\n  background: ", ";\n  flex: 0 222px;\n  color: ", ";\n\n    @p: .white, .relative, .bgDarkBlue;\n    border-right: 6px solid ", ";\n  }\n  .left-content.light {\n    @p: .bgWhite70, .black60;\n  }\n"], ["\n  position: relative;\n  background: ", ";\n  flex: 0 222px;\n  color: ", ";\n\n    @p: .white, .relative, .bgDarkBlue;\n    border-right: 6px solid ", ";\n  }\n  .left-content.light {\n    @p: .bgWhite70, .black60;\n  }\n"
// TODO fix typing
])), backgroundColor, textColor, borderColor);
// TODO fix typing
var List = index_1.styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  padding-top: ", "px;\n  padding-bottom: 32px;\n  max-width: 222px;\n  overflow: hidden;\n  background: ", ";\n"], ["\n  padding-top: ", "px;\n  padding-bottom: 32px;\n  max-width: 222px;\n  overflow: hidden;\n  background: ", ";\n"])), function (p) {
    return p.isElectron ? 48 : 20;
}, darkerBackgroundColor);
var Title = index_1.styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  font-size: 16px;\n  font-weight: 600;\n  color: white;\n"], ["\n  font-size: 16px;\n  font-weight: 600;\n  color: white;\n"])));
var TitleRow = index_1.styled.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  padding-left: 20px;\n  padding-right: 10px;\n  padding-bottom: 20px;\n  justify-content: space-between;\n\n  .settings-icon {\n    cursor: pointer;\n  }\n\n  .settings-icon svg {\n    fill: ", ";\n    transition: 0.1s linear fill;\n  }\n\n  &:hover {\n    .settings-icon svg {\n      fill: ", ";\n    }\n  }\n"], ["\n  display: flex;\n  align-items: center;\n  padding-left: 20px;\n  padding-right: 10px;\n  padding-bottom: 20px;\n  justify-content: space-between;\n\n  .settings-icon {\n    cursor: pointer;\n  }\n\n  .settings-icon svg {\n    fill: ", ";\n    transition: 0.1s linear fill;\n  }\n\n  &:hover {\n    .settings-icon svg {\n      fill: ", ";\n    }\n  }\n"])), iconColor, iconColorActive);
var ProjectName = index_1.styled.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  font-size: 14px;\n  color: white;\n  font-weight: 600;\n  letter-spacing: 0.53px;\n  margin-left: 30px;\n  margin-bottom: 6px;\n"], ["\n  font-size: 14px;\n  color: white;\n  font-weight: 600;\n  letter-spacing: 0.53px;\n  margin-left: 30px;\n  margin-bottom: 6px;\n"])));
var Footer = index_1.styled.div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  box-sizing: border-box;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 20px;\n  background: ", ";\n"], ["\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  box-sizing: border-box;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 20px;\n  background: ", ";\n"])), footerBackgroundColor);
var WorkspaceButton = index_1.styled.button(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  padding: 10px;\n  display: flex;\n  align-items: center;\n  border-radius: 2px;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 600;\n  letter-spacing: 0.53px;\n  color: ", ";\n  background-color: ", ";\n  transition: 0.1s linear all;\n  &:hover {\n    background-color: ", ";\n  }\n  i {\n    margin-right: 6px;\n  }\n  svg {\n    stroke: ", ";\n  }\n"], ["\n  padding: 10px;\n  display: flex;\n  align-items: center;\n  border-radius: 2px;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 600;\n  letter-spacing: 0.53px;\n  color: ", ";\n  background-color: ", ";\n  transition: 0.1s linear all;\n  &:hover {\n    background-color: ", ";\n  }\n  i {\n    margin-right: 6px;\n  }\n  svg {\n    stroke: ", ";\n  }\n"])), buttonFontColor, buttonBackgroundColor, buttonHoverBackgroundColor, buttonFontColor);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8;
//# sourceMappingURL=ProjectsSideNav.jsx.map