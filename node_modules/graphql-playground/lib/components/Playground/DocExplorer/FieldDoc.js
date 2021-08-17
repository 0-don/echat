"use strict";

var _style = require("styled-jsx/style");

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
var FieldDoc = /** @class */function (_super) {
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
        var _a = this.props,
            schema = _a.schema,
            field = _a.field,
            level = _a.level;
        var type = field.type || field;
        var obj = stack_1.serialize(schema, field);
        type = stack_1.getDeeperType(type);
        var argsOffset = obj.fields.length + obj.interfaces.length;
        var implementationsOffset = obj.fields.length + obj.interfaces.length + obj.args.length;
        return React.createElement(
            "div",
            {
                "data-jsx": 168896698
            },
            React.createElement(_style2.default, {
                styleId: 2436492813,
                css: "\n          .doc-header .doc-category-item .field-name {\n            color: #f25c54;\n          }\n          .fw6,\n.doc-header .doc-category-item {\n            font-weight: 600;\n}\n          .f14,\n.doc-header .doc-category-item {\n            font-size: 14px;\n}\n          .ph16,\n.doc-description {\n            padding-left: 16px;\n            padding-right: 16px;\n}\n          .black50,\n.doc-description {\n            color: rgba(0,0,0,.5);\n}\n        "
            }),
            React.createElement(_style2.default, {
                styleId: 1907883218,
                css: ".bgBlack02,\n.doc-header[data-jsx=\"168896698\"] {background-color: rgba(0,0,0,.02)\n}.pb10,\n.doc-header[data-jsx=\"168896698\"] {padding-bottom: 10px\n}.pt20,\n.doc-header[data-jsx=\"168896698\"] {padding-top: 20px\n}.pb16,\n.doc-type-description[data-jsx=\"168896698\"] {padding-bottom: 16px\n}.ph16,\n.doc-deprecation[data-jsx=\"168896698\"] {padding-left: 16px;padding-right: 16px\n}.black50,\n.doc-deprecation[data-jsx=\"168896698\"] {color: rgba(0,0,0,.5)\n}.pb20,\n.markdown-content[data-jsx=\"168896698\"] {padding-bottom: 20px\n}"
            }),
            React.createElement(
                "div",
                { className: "doc-header", "data-jsx": 168896698
                },
                React.createElement(TypeLink_1.default, { type: field, x: level, y: -1, clickable: false, sessionId: this.props.sessionId })
            ),
            React.createElement(MarkdownContent_1.default, { className: "doc-type-description", markdown: field.description || '' }),
            React.createElement(
                "div",
                { className: "doc-category-title", "data-jsx": 168896698
                },
                'type details'
            ),
            type.description && type.description.length > 0 && React.createElement(
                "div",
                { className: "markdown-content", "data-jsx": 168896698
                },
                React.createElement(MarkdownContent_1.default, { className: "doc-description", markdown: type.description || '' })
            ),
            type instanceof graphql_1.GraphQLScalarType && React.createElement(ScalarType_1.default, { type: type }),
            type instanceof graphql_1.GraphQLEnumType && React.createElement(EnumTypeSchema_1.default, { type: type }),
            type instanceof graphql_1.GraphQLUnionType && React.createElement(UnionTypeSchema_1.default, { type: type, schema: schema }),
            obj.fields.length > 0 && React.createElement(DocTypeSchema_1.default, { type: type, fields: obj.fields, interfaces: obj.interfaces, level: level, sessionId: this.props.sessionId }),
            obj.args.length > 0 && React.createElement(
                "div",
                {
                    "data-jsx": 168896698
                },
                React.createElement(
                    "div",
                    { className: "doc-category-title", "data-jsx": 168896698
                    },
                    "arguments"
                ),
                obj.args.map(function (arg, index) {
                    return React.createElement(
                        "div",
                        { key: arg.name, "data-jsx": 168896698
                        },
                        React.createElement(
                            "div",
                            {
                                "data-jsx": 168896698
                            },
                            React.createElement(Argument_1.default, { arg: arg, x: level, y: index + argsOffset, sessionId: _this.props.sessionId })
                        )
                    );
                })
            ),
            obj.implementations.length > 0 && React.createElement(
                "div",
                {
                    "data-jsx": 168896698
                },
                React.createElement(
                    "div",
                    { className: "doc-category-title", "data-jsx": 168896698
                    },
                    "implementations"
                ),
                obj.implementations.map(function (data, index) {
                    return React.createElement(TypeLink_1.default, { key: data.name, type: data, x: level, y: index + implementationsOffset, collapsable: true, sessionId: _this.props.sessionId });
                })
            )
        );
    };
    return FieldDoc;
}(React.Component);
exports.default = FieldDoc;
var scrollToRight = function scrollToRight(element, to, duration) {
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