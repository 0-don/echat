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
var cx = require("classnames");
var redux_1 = require("redux");
var react_redux_1 = require("react-redux");
var graphql_1 = require("graphql");
var graphcool_styles_1 = require("graphcool-styles");
var ArgumentInline_1 = require("./ArgumentInline");
var graphiql_docs_1 = require("../../../actions/graphiql-docs");
var TypeLink = /** @class */ (function (_super) {
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
            collapsed: false,
        };
        return _this;
    }
    TypeLink.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        return (this.props.type !== nextProps.type ||
            this.props.keyMove !== nextProps.keyMove ||
            this.props.isActive !== nextProps.isActive ||
            this.state.collapsed !== nextState.collapsed);
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
            if (this.ref.scrollHeight > LINE_HEIGHT &&
                !this.state.collapsed &&
                this.props.collapsable) {
                this.setState({ collapsed: true });
            }
        }
    };
    TypeLink.prototype.render = function () {
        var _a = this.props, type = _a.type, clickable = _a.clickable, className = _a.className, beforeNode = _a.beforeNode, afterNode = _a.afterNode, keyMove = _a.keyMove, showParentName = _a.showParentName, isActive = _a.isActive, lastActive = _a.lastActive;
        var isGraphqlType = graphql_1.isType(type);
        var fieldName = showParentName && type.parent ? (<span>
          {type.parent.name}.<b>{type.name}</b>
        </span>) : (type.name);
        return (<div className={cx('doc-category-item', className, {
            clickable: clickable,
            active: isActive,
            'last-active': lastActive,
            'no-hover': keyMove,
        })} onClick={this.onClick} ref={this.setRef}>
        <style jsx={true}>{"\n          .doc-category-item {\n            @p: .mv0, .ph16, .pv6, .relative, .overflowAuto, .f14;\n            transition: $duration background-color;\n          }\n          .doc-category-item.clickable:hover {\n            @p: .pointer, .white, .bgBlue;\n          }\n          .doc-category-item.clickable:hover :global(.brace) {\n            @p: .white;\n          }\n          .doc-category-item.active {\n            @p: .bgBlack07;\n          }\n          .doc-category-icon {\n            @p: .absolute;\n            right: 10px;\n            top: calc(50% - 4px);\n          }\n        "}</style>
        <style jsx={true} global={true}>{"\n          .doc-category-item.last-active,\n          .doc-category-item.clickable:hover:not(.no-hover) {\n            background-color: #2a7ed3 !important;\n            color: #fff !important;\n            z-index: 1;\n\n            & .field-name,\n            & .type-name,\n            & .arg-name {\n              color: #fff !important;\n            }\n          }\n          /*\n          .doc-category-item.active:not(.last-active) svg {\n            fill: #2a7ed3 !important;\n          }\n          */\n          .doc-category-item b {\n            @p: .fw6;\n          }\n          .dots {\n            @p: .fw6;\n          }\n        "}</style>
        {beforeNode}
        {beforeNode && ' '}
        {!isGraphqlType && (<span>
            <span className="field-name">{fieldName}</span>
            {type.args &&
            type.args.length > 0 && [
            '(',
            <span key="args">
                  {this.state.collapsed ? (<span className="dots">...</span>) : (type.args.map(function (arg) { return (<ArgumentInline_1.default key={arg.name} arg={arg}/>); }))}
                </span>,
            ')',
        ]}
            {': '}
          </span>)}
        <span className="type-name">{renderType(type.type || type)}</span>
        {clickable && (<span className="doc-category-icon">
            <graphcool_styles_1.Icon src={require('graphcool-styles/icons/fill/triangle.svg')} color="rgba(0, 0, 0, .2)" width={6} height={7}/>
          </span>)}
        {afterNode && ' '}
        {afterNode}
      </div>);
    };
    TypeLink.defaultProps = {
        clickable: true,
        collapsable: false,
    };
    return TypeLink;
}(React.Component));
function renderType(type) {
    if (type instanceof graphql_1.GraphQLNonNull) {
        return (<span>
        {renderType(type.ofType)}
        {'!'}
      </span>);
    }
    if (type instanceof graphql_1.GraphQLList) {
        return (<span>
        {'['}
        {renderType(type.ofType)}
        {']'}
      </span>);
    }
    return <span>{type.name}</span>;
}
var mapStateToProps = function (state, _a) {
    var x = _a.x, y = _a.y, sessionId = _a.sessionId;
    var docs = state.graphiqlDocs[sessionId];
    if (docs) {
        var nav = docs.navStack[x];
        if (nav) {
            var isActive = nav.x === x && nav.y === y;
            return {
                isActive: isActive,
                keyMove: docs.keyMove,
                lastActive: isActive && x === docs.navStack.length - 1,
            };
        }
    }
    return {
        isActive: false,
        keyMove: false,
        lastActive: false,
    };
};
var mapDispatchToProps = function (dispatch) {
    return redux_1.bindActionCreators({
        addStack: graphiql_docs_1.addStack,
    }, dispatch);
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(TypeLink);
//# sourceMappingURL=TypeLink.jsx.map