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
var redux_1 = require("redux");
var react_redux_1 = require("react-redux");
var keycode = require("keycode");
var elementPosition_1 = require("graphiql/dist/utility/elementPosition");
var FieldDoc_1 = require("./FieldDoc");
var ColumnDoc_1 = require("./ColumnDoc");
var graphiql_docs_1 = require("../../../actions/graphiql-docs");
var Spinner_1 = require("../../Spinner");
var constants_1 = require("../../../constants");
var RootColumn_1 = require("./RootColumn");
var cn = require("classnames");
var stack_1 = require("../util/stack");
var sessionDocs_1 = require("../../../selectors/sessionDocs");
var GraphDocs = /** @class */ (function (_super) {
    __extends(GraphDocs, _super);
    function GraphDocs(props) {
        var _this = _super.call(this, props) || this;
        _this.clientX = 0;
        _this.clientY = 0;
        _this.setDocExplorerRef = function (ref) {
            _this.refDocExplorer = ref;
        };
        _this.handleSearch = function (value) {
            _this.setState({ searchValue: value });
        };
        _this.handleToggleDocs = function () {
            if (!_this.props.docsOpen) {
                _this.refDocExplorer.focus();
            }
            _this.props.toggleDocs(_this.props.sessionId);
            _this.setWidth();
        };
        _this.handleKeyDown = function (e) {
            // we don't want to interfere with inputs
            if (e.target instanceof HTMLInputElement ||
                e.metaKey ||
                e.shiftKey ||
                e.altKey ||
                e.ctrlKey) {
                return;
            }
            e.preventDefault();
            _this.props.changeKeyMove(_this.props.sessionId, true);
            var lastNavStack = _this.props.navStack.length > 0 &&
                _this.props.navStack[_this.props.navStack.length - 1];
            var beforeLastNavStack = _this.props.navStack.length > 0 &&
                _this.props.navStack[_this.props.navStack.length - 2];
            var keyPressed = keycode(e);
            switch (keyPressed) {
                case 'esc':
                    _this.props.toggleDocs(_this.props.sessionId, false);
                    break;
                case 'left':
                    if (beforeLastNavStack) {
                        _this.props.addStack(_this.props.sessionId, beforeLastNavStack.field, beforeLastNavStack.x, beforeLastNavStack.y);
                    }
                    break;
                case 'right':
                    if (lastNavStack) {
                        var obj = stack_1.serialize(_this.props.schema, lastNavStack.field);
                        var firstElement = stack_1.getElement(obj, 0);
                        if (firstElement) {
                            _this.props.addStack(_this.props.sessionId, firstElement, lastNavStack.x + 1, 0);
                        }
                    }
                    else {
                        var obj = stack_1.serializeRoot(_this.props.schema);
                        var element = stack_1.getElementRoot(obj, 0);
                        if (element) {
                            _this.props.addStack(_this.props.sessionId, element, 0, 0);
                        }
                    }
                    break;
                case 'up':
                case 'down':
                    if (beforeLastNavStack) {
                        var obj = stack_1.serialize(_this.props.schema, beforeLastNavStack.field);
                        var element = stack_1.getElement(obj, keyPressed === 'up' ? lastNavStack.y - 1 : lastNavStack.y + 1);
                        if (element) {
                            _this.props.addStack(_this.props.sessionId, element, lastNavStack.x, keyPressed === 'up' ? lastNavStack.y - 1 : lastNavStack.y + 1);
                        }
                    }
                    else {
                        var obj = stack_1.serializeRoot(_this.props.schema);
                        var element = stack_1.getElementRoot(obj, keyPressed === 'up' ? lastNavStack.y - 1 : lastNavStack.y + 1);
                        if (element) {
                            _this.props.addStack(_this.props.sessionId, element, 0, keyPressed === 'up' ? lastNavStack.y - 1 : lastNavStack.y + 1);
                        }
                    }
                    break;
            }
        };
        _this.handleDocsResizeStart = function (downEvent) {
            downEvent.preventDefault();
            var hadWidth = _this.props.docsWidth;
            var offset = downEvent.clientX - elementPosition_1.getLeft(downEvent.target);
            var onMouseMove = function (moveEvent) {
                if (moveEvent.buttons === 0) {
                    return onMouseUp();
                }
                var app = ReactDOM.findDOMNode(_this);
                var cursorPos = moveEvent.clientX - elementPosition_1.getLeft(app) - offset;
                var newSize = app.clientWidth - cursorPos;
                var maxSize = window.innerWidth - 50;
                var docsSize = maxSize < newSize ? maxSize : newSize;
                if (docsSize < 100) {
                    _this.props.toggleDocs(_this.props.sessionId, false);
                }
                else {
                    _this.props.toggleDocs(_this.props.sessionId, true);
                    _this.props.changeWidthDocs(_this.props.sessionId, docsSize);
                }
            };
            var onMouseUp = function () {
                if (!_this.props.docsOpen) {
                    _this.props.changeWidthDocs(_this.props.sessionId, hadWidth);
                }
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
                onMouseMove = null;
                onMouseUp = null;
            };
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        };
        _this.handleMouseMove = function (e) {
            _this.clientX = e.clientX;
            _this.clientY = e.clientY;
            if (_this.props.keyMove &&
                _this.clientX !== e.clientX &&
                _this.clientY !== e.clientY) {
                _this.props.changeKeyMove(_this.props.sessionId, false);
            }
        };
        _this.state = {
            searchValue: '',
            widthMap: {},
        };
        window.d = _this;
        return _this;
    }
    GraphDocs.prototype.componentWillReceiveProps = function (nextProps) {
        // If user use default column size % columnWidth
        // Make the column follow the clicks
        if (this.props.navStack.length !== nextProps.navStack.length ||
            this.props.navStack.slice(-1)[0] !== nextProps.navStack.slice(-1)[0] ||
            (!this.props.schema && nextProps.schema)) {
            this.setWidth(nextProps);
        }
    };
    GraphDocs.prototype.setWidth = function (props) {
        var _this = this;
        if (props === void 0) { props = this.props; }
        requestAnimationFrame(function () {
            var width = _this.getWidth(props);
            _this.props.changeWidthDocs(props.sessionId, Math.min(width, window.innerWidth - 86));
        });
    };
    GraphDocs.prototype.getWidth = function (props) {
        var _this = this;
        if (props === void 0) { props = this.props; }
        var rootWidth = this.state.widthMap.root || constants_1.columnWidth;
        var stackWidths = props.navStack.map(function (stack) { return _this.state.widthMap[stack.field.path] || constants_1.columnWidth; });
        return [rootWidth].concat(stackWidths).reduce(function (acc, curr) { return acc + curr; }, 0);
    };
    GraphDocs.prototype.componentDidMount = function () {
        this.setWidth();
    };
    GraphDocs.prototype.render = function () {
        var _this = this;
        var _a = this.props, docsOpen = _a.docsOpen, docsWidth = _a.docsWidth, schema = _a.schema, navStack = _a.navStack;
        var docsStyle = { width: docsOpen ? docsWidth : 0 };
        var emptySchema;
        if (schema === undefined) {
            // Schema is undefined when it is being loaded via introspection.
            emptySchema = <Spinner_1.default />;
        }
        else if (schema === null) {
            // Schema is null when it explicitly does not exist, typically due to
            // an error during introspection.
            emptySchema = (<div className="error-container">{'No Schema Available'}</div>);
        }
        return (<div className={cn('graph-docs docExplorerWrap docs', { open: docsOpen })} style={docsStyle}>
        <style jsx={true} global={true}>{"\n          .graphiql-container .doc-category-title {\n            @p: .mh0, .ph16;\n            border: none;\n          }\n          .doc-type-description p {\n            @p: .pa16, .f14;\n          }\n          .graphiql-container .doc-type-description {\n            @p: .mh0, .ph16, .f14;\n          }\n          .doc-header .doc-category-item {\n            @p: .f16;\n            word-wrap: break-word;\n          }\n          .doc-description p {\n            @p: .f14;\n          }\n        "}</style>
        <style jsx={true}>{"\n          .docs :global(.doc-category-title) {\n            @p: .pa16, .f14;\n          }\n          .graph-docs :global(code) {\n            @p: .mono, .br2;\n            padding: 1px 2px;\n            background: rgba(0, 0, 0, 0.06);\n          }\n          .graph-docs {\n            @p: .absolute, .h100;\n            right: -2px;\n          }\n          .graph-docs.open {\n            z-index: 2000;\n          }\n          .docs-button {\n            @p: .absolute, .white, .bgGreen, .pv6, .z2, .ttu, .fw6, .f12, .ph10,\n              .pointer;\n            box-shadow: -1px 1px 6px 0 rgba(0, 0, 0, 0.3);\n            line-height: 17px;\n            letter-spacing: 0.45px;\n            padding-bottom: 8px;\n            transform: rotate(-90deg);\n            left: -50px;\n            top: 129px;\n            border-top-left-radius: 2px;\n            border-top-right-radius: 2px;\n          }\n          .doc-explorer {\n            @p: .flex, .relative, .h100;\n            letter-spacing: 0.3px;\n            outline: none;\n            box-shadow: -1px 1px 6px 0 rgba(0, 0, 0, 0.3);\n          }\n          .doc-explorer-container {\n            @p: .flex, .relative, .h100, .w100;\n            overflow-x: auto;\n            overflow-y: hidden;\n          }\n          .doc-explorer:before {\n            @p: .top0, .bottom0, .bgGreen, .absolute, .z3;\n            left: 0px;\n            content: '';\n            width: 6px;\n          }\n          .doc-explorer-gradient {\n            @p: .z1, .absolute, .top0, .bottom0;\n            pointer-events: none;\n            content: '';\n            width: 20px;\n            left: 0px;\n            background: linear-gradient(\n              to right,\n              rgba(255, 255, 255, 1) 30%,\n              rgba(255, 255, 255, 0)\n            );\n          }\n          .docExplorerResizer {\n            @p: .top0, .bottom0, .absolute, .z5;\n            cursor: col-resize;\n            left: -7px;\n            content: '';\n            width: 20px;\n          }\n        "}</style>
        <div className="docs-button" onClick={this.handleToggleDocs}>
          Schema
        </div>
        <div className="docExplorerResizer" onMouseDown={this.handleDocsResizeStart}/>
        <div className="doc-explorer-gradient"/>
        <div className="doc-explorer" onKeyDown={this.handleKeyDown} onMouseMove={this.handleMouseMove} tabIndex={0} ref={this.setDocExplorerRef}>
          <div className="doc-explorer-container">
            {emptySchema && <ColumnDoc_1.default>{emptySchema}</ColumnDoc_1.default>}
            {schema && (<RootColumn_1.default schema={schema} width={this.state.widthMap.root || constants_1.columnWidth - 1} searchValue={this.state.searchValue} handleSearch={this.handleSearch} sessionId={this.props.sessionId}/>)}
            {navStack.map(function (stack, index) { return (<ColumnDoc_1.default key={index} width={_this.state.widthMap[stack.field.path] || constants_1.columnWidth}>
                <FieldDoc_1.default schema={schema} field={stack.field} level={index + 1} sessionId={_this.props.sessionId}/>
              </ColumnDoc_1.default>); })}
          </div>
        </div>
      </div>);
    };
    return GraphDocs;
}(React.Component));
var mapDispatchToProps = function (dispatch) {
    return redux_1.bindActionCreators({
        addStack: graphiql_docs_1.addStack,
        toggleDocs: graphiql_docs_1.toggleDocs,
        changeWidthDocs: graphiql_docs_1.changeWidthDocs,
        changeKeyMove: graphiql_docs_1.changeKeyMove,
    }, dispatch);
};
exports.default = react_redux_1.connect(sessionDocs_1.getSessionDocs, mapDispatchToProps)(GraphDocs);
//# sourceMappingURL=GraphDocs.jsx.map