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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ColumnDoc_1 = require("./ColumnDoc");
var SearchResults_1 = require("./SearchResults");
var GraphDocsRoot_1 = require("./GraphDocsRoot");
var SearchBox_1 = require("./SearchBox");
var RootColumn = /** @class */function (_super) {
    __extends(RootColumn, _super);
    function RootColumn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RootColumn.prototype.render = function () {
        var _a = this.props,
            searchValue = _a.searchValue,
            schema = _a.schema,
            width = _a.width,
            sessionId = _a.sessionId,
            handleSearch = _a.handleSearch;
        return React.createElement(
            ColumnDoc_1.default,
            { width: width, overflow: false },
            React.createElement(SearchBox_1.default, { isShown: true, onSearch: handleSearch }),
            React.createElement(
                "div",
                { className: "overflowAuto flexAuto" },
                searchValue && React.createElement(SearchResults_1.default, { searchValue: searchValue, schema: schema, level: 0, sessionId: sessionId }),
                !searchValue && React.createElement(GraphDocsRoot_1.default, { schema: schema, sessionId: sessionId })
            )
        );
    };
    return RootColumn;
}(React.PureComponent);
exports.default = RootColumn;
//# sourceMappingURL=RootColumn.jsx.map