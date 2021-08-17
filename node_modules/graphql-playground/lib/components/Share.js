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
var Icon_1 = require("graphcool-styles/dist/components/Icon/Icon");
var graphcool_styles_1 = require("graphcool-styles");
var ToggleButton_1 = require("./ToggleButton");
var Tooltip_1 = require("./Tooltip");
var Button_1 = require("./Button");
var Copy_1 = require("./Copy");
var styled_1 = require("../styled");
var Share = /** @class */function (_super) {
  __extends(Share, _super);
  function Share(props) {
    var _this = _super.call(this, props) || this;
    _this.renderAuthSharingWarning = function () {
      if (!_this.props.isSharingAuthorization) {
        return null;
      }
      return React.createElement(AuthSharingWarning, null);
    };
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
  Share.prototype.render = function () {
    var open = this.state.open;
    var _a = this.props,
        allTabs = _a.allTabs,
        httpHeaders = _a.httpHeaders,
        history = _a.history,
        onToggleAllTabs = _a.onToggleAllTabs,
        onToggleHistory = _a.onToggleHistory,
        onToggleHttpHeaders = _a.onToggleHttpHeaders,
        shareUrl = _a.shareUrl,
        onShare = _a.onShare,
        reshare = _a.reshare;
    return React.createElement(
      Wrapper,
      null,
      React.createElement(_style2.default, {
        styleId: 636583701,
        css: ".share[data-jsx=\"636583701\"] {z-index: 1005;}.tooltip-text[data-jsx=\"636583701\"] {letter-spacing: 0.53px;}.tooltip[data-jsx=\"636583701\"] {right: -21px;}.row[data-jsx=\"636583701\"] {min-width: 245px;}.button[data-jsx=\"636583701\"] {border: 1.5px solid rgba(255, 255, 255, .2);padding: 5px 9px 6px 9px;}.button.light[data-jsx=\"636583701\"]:hover svg,.button.light.open[data-jsx=\"636583701\"] svg {stroke: rgba(23, 42, 58, .8);}.button[data-jsx=\"636583701\"]:hover svg,.button.open[data-jsx=\"636583701\"] svg {stroke: rgba(255, 255, 255, .8);}.copy[data-jsx=\"636583701\"]:hover svg {fill: rgba(23, 42, 58, .6);}.mr10,\n.tooltip-text[data-jsx=\"636583701\"] {margin-right: 10px;}.darkBlue50,\n.tooltip-text[data-jsx=\"636583701\"] {color: rgba(23,42,58,.5);}.fw6,\n.tooltip-text[data-jsx=\"636583701\"],\n.button[data-jsx=\"636583701\"],\ninput[data-jsx=\"636583701\"] {font-weight: 600;}.ttu,\n.tooltip-text[data-jsx=\"636583701\"],\n.button[data-jsx=\"636583701\"] {text-transform: uppercase;}.f14,\n.tooltip-text[data-jsx=\"636583701\"],\n.button[data-jsx=\"636583701\"] {font-size: 14px;}.pointer:hover,\n.icon[data-jsx=\"636583701\"]:hover {cursor: pointer;}.relative,\n.icon[data-jsx=\"636583701\"],\n.row[data-jsx=\"636583701\"] {position: relative;}.absolute,\n.tooltip[data-jsx=\"636583701\"],\n.copy[data-jsx=\"636583701\"] {position: absolute;}.flex,\n.row[data-jsx=\"636583701\"],\n.button[data-jsx=\"636583701\"] {display: -ms-flexbox;display: flex;}.itemsCenter,\n.row[data-jsx=\"636583701\"],\n.button[data-jsx=\"636583701\"] {-webkit-box-align: center;-ms-flex-align: center;-ms-grid-row-align: center;align-items: center;}.justifyBetween,\n.row[data-jsx=\"636583701\"] {-ms-flex-pack: justify;justify-content: space-between;}.relative,\n.icon[data-jsx=\"636583701\"],\n.row[data-jsx=\"636583701\"] {position: relative;}.absolute,\n.tooltip[data-jsx=\"636583701\"],\n.copy[data-jsx=\"636583701\"] {position: absolute;}.right0,\n.copy[data-jsx=\"636583701\"] {right: 0;}.mt16,\n.row[data-jsx=\"636583701\"] + .row[data-jsx=\"636583701\"] {margin-top: 16px;}.br2,\n.button[data-jsx=\"636583701\"],\ninput[data-jsx=\"636583701\"] {border-radius: 2px;}.f14,\n.tooltip-text[data-jsx=\"636583701\"],\n.button[data-jsx=\"636583701\"] {font-size: 14px;}.fw6,\n.tooltip-text[data-jsx=\"636583701\"],\n.button[data-jsx=\"636583701\"],\ninput[data-jsx=\"636583701\"] {font-weight: 600;}.ttu,\n.tooltip-text[data-jsx=\"636583701\"],\n.button[data-jsx=\"636583701\"] {text-transform: uppercase;}.flex,\n.row[data-jsx=\"636583701\"],\n.button[data-jsx=\"636583701\"] {display: -ms-flexbox;display: flex;}.itemsCenter,\n.row[data-jsx=\"636583701\"],\n.button[data-jsx=\"636583701\"] {-webkit-box-align: center;-ms-flex-align: center;-ms-grid-row-align: center;align-items: center;}.white40,\n.button[data-jsx=\"636583701\"] {color: hsla(0,0%,100%,.4);}.bWhite70,\n.button[data-jsx=\"636583701\"]:hover,\n.button.open[data-jsx=\"636583701\"] {border-color: hsla(0,0%,100%,.7);}.white80,\n.button[data-jsx=\"636583701\"]:hover,\n.button.open[data-jsx=\"636583701\"] {color: hsla(0,0%,100%,.8);}.ml10,\n.button[data-jsx=\"636583701\"] span[data-jsx=\"636583701\"] {margin-left: 10px;}.bDarkBlue10,\n.button.light[data-jsx=\"636583701\"] {border-color: rgba(23,42,58,.1);}.darkBlue40,\n.button.light[data-jsx=\"636583701\"] {color: rgba(23,42,58,.4);}.bDarkBlue70,\n.button.light[data-jsx=\"636583701\"]:hover,\n.button.light.open[data-jsx=\"636583701\"] {border-color: rgba(23,42,58,.7);}.darkBlue80,\n.button.light[data-jsx=\"636583701\"]:hover,\n.button.light.open[data-jsx=\"636583701\"] {color: rgba(23,42,58,.8);}.bgDarkBlue10,\ninput[data-jsx=\"636583701\"] {background-color: rgba(23,42,58,.1);}.br2,\n.button[data-jsx=\"636583701\"],\ninput[data-jsx=\"636583701\"] {border-radius: 2px;}.pv6,\ninput[data-jsx=\"636583701\"] {padding-top: 6px;padding-bottom: 6px;}.ph10,\ninput[data-jsx=\"636583701\"] {padding-left: 10px;padding-right: 10px;}.fw6,\n.tooltip-text[data-jsx=\"636583701\"],\n.button[data-jsx=\"636583701\"],\ninput[data-jsx=\"636583701\"] {font-weight: 600;}.darkBlue,\ninput[data-jsx=\"636583701\"] {color: #172a3a;}.f12,\ninput[data-jsx=\"636583701\"] {font-size: 12px;}.db,\ninput[data-jsx=\"636583701\"] {display: block;}.w100,\ninput[data-jsx=\"636583701\"] {width: 100%;}"
      }),
      React.createElement(
        IconWrapper,
        null,
        React.createElement(
          "div",
          { onClick: this.toggleTooltip, "data-jsx": 636583701
          },
          this.props.children
        ),
        React.createElement(
          TooltipWrapper,
          null,
          React.createElement(
            Tooltip_1.default,
            { open: open, onClose: this.toggleTooltip, anchorOrigin: {
                horizontal: 'right',
                vertical: 'bottom'
              }, renderAfterContent: this.renderAuthSharingWarning },
            React.createElement(
              "div",
              {
                "data-jsx": 636583701
              },
              React.createElement(
                Row,
                null,
                React.createElement(
                  TooltipText,
                  { onClick: onToggleAllTabs },
                  "Share all tabs",
                  ' '
                ),
                React.createElement(ToggleButton_1.default, { checked: allTabs, onChange: onToggleAllTabs })
              ),
              React.createElement(
                Row,
                null,
                React.createElement(
                  TooltipText,
                  { onClick: onToggleHttpHeaders },
                  "HTTP headers",
                  ' '
                ),
                React.createElement(ToggleButton_1.default, { checked: httpHeaders, onChange: onToggleHttpHeaders })
              ),
              React.createElement(
                Row,
                null,
                React.createElement(
                  TooltipText,
                  { onClick: onToggleHistory },
                  "History "
                ),
                React.createElement(ToggleButton_1.default, { checked: history, onChange: onToggleHistory })
              ),
              shareUrl && React.createElement(
                Row,
                null,
                React.createElement(Input, { value: shareUrl, disabled: true }),
                React.createElement(
                  CopyWrapper,
                  null,
                  React.createElement(
                    Copy_1.default,
                    { text: shareUrl },
                    React.createElement(Icon_1.default, { src: require('graphcool-styles/icons/fill/copy.svg'), color: graphcool_styles_1.$v.darkBlue30, width: 25, height: 25 })
                  )
                )
              ),
              React.createElement(
                Row,
                null,
                React.createElement("div", {
                  "data-jsx": 636583701
                }),
                React.createElement(
                  Button_1.Button,
                  { hideArrow: true, onClick: onShare },
                  reshare && shareUrl ? 'Reshare' : 'Share'
                )
              )
            )
          )
        )
      )
    );
  };
  return Share;
}(React.Component);
exports.default = Share;
var AuthSharingWarning = function AuthSharingWarning() {
  return React.createElement(
    Message,
    null,
    React.createElement(
      MessageTitle,
      null,
      "Watch out!"
    ),
    "You\u2019re sharing your ",
    React.createElement(
      "code",
      null,
      "Authorization"
    ),
    " header with the world!"
  );
};
// TODO: use theme
var pulse = styled_1.keyframes(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  0% {\n    transform: scale(1.04);\n  }\n\n  100% {\n    transform: scale(1);\n  }\n"], ["\n  0% {\n    transform: scale(1.04);\n  }\n\n  100% {\n    transform: scale(1);\n  }\n"])));
var Message = styled_1.styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  padding: 12px 16px;\n  margin-top: 10px;\n\n  font-size: 14px;\n  letter-spacing: normal;\n\n  cursor: default;\n  border-radius: 2px;\n  background: #f3f4f4;\n  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.15);\n\n  animation: ", " 0.7s ease-in-out infinite alternate;\n"], ["\n  padding: 12px 16px;\n  margin-top: 10px;\n\n  font-size: 14px;\n  letter-spacing: normal;\n\n  cursor: default;\n  border-radius: 2px;\n  background: #f3f4f4;\n  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.15);\n\n  animation: ", " 0.7s ease-in-out infinite alternate;\n"])), pulse);
var MessageTitle = styled_1.styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  margin-right: 3px;\n  margin-bottom: 2px;\n  font-weight: bold;\n  color: #2a7ed2;\n"], ["\n  margin-right: 3px;\n  margin-bottom: 2px;\n  font-weight: bold;\n  color: #2a7ed2;\n"
// Main styled components
])));
// Main styled components
var Wrapper = styled_1.styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  z-index: 1005;\n  height: 100%;\n  margin-left: 6px;\n"], ["\n  z-index: 1005;\n  height: 100%;\n  margin-left: 6px;\n"])));
var TooltipText = styled_1.styled.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  margin-right: 10px;\n\n  font-size: ", ";\n  font-weight: ", ";\n  text-transform: uppercase;\n  letter-spacing: 0.53px;\n\n  color: ", ";\n"], ["\n  margin-right: 10px;\n\n  font-size: ", ";\n  font-weight: ", ";\n  text-transform: uppercase;\n  letter-spacing: 0.53px;\n\n  color: ", ";\n"])), function (p) {
  return p.theme.sizes.fontSmall;
}, function (p) {
  return p.theme.sizes.fontSemiBold;
}, function (p) {
  return p.theme.colours.darkBlue50;
});
var IconWrapper = styled_1.styled.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  position: relative;\n  cursor: pointer;\n"], ["\n  position: relative;\n  cursor: pointer;\n"])));
var TooltipWrapper = styled_1.styled.div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  position: absolute;\n  right: 0px;\n"], ["\n  position: absolute;\n  right: 0px;\n"])));
var Row = styled_1.styled.div(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  position: relative;\n  min-width: 245px;\n  margin-top: ", ";\n\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n\n  &:first-child {\n    margin-top: 0;\n  }\n"], ["\n  position: relative;\n  min-width: 245px;\n  margin-top: ", ";\n\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n\n  &:first-child {\n    margin-top: 0;\n  }\n"])), function (p) {
  return p.theme.sizes.small16;
});
var CopyWrapper = styled_1.styled.div(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  position: absolute;\n  right: 0;\n\n  &:hover {\n    svg {\n      fill: ", ";\n    }\n  }\n"], ["\n  position: absolute;\n  right: 0;\n\n  &:hover {\n    svg {\n      fill: ", ";\n    }\n  }\n"])), function (p) {
  return p.theme.colours.darkBlue60;
});
var Input = styled_1.styled.input(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  display: block;\n  width: 100%;\n  padding: ", " ", ";\n\n  font-weight: ", ";\n  font-size: ", ";\n\n  border-radius: ", ";\n  background: ", ";\n  color: ", ";\n"], ["\n  display: block;\n  width: 100%;\n  padding: ", " ", ";\n\n  font-weight: ", ";\n  font-size: ", ";\n\n  border-radius: ", ";\n  background: ", ";\n  color: ", ";\n"])), function (p) {
  return p.theme.sizes.small6;
}, function (p) {
  return p.theme.sizes.small10;
}, function (p) {
  return p.theme.sizes.fontSemiBold;
}, function (p) {
  return p.theme.sizes.fontTiny;
}, function (p) {
  return p.theme.sizes.smallRadius;
}, function (p) {
  return p.theme.colours.darkBlue10;
}, function (p) {
  return p.theme.colours.darkBlue;
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10;
//# sourceMappingURL=Share.jsx.map