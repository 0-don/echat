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
var ExecuteButtonOperation = /** @class */ (function (_super) {
    __extends(ExecuteButtonOperation, _super);
    function ExecuteButtonOperation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleMouseOver = function () {
            _this.props.onMouseOver(_this.props.operation);
        };
        _this.handleMouseOut = function () {
            _this.props.onMouseOut();
        };
        _this.handleMouseUp = function () {
            _this.props.onMouseUp(_this.props.operation);
        };
        return _this;
    }
    ExecuteButtonOperation.prototype.render = function () {
        var _a = this.props, operation = _a.operation, highlight = _a.highlight;
        return (<li key={operation.name ? operation.name.value : '*'} className={operation === highlight ? 'selected' : ''} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} onMouseUp={this.handleMouseUp}>
        {operation.name ? operation.name.value : '<Unnamed>'}
      </li>);
    };
    return ExecuteButtonOperation;
}(React.Component));
exports.default = ExecuteButtonOperation;
//# sourceMappingURL=ExecuteButtonOperation.jsx.map