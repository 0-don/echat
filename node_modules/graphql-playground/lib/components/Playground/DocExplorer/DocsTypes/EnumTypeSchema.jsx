"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var EnumTypeSchema = function (_a) {
    var type = _a.type;
    var values = type.getValues();
    var deprecatedValues = values.filter(function (value) { return value.isDeprecated; });
    return (<div className="doc-type-schema">
      <style jsx={true}>{"\n        .doc-type-schema {\n          @p: .ph16, .pt20, .overflowAuto, .f14;\n        }\n        .doc-value .field-name {\n          @p: .ph16;\n        }\n        .doc-value-comment {\n          @p: .ph16, .black50;\n        }\n      "}</style>
      <span className="field-name">enum</span>{' '}
      <span className="type-name">{type.name}</span>{' '}
      <span className="brace">{'{'}</span>
      {values
        .filter(function (value) { return !value.isDeprecated; })
        .map(function (value, index) {
        return <Value key={value.name} first={index === 0} value={value}/>;
    })}
      {deprecatedValues.length > 0 && <br />}
      {deprecatedValues.map(function (value, index) {
        return <Value first={index === 0} key={value.name} value={value} isDeprecated={true}/>;
    })}
      <span className="brace">{'}'}</span>
    </div>);
};
exports.default = EnumTypeSchema;
var Value = function (_a) {
    var value = _a.value, isDeprecated = _a.isDeprecated, first = _a.first;
    return <div className={"doc-value" + (first ? ' doc-value--first' : '')}>
    <style jsx={true}>{"\n      .doc-value {\n        margin-top: 6px;\n      }\n      .doc-value--first {\n        margin-top: 0px;\n      }\n      .doc-value .field-name {\n        @p: .ph16;\n        color: red;\n      }\n      .doc-value-comment {\n        @p: .ph16, .black50;\n      }\n    "}</style>
    <div className="field-name">
      {value.name}
    </div>
    {value.description &&
        <div className="doc-value-comment">
        {value.description}
      </div>}
    {isDeprecated &&
        <div className="doc-value-comment">
        Deprecated: {value.deprecationReason}
      </div>}
  </div>;
};
//# sourceMappingURL=EnumTypeSchema.jsx.map