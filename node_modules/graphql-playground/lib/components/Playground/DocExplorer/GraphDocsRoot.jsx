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
var TypeLink_1 = require("./TypeLink");
var stack_1 = require("../util/stack");
var GraphDocsRoot = /** @class */ (function (_super) {
    __extends(GraphDocsRoot, _super);
    function GraphDocsRoot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GraphDocsRoot.prototype.render = function () {
        var _a = this.props, schema = _a.schema, sessionId = _a.sessionId;
        var obj = stack_1.serializeRoot(schema);
        return (<div className="doc-root">
        <style jsx={true}>{"\n          .doc-root {\n            padding-left: 6px;\n          }\n        "}</style>
        <style jsx={true} global={true}>{"\n          .doc-root .doc-category-item .field-name {\n            color: #f25c54;\n          }\n        "}</style>
        <ShowRootType name="Queries" fields={obj.queries} offset={0} sessionId={sessionId}/>
        {obj.mutations.length > 0 && (<ShowRootType name="Mutations" fields={obj.mutations} offset={obj.queries.length} sessionId={sessionId}/>)}
        {obj.subscriptions.length > 0 && (<ShowRootType name="Subscriptions" fields={obj.subscriptions} offset={obj.queries.length + obj.mutations.length} sessionId={sessionId}/>)}
      </div>);
    };
    return GraphDocsRoot;
}(React.PureComponent));
exports.default = GraphDocsRoot;
function ShowRootType(_a) {
    var name = _a.name, fields = _a.fields, offset = _a.offset, sessionId = _a.sessionId;
    return (<div>
      <div className="doc-category-title">{name}</div>
      {fields
        .filter(function (field) { return !field.isDeprecated; })
        .map(function (field, index) { return (<TypeLink_1.default key={field.name} type={field} x={0} y={offset + index} sessionId={sessionId} collapsable={true}/>); })}
    </div>);
}
//# sourceMappingURL=GraphDocsRoot.jsx.map