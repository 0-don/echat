"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var cx = require("classnames");
var constants_1 = require("../../../constants");
var ColumnDoc = function (_a) {
    var children = _a.children, first = _a.first, _b = _a.overflow, overflow = _b === void 0 ? true : _b, _c = _a.width, width = _c === void 0 ? constants_1.columnWidth : _c;
    return (<div className={cx('graph-docs-column', { first: first, overflow: overflow })} style={{ width: width }}>
      <style jsx={true}>{"\n        .graph-docs-column {\n          @p: .flexFixed, .pb20, .br, .bBlack10, .flex, .flexColumn;\n        }\n        .overflow {\n          overflow-x: hidden;\n          overflow-y: scroll;\n        }\n      "}</style>
      {children}
    </div>);
};
exports.default = ColumnDoc;
//# sourceMappingURL=ColumnDoc.jsx.map