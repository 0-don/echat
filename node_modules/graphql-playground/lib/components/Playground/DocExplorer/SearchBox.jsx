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
var debounce_1 = require("graphiql/dist/utility/debounce");
var graphcool_styles_1 = require("graphcool-styles");
var cx = require("classnames");
var SearchBox = /** @class */ (function (_super) {
    __extends(SearchBox, _super);
    function SearchBox(props) {
        var _this = _super.call(this, props) || this;
        _this.handleChange = function (event) {
            _this.setState({ value: event.target.value });
            _this.debouncedOnSearch();
        };
        _this.state = { value: '' };
        _this.debouncedOnSearch = debounce_1.default(200, function () {
            _this.props.onSearch(_this.state.value);
        });
        return _this;
    }
    SearchBox.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        return (nextProps.isShown !== this.props.isShown ||
            nextState.value !== this.state.value);
    };
    SearchBox.prototype.render = function () {
        return (<div className={cx(!this.props.clean && 'search-box')}>
        <style jsx={true}>{"\n          .search-box {\n            @p: .pa25, .bgBlack02, .bb, .bBlack10, .relative, .flexFixed;\n            z-index: 1;\n            margin-left: 6px;\n          }\n          .label {\n            @p: .bgWhite, .bbox, .w100, .flex, .itemsCenter, .bgWhite;\n            padding: 12px 14px 13px 15px;\n            box-shadow: 0 1px 3px rgba(0, 0, 0, .1);\n          }\n          .input {\n            @p: .f16, .ml10;\n          }\n          .input::placeholder {\n            color: rgba(0, 0, 0, 0.3);\n          }\n        "}</style>
        {this.props.isShown &&
            <label className="label">
            <graphcool_styles_1.Icon src={require('graphcool-styles/icons/stroke/search.svg')} stroke={true} strokeWidth={3} color={'rgba(0, 0, 0, 0.3)'}/>
            <input className="input" onChange={this.handleChange} type="text" value={this.state.value} placeholder={this.props.placeholder || 'Search the schema ...'}/>
          </label>}
      </div>);
    };
    return SearchBox;
}(React.Component));
exports.default = SearchBox;
//# sourceMappingURL=SearchBox.jsx.map