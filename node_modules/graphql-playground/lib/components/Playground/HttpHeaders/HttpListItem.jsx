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
var keycode = require("keycode");
var HttpListItem = /** @class */ (function (_super) {
    __extends(HttpListItem, _super);
    function HttpListItem(props) {
        var _this = _super.call(this, props) || this;
        _this.setRef = function (ref) {
            _this.inputRef = ref;
        };
        _this.handleKeyDown = function (e) {
            // Handle enter press and save header
            if (keycode(e) === 'enter' && _this.state.editing) {
                _this.handleValidate();
            }
        };
        _this.handleEditChange = function (_a) {
            var target = _a.target;
            _this.setState((_b = {}, _b[target.name] = target.value, _b.editing = true, _b));
            var _b;
        };
        _this.handleValidate = function () {
            if (_this.state.name && _this.state.value) {
                _this.props.onChange(_this.props.index, {
                    name: _this.state.name,
                    value: _this.state.value,
                });
                _this.setState({ editing: false });
            }
        };
        _this.handleDelete = function () {
            _this.props.onDelete(_this.props.index);
        };
        _this.state = {
            name: props.header.name,
            value: props.header.value,
            editing: false,
        };
        return _this;
    }
    HttpListItem.prototype.componentDidMount = function () {
        // If new element focus it
        if (this.props.index === -1) {
            this.inputRef.focus();
        }
    };
    HttpListItem.prototype.render = function () {
        var _a = this.state, editing = _a.editing, name = _a.name, value = _a.value;
        return (<div className="row">
        <style jsx={true}>{"\n          .row {\n            @p: .flex, .flexRow, .itemsCenter, .bb, .bBlack10, .ph16, .pv10;\n          }\n          .row .name {\n            @p: .toe, .overflowHidden, .nowrap;\n            flex: 0 30%;\n          }\n          .row .value {\n            @p: .toe, .overflowHidden, .nowrap;\n            flex: 0 60%;\n          }\n          .row input {\n            @p: .f14, .darkBlue50, .w100;\n            background: transparent;\n          }\n          .row .icon {\n            @p: .pointer, .tr, .flex, .justifyCenter, .flex1;\n          }\n        "}</style>
        <div className="name input">
          <input ref={this.setRef} name="name" placeholder="Type a name..." value={name} onChange={this.handleEditChange} onKeyDown={this.handleKeyDown}/>
        </div>
        <div className="value input">
          <input name="value" placeholder="Type the content..." value={value} onChange={this.handleEditChange} onKeyDown={this.handleKeyDown}/>
        </div>
        {editing
            ? <div className="icon" onClick={this.handleValidate}>
              <graphcool_styles_1.Icon src={require('graphcool-styles/icons/fill/check.svg')} color={graphcool_styles_1.$v.darkBlue50} width={20} height={20}/>
            </div>
            : <div className="icon" onClick={this.handleDelete}>
              <graphcool_styles_1.Icon src={require('graphcool-styles/icons/stroke/cross.svg')} color={graphcool_styles_1.$v.darkBlue50} width={10} height={10} stroke={true} strokeWidth={6}/>
            </div>}
      </div>);
    };
    return HttpListItem;
}(React.Component));
exports.default = HttpListItem;
//# sourceMappingURL=HttpListItem.jsx.map