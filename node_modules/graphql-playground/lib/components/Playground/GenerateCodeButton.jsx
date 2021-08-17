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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Icon_1 = require("graphcool-styles/dist/components/Icon/Icon");
var Tooltip_1 = require("../Tooltip");
var cn = require("classnames");
var GenerateCodeButton = /** @class */ (function (_super) {
    __extends(GenerateCodeButton, _super);
    function GenerateCodeButton(props) {
        var _this = _super.call(this, props) || this;
        _this.toggleTooltip = function () {
            _this.setState(function (state) { return ({ open: !state.open }); });
        };
        _this.state = {
            open: false,
        };
        return _this;
    }
    GenerateCodeButton.prototype.render = function () {
        var open = this.state.open;
        return (<div className="code-generation-button">
        <style jsx={true}>{"\n          .code-generation-button {\n            @p: .absolute, .pointer;\n            z-index: 1005;\n            top: -59px;\n            right: 13px;\n            z-index: 2;\n          }\n          .tooltip-text {\n            @p: .mr10, .darkBlue50, .fw6, .ttu, .f14;\n            letter-spacing: 0.53px;\n          }\n          .icon {\n            @p: .pointer, .relative;\n          }\n          .generate-code {\n            padding: 8px;\n          }\n        "}</style>
        <div className={cn('icon', { open: open })}>
          <div className="generate-code" onClick={this.toggleTooltip}>
            <Icon_1.default width={4} height={20} src={require('../../assets/icons/dots.svg')}/>
          </div>
          <div className="tooltip">
            <Tooltip_1.default open={open} onClose={this.toggleTooltip} anchorOrigin={{
            horizontal: 'center',
            vertical: 'top',
        }}>
              <div>
                <div className="row">
                  <span className="tooltip-text" onClick={this.props.onOpenCodeGeneration}>
                    Generate Code
                  </span>
                </div>
              </div>
            </Tooltip_1.default>
          </div>
        </div>
      </div>);
    };
    return GenerateCodeButton;
}(React.Component));
exports.default = GenerateCodeButton;
//# sourceMappingURL=GenerateCodeButton.jsx.map