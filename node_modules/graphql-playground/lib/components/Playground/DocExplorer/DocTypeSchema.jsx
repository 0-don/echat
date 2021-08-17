"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var TypeLink_1 = require("./TypeLink");
var DocTypeSchema = function (_a) {
    var type = _a.type, fields = _a.fields, interfaces = _a.interfaces, level = _a.level, sessionId = _a.sessionId;
    var nonDeprecatedFields = fields.filter(function (data) { return !data.isDeprecated; });
    var deprecatedFields = fields.filter(function (data) { return data.isDeprecated; });
    return (<div className="doc-type-schema">
      <style jsx={true} global={true}>{"\n        .doc-type-schema .doc-category-item {\n          padding-left: 32px;\n        }\n        .doc-type-interface .field-name {\n          color: rgb(245, 160, 0);\n        }\n        .doc-type-interface .type-name {\n          color: #f25c54;\n        }\n      "}</style>
      <style jsx={true}>{"\n        .doc-type-schema {\n          @p: .overflowAuto, .f14;\n        }\n        .doc-type-schema-line {\n          @p: .ph16, .pv6;\n          white-space: nowrap;\n        }\n        .doc-value-comment {\n          @p: .pr16, .black50;\n          padding-left: 32px;\n        }\n        .doc-type-interface {\n          @p: .pl16;\n        }\n        .type-line .type-name {\n          color: #f25c54;\n        }\n        .brace {\n          @p: .darkBlue50, .fw6;\n        }\n      "}</style>
      <div className="doc-type-schema-line type-line">
        <span className="field-name">type</span>{' '}
        <span className="type-name">{type.name}</span>{' '}
        {interfaces.length === 0 && <span className="brace">{"{"}</span>}
      </div>
      {interfaces.map(function (data, index) { return (<TypeLink_1.default key={data.name} type={data} x={level} y={index} collapsable={true} className="doc-type-interface" beforeNode={<span className="field-name">implements</span>} afterNode={index === interfaces.length - 1 ? (<span className="brace">{'{'}</span>) : null} sessionId={sessionId}/>); })}
      {nonDeprecatedFields.map(function (data, index) { return (<TypeLink_1.default key={data.name} type={data} x={level} y={index + interfaces.length} collapsable={true} sessionId={sessionId}/>); })}
      {deprecatedFields.length > 0 && <br />}
      {deprecatedFields.map(function (data, index) { return (<div key={data.name}>
          <span className="doc-value-comment">
            # Deprecated: {data.deprecationReason}
          </span>
          <TypeLink_1.default type={data} x={level} y={index + nonDeprecatedFields.length + interfaces.length} collapsable={true} sessionId={sessionId}/>
        </div>); })}
      <div className="doc-type-schema-line type-line">
        <span className="brace">{'}'}</span>
      </div>
    </div>);
};
exports.default = DocTypeSchema;
//# sourceMappingURL=DocTypeSchema.jsx.map