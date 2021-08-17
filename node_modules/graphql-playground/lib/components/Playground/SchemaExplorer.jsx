"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var QueryEditor_1 = require("./QueryEditor");
function SchemaExplorer(_a) {
    var idl = _a.idl, modelName = _a.modelName;
    return (<div className="schema-explorer">
      <style jsx={true}>{"\n        .schema-explorer {\n          @p: .h100, .flex, .flexColumn, .bgDarkerBlue;\n        }\n        .header {\n          @p: .flexFixed, .f16, .fw6, .pt16, .pl16, .pr16, .white40, .ttu;\n          letter-spacing: 0.6px;\n        }\n        .schema-explorer :global(.CodeMirror-cursor) {\n          @p: .dn;\n        }\n      "}</style>
      <div className="header">
        Schema for „{modelName}“
      </div>
      <QueryEditor_1.QueryEditor schema={null} value={idl || ''} readOnly={true} hideLineNumbers={true}/>
    </div>);
}
exports.default = SchemaExplorer;
//# sourceMappingURL=SchemaExplorer.jsx.map