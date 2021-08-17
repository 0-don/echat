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
var graphcool_styles_1 = require("graphcool-styles");
var CopyToClipboard = require("react-copy-to-clipboard");
var cn = require("classnames");
var Copy = /** @class */ (function (_super) {
    __extends(Copy, _super);
    function Copy(props) {
        var _this = _super.call(this, props) || this;
        _this.onCopy = function () {
            _this.setState({ copied: true });
            _this.copyTimer = window.setTimeout(function () { return _this.setState({ copied: false }); }, 500);
        };
        _this.state = {
            copied: false,
        };
        return _this;
    }
    Copy.prototype.componentWillUnmount = function () {
        clearTimeout(this.copyTimer);
    };
    Copy.prototype.render = function () {
        var _a = this.props, text = _a.text, className = _a.className;
        var color = this.props.color;
        color = color || graphcool_styles_1.$v.blue;
        return (<CopyToClipboard text={text} onCopy={this.onCopy}>
        <div className={cn('copy', className)}>
          <style jsx={true}>{"\n            .copy {\n              @p: .relative;\n            }\n            @keyframes copying {\n              0% {\n                opacity: 0;\n                transform: translate(-50%, 0);\n              }\n\n              50% {\n                opacity: 1;\n              }\n\n              100% {\n                opacity: 0;\n                transform: translate(-50%, -50px);\n              }\n            }\n            .indicator {\n              @p: .absolute;\n              top: -20px;\n              left: 50%;\n              transform: translate(-50%, 0);\n              animation: copying 700ms linear;\n            }\n          "}</style>
          {this.state.copied && (<div className="indicator" style={{ color: color }}>
              Copied
            </div>)}
          {this.props.children}
        </div>
      </CopyToClipboard>);
    };
    return Copy;
}(React.Component));
exports.default = Copy;
//# sourceMappingURL=Copy.jsx.map