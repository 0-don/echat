"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var UnionTypeSchema = function (_a) {
    var schema = _a.schema, type = _a.type;
    var types = schema.getPossibleTypes(type);
    return (<div className="doc-type-schema">
      <style jsx={true}>{"\n        .doc-type-schema {\n          @p: .ph16, .pt20, .overflowAuto, .f14;\n        }\n        .doc-value {\n          @p: .ph16;\n        }\n      "}</style>
      <span className="field-name">union</span>{' '}
      <span className="type-name">{type.name}</span>
      {' = '}
      {types.map(function (value, index) {
        return <div key={value.name} className="doc-value">
          <span className="type-name">{value.name}</span>{' '}
          {index < types.length - 1 && <span>|</span>}
        </div>;
    })}
    </div>);
};
exports.default = UnionTypeSchema;
//# sourceMappingURL=UnionTypeSchema.jsx.map