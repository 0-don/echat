"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var QueryHeader = function (_a) {
    var onPrettify = _a.onPrettify, showQueryTitle = _a.showQueryTitle;
    return <div className="query-header">
    <style jsx={true}>{"\n      .query-header {\n        @inherit: .bgDarkerBlue, .pa25, .flex, .justifyBetween, .itemsCenter;\n      }\n      .graphiql-button {\n        @inherit: .white50, .bgDarkBlue, .ttu, .f14, .fw6, .br2, .pointer;\n        margin-right: 33px;\n        padding: 5px 9px 6px 9px;\n        letter-spacing: 0.53px;\n      }\n    "}</style>
    {showQueryTitle && <div className="editor-title">Query</div>}
    <div className="graphiql-button" onClick={onPrettify}>
      Prettify
    </div>
  </div>;
};
exports.default = QueryHeader;
//# sourceMappingURL=QueryHeader.jsx.map