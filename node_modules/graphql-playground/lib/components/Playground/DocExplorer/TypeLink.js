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
var cx = require("classnames");
var redux_1 = require("redux");
var react_redux_1 = require("react-redux");
var graphql_1 = require("graphql");
var graphcool_styles_1 = require("graphcool-styles");
var ArgumentInline_1 = require("./ArgumentInline");
var graphiql_docs_1 = require("../../../actions/graphiql-docs");
var TypeLink = /** @class */function (_super) {
    __extends(TypeLink, _super);
    function TypeLink(props) {
        var _this = _super.call(this, props) || this;
        _this.onClick = function () {
            if (_this.props.clickable) {
                _this.props.addStack(_this.props.sessionId, _this.props.type, _this.props.x, _this.props.y);
            }
        };
        _this.setRef = function (ref) {
            _this.ref = ref;
        };
        _this.state = {
            collapsed: false
        };
        return _this;
    }
    TypeLink.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        return this.props.type !== nextProps.type || this.props.keyMove !== nextProps.keyMove || this.props.isActive !== nextProps.isActive || this.state.collapsed !== nextState.collapsed;
    };
    TypeLink.prototype.componentDidMount = function () {
        this.updateSize();
    };
    TypeLink.prototype.componentDidUpdate = function () {
        this.updateSize();
    };
    TypeLink.prototype.updateSize = function () {
        if (this.ref) {
            if (typeof this.props.onSetWidth === 'function') {
                this.props.onSetWidth(this.ref.scrollWidth);
            }
            var LINE_HEIGHT = 31;
            if (this.ref.scrollHeight > LINE_HEIGHT && !this.state.collapsed && this.props.collapsable) {
                this.setState({ collapsed: true });
            }
        }
    };
    TypeLink.prototype.render = function () {
        var _a = this.props,
            type = _a.type,
            clickable = _a.clickable,
            className = _a.className,
            beforeNode = _a.beforeNode,
            afterNode = _a.afterNode,
            keyMove = _a.keyMove,
            showParentName = _a.showParentName,
            isActive = _a.isActive,
            lastActive = _a.lastActive;
        var isGraphqlType = graphql_1.isType(type);
        var fieldName = showParentName && type.parent ? React.createElement(
            "span",
            null,
            type.parent.name,
            ".",
            React.createElement(
                "b",
                null,
                type.name
            )
        ) : type.name;
        return React.createElement(
            "div",
            { className: cx('doc-category-item', className, {
                    clickable: clickable,
                    active: isActive,
                    'last-active': lastActive,
                    'no-hover': keyMove
                }), onClick: this.onClick, ref: this.setRef, "data-jsx": 3473453369
            },
            React.createElement(_style2.default, {
                styleId: 3060413189,
                css: ".doc-category-item[data-jsx=\"3473453369\"] {transition: .1s background-color;}.doc-category-icon[data-jsx=\"3473453369\"] {right: 10px;top: calc(50% - 4px);}.mv0,\n.doc-category-item[data-jsx=\"3473453369\"] {margin-top: 0;margin-bottom: 0;}.ph16,\n.doc-category-item[data-jsx=\"3473453369\"] {padding-left: 16px;padding-right: 16px;}.pv6,\n.doc-category-item[data-jsx=\"3473453369\"] {padding-top: 6px;padding-bottom: 6px;}.relative,\n.doc-category-item[data-jsx=\"3473453369\"] {position: relative;}.overflowAuto,\n.doc-category-item[data-jsx=\"3473453369\"] {overflow: auto;}.f14,\n.doc-category-item[data-jsx=\"3473453369\"] {font-size: 14px;}.pointer:hover,\n.doc-category-item.clickable[data-jsx=\"3473453369\"]:hover:hover {cursor: pointer;}.white,\n.doc-category-item.clickable[data-jsx=\"3473453369\"]:hover,\n.doc-category-item.clickable[data-jsx=\"3473453369\"]:hover .brace {color: #fff;}.bgBlue,\n.doc-category-item.clickable[data-jsx=\"3473453369\"]:hover {background-color: #2a7ed2;}.white,\n.doc-category-item.clickable[data-jsx=\"3473453369\"]:hover,\n.doc-category-item.clickable[data-jsx=\"3473453369\"]:hover .brace {color: #fff;}.bgBlack07,\n.doc-category-item.active[data-jsx=\"3473453369\"] {background-color: rgba(0,0,0,.07);}.absolute,\n.doc-category-icon[data-jsx=\"3473453369\"] {position: absolute;}"
            }),
            React.createElement(_style2.default, {
                styleId: 57997497,
                css: "\n          .doc-category-item.last-active,\n          .doc-category-item.clickable:hover:not(.no-hover) {\n            background-color: #2a7ed3 !important;\n            color: #fff !important;\n            z-index: 1\n          }\n.doc-category-item.last-active .field-name,\n            .doc-category-item.last-active .type-name,\n            .doc-category-item.last-active .arg-name,\n            .doc-category-item.clickable:hover:not(.no-hover) .field-name,\n            .doc-category-item.clickable:hover:not(.no-hover) .type-name,\n            .doc-category-item.clickable:hover:not(.no-hover) .arg-name {\n            color: #fff !important\n}\n          /*\n          .doc-category-item.active:not(.last-active) svg {\n            fill: #2a7ed3 !important;\n          }\n          */\n          .fw6,\n.doc-category-item b,\n.dots {\n            font-weight: 600\n}\n          .fw6,\n.doc-category-item b,\n.dots {\n            font-weight: 600\n}\n        "
            }),
            beforeNode,
            beforeNode && ' ',
            !isGraphqlType && React.createElement(
                "span",
                {
                    "data-jsx": 3473453369
                },
                React.createElement(
                    "span",
                    { className: "field-name", "data-jsx": 3473453369
                    },
                    fieldName
                ),
                type.args && type.args.length > 0 && ['(', React.createElement(
                    "span",
                    { key: "args", "data-jsx": 3473453369
                    },
                    this.state.collapsed ? React.createElement(
                        "span",
                        { className: "dots", "data-jsx": 3473453369
                        },
                        "..."
                    ) : type.args.map(function (arg) {
                        return React.createElement(ArgumentInline_1.default, { key: arg.name, arg: arg });
                    })
                ), ')'],
                ': '
            ),
            React.createElement(
                "span",
                { className: "type-name", "data-jsx": 3473453369
                },
                renderType(type.type || type)
            ),
            clickable && React.createElement(
                "span",
                { className: "doc-category-icon", "data-jsx": 3473453369
                },
                React.createElement(graphcool_styles_1.Icon, { src: require('graphcool-styles/icons/fill/triangle.svg'), color: "rgba(0, 0, 0, .2)", width: 6, height: 7 })
            ),
            afterNode && ' ',
            afterNode
        );
    };
    TypeLink.defaultProps = {
        clickable: true,
        collapsable: false
    };
    return TypeLink;
}(React.Component);
function renderType(type) {
    if (type instanceof graphql_1.GraphQLNonNull) {
        return React.createElement(
            "span",
            null,
            renderType(type.ofType),
            '!'
        );
    }
    if (type instanceof graphql_1.GraphQLList) {
        return React.createElement(
            "span",
            null,
            '[',
            renderType(type.ofType),
            ']'
        );
    }
    return React.createElement(
        "span",
        null,
        type.name
    );
}
var mapStateToProps = function mapStateToProps(state, _a) {
    var x = _a.x,
        y = _a.y,
        sessionId = _a.sessionId;
    var docs = state.graphiqlDocs[sessionId];
    if (docs) {
        var nav = docs.navStack[x];
        if (nav) {
            var isActive = nav.x === x && nav.y === y;
            return {
                isActive: isActive,
                keyMove: docs.keyMove,
                lastActive: isActive && x === docs.navStack.length - 1
            };
        }
    }
    return {
        isActive: false,
        keyMove: false,
        lastActive: false
    };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return redux_1.bindActionCreators({
        addStack: graphiql_docs_1.addStack
    }, dispatch);
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(TypeLink);
//# sourceMappingURL=TypeLink.jsx.map