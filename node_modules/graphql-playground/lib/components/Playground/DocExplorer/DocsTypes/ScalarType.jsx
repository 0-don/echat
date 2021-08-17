"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ScalarTypeSchema = function (_a) {
    var type = _a.type;
    return (<div className="doc-type-schema">
      <style jsx={true}>{"\n        .doc-type-schema {\n          @p: .ph16, .pt20, .overflowAuto, .f14;\n        }\n      "}</style>
      <span className="field-name">scalar</span>{' '}
      <span className="type-name">{type.name}</span>
    </div>);
};
exports.default = ScalarTypeSchema;
//# sourceMappingURL=ScalarType.jsx.map