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
var Tooltip_1 = require("../../Tooltip");
var HttpListItem_1 = require("./HttpListItem");
var HttpHeaders = /** @class */ (function (_super) {
    __extends(HttpHeaders, _super);
    function HttpHeaders(props) {
        var _this = _super.call(this, props) || this;
        _this.handleToggle = function () {
            _this.setState({ open: !_this.state.open });
        };
        _this.handleClickNewHeader = function () {
            _this.setState({ newHeader: true });
        };
        _this.handleChange = function (index, header) {
            var headers = _this.props.headers;
            if (typeof headers.asMutable === 'function') {
                headers = headers.asMutable();
            }
            if (headers) {
                // If new item add it at the end of the array
                if (index === -1) {
                    headers = headers.concat([header]);
                }
                else {
                    headers[index] = header;
                }
                if (_this.props.onChange) {
                    _this.props.onChange(headers);
                }
            }
            _this.setState({ newHeader: false });
        };
        _this.handleDelete = function (index) {
            // If delete new item
            if (index === -1) {
                _this.setState({ newHeader: false });
                return;
            }
            var headers = _this.props.headers;
            if (headers) {
                if (headers.asMutable) {
                    headers = headers.asMutable();
                }
                headers.splice(index, 1);
                if (_this.props.onChange) {
                    _this.props.onChange(headers);
                }
            }
        };
        _this.state = {
            open: false,
            newHeader: false,
        };
        return _this;
    }
    HttpHeaders.prototype.render = function () {
        var _this = this;
        var headers = this.props.headers;
        var _a = this.state, open = _a.open, newHeader = _a.newHeader;
        return (<div className="http-headers-container">
        <style jsx={true} global={true}>{"\n          .http-headers-container .tooltip-content {\n            padding: 0 !important;\n          }\n        "}</style>
        <style jsx={true}>{"\n          .http-headers-container {\n            @p: .absolute;\n            top: -57px;\n            left: 25px;\n            z-index: 3;\n          }\n          .graphiql-button {\n            @p: .white50, .bgDarkBlue, .ttu, .f14, .fw6, .br2, .pointer,\n              .relative;\n            padding: 5px 9px 6px 9px;\n          }\n          .http-headers-container .list-content {\n            @p: .flex, .flexColumn;\n            text-transform: none;\n            width: 400px;\n          }\n          .row {\n            @p: .flex, .flexRow, .itemsCenter, .bb, .bBlack10, .ph16, .pv10;\n          }\n          .row.row-inactive {\n            @p: .pointer, .darkBlue50;\n            border: none;\n          }\n        "}</style>
        <div className="graphiql-button" onClick={this.handleToggle}>
          Http Headers ({(headers && headers.length) || 0})
        </div>
        <Tooltip_1.default open={open} onClose={this.handleToggle} anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
        }}>
          <div className="list-content">
            {headers &&
            headers.map(function (header, index) {
                return <HttpListItem_1.default key={index} index={index} header={header} onChange={_this.handleChange} onDelete={_this.handleDelete}/>;
            })}
            {newHeader &&
            <HttpListItem_1.default index={-1} header={{ name: '', value: '' }} onChange={this.handleChange} onDelete={this.handleDelete}/>}
            <div className="row row-inactive" onClick={this.handleClickNewHeader}>
              + add new Header
            </div>
          </div>
        </Tooltip_1.default>
      </div>);
    };
    HttpHeaders.defaultProps = {
        headers: [],
    };
    return HttpHeaders;
}(React.PureComponent));
exports.default = HttpHeaders;
//# sourceMappingURL=HttpHeaders.jsx.map