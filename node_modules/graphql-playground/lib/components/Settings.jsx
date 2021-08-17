"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Icon_1 = require("graphcool-styles/dist/components/Icon/Icon");
var styled_1 = require("../styled");
var theme = require("styled-theming");
var Settings = /** @class */ (function (_super) {
    __extends(Settings, _super);
    function Settings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Settings.prototype.render = function () {
        return (<Wrapper>
        <IconWrapper>
          <Icon_1.default src={require('graphcool-styles/icons/fill/settings.svg')} width={23} height={23} onClick={this.props.onClick} className={'settings-icon'}/>
        </IconWrapper>
      </Wrapper>);
    };
    return Settings;
}(React.Component));
exports.default = Settings;
var Wrapper = styled_1.styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: absolute;\n  z-index: 1005;\n  right: 20px;\n  top: 17px;\n"], ["\n  position: absolute;\n  z-index: 1005;\n  right: 20px;\n  top: 17px;\n"])));
var iconColor = theme('mode', {
    light: function (p) { return p.theme.colours.darkBlue20; },
    dark: function (p) { return p.theme.colours.white20; },
});
var iconColorActive = theme('mode', {
    light: function (p) { return p.theme.colours.darkBlue60; },
    dark: function (p) { return p.theme.colours.white60; },
});
// prettier-ignore
var IconWrapper = styled_1.styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: relative;\n  cursor: pointer;\n\n  .settings-icon svg {\n    fill: ", ";\n    transition: 0.1s linear fill;\n  }\n\n  &:hover {\n    .settings-icon svg {\n      fill: ", ";\n    }\n  }\n"], ["\n  position: relative;\n  cursor: pointer;\n\n  .settings-icon svg {\n    fill: ", ";\n    transition: 0.1s linear fill;\n  }\n\n  &:hover {\n    .settings-icon svg {\n      fill: ", ";\n    }\n  }\n"])), iconColor, iconColorActive);
var templateObject_1, templateObject_2;
//# sourceMappingURL=Settings.jsx.map