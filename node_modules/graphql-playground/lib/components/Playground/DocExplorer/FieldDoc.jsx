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
var ReactDOM = require("react-dom");
var Argument_1 = require("./Argument");
var graphql_1 = require("graphql");
var MarkdownContent_1 = require("graphiql/dist/components/DocExplorer/MarkdownContent");
var TypeLink_1 = require("./TypeLink");
var DocTypeSchema_1 = require("./DocTypeSchema");
var ScalarType_1 = require("./DocsTypes/ScalarType");
var EnumTypeSchema_1 = require("./DocsTypes/EnumTypeSchema");
var UnionTypeSchema_1 = require("./DocsTypes/UnionTypeSchema");
var stack_1 = require("../util/stack");
var FieldDoc = /** @class */ (function (_super) {
    __extends(FieldDoc, _super);
    function FieldDoc() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { showDeprecated: false };
        return _this;
    }
    FieldDoc.prototype.componentDidMount = function () {
        this.scrollToRight();
    };
    FieldDoc.prototype.shouldComponentUpdate = function (nextProps) {
        if (this.props.field !== nextProps.field) {
            this.scrollToRight();
            return true;
        }
        return false;
    };
    FieldDoc.prototype.scrollToRight = function () {
        var explorer = ReactDOM.findDOMNode(this);
        var explorerDoc = explorer.parentNode && explorer.parentNode.parentNode;
        // TODO see browser compatibility scrollWidth && scrollLeft
        scrollToRight(explorerDoc, explorerDoc.scrollWidth, 50);
    };
    FieldDoc.prototype.render = function () {
        var _this = this;
        var _a = this.props, schema = _a.schema, field = _a.field, level = _a.level;
        var type = field.type || field;
        var obj = stack_1.serialize(schema, field);
        type = stack_1.getDeeperType(type);
        var argsOffset = obj.fields.length + obj.interfaces.length;
        var implementationsOffset = obj.fields.length + obj.interfaces.length + obj.args.length;
        return (<div>
        <style jsx={true} global={true}>{"\n          .doc-header .doc-category-item {\n            @p: .fw6, .f14;\n          }\n          .doc-header .doc-category-item .field-name {\n            color: #f25c54;\n          }\n          .doc-description {\n            @p: .ph16, .black50;\n          }\n        "}</style>
        <style jsx={true}>{"\n          .doc-header {\n            @p: .bgBlack02, .pb10, .pt20;\n          }\n          .doc-type-description {\n            @p: .pb16;\n          }\n          .doc-deprecation {\n            @p: .ph16, .black50;\n          }\n          .markdown-content {\n            @p: .pb20;\n          }\n        "}</style>
        <div className="doc-header">
          <TypeLink_1.default type={field} x={level} y={-1} clickable={false} sessionId={this.props.sessionId}/>
        </div>
        <MarkdownContent_1.default className="doc-type-description" markdown={field.description || ''}/>

        <div className="doc-category-title">{'type details'}</div>
        {type.description &&
            type.description.length > 0 && (<div className="markdown-content">
              <MarkdownContent_1.default className="doc-description" markdown={type.description || ''}/>
            </div>)}
        {type instanceof graphql_1.GraphQLScalarType && <ScalarType_1.default type={type}/>}
        {type instanceof graphql_1.GraphQLEnumType && <EnumTypeSchema_1.default type={type}/>}
        {type instanceof graphql_1.GraphQLUnionType && (<UnionTypeSchema_1.default type={type} schema={schema}/>)}

        {obj.fields.length > 0 && (<DocTypeSchema_1.default type={type} fields={obj.fields} interfaces={obj.interfaces} level={level} sessionId={this.props.sessionId}/>)}

        {obj.args.length > 0 && (<div>
            <div className="doc-category-title">arguments</div>
            {obj.args.map(function (arg, index) { return (<div key={arg.name}>
                <div>
                  <Argument_1.default arg={arg} x={level} y={index + argsOffset} sessionId={_this.props.sessionId}/>
                </div>
              </div>); })}
          </div>)}

        {obj.implementations.length > 0 && (<div>
            <div className="doc-category-title">implementations</div>
            {obj.implementations.map(function (data, index) { return (<TypeLink_1.default key={data.name} type={data} x={level} y={index + implementationsOffset} collapsable={true} sessionId={_this.props.sessionId}/>); })}
          </div>)}
      </div>);
    };
    return FieldDoc;
}(React.Component));
exports.default = FieldDoc;
var scrollToRight = function (element, to, duration) {
    if (duration <= 0) {
        return;
    }
    var difference = to - element.scrollLeft;
    var perTick = difference / duration * 10;
    setTimeout(function () {
        element.scrollLeft = element.scrollLeft + perTick;
        if (element.scrollLeft === to) {
            return;
        }
        scrollToRight(element, to, duration - 10);
    }, 10);
};
//# sourceMappingURL=FieldDoc.jsx.map