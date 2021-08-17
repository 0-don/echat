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
var GraphDocs = /** @class */function (_super) {
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
            if (e.target instanceof HTMLInputElement || e.metaKey || e.shiftKey || e.altKey || e.ctrlKey) {
                return;
            }
            e.preventDefault();
            _this.props.changeKeyMove(_this.props.sessionId, true);
            var lastNavStack = _this.props.navStack.length > 0 && _this.props.navStack[_this.props.navStack.length - 1];
            var beforeLastNavStack = _this.props.navStack.length > 0 && _this.props.navStack[_this.props.navStack.length - 2];
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
                    } else {
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
                    } else {
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
            var onMouseMove = function onMouseMove(moveEvent) {
                if (moveEvent.buttons === 0) {
                    return _onMouseUp();
                }
                var app = ReactDOM.findDOMNode(_this);
                var cursorPos = moveEvent.clientX - elementPosition_1.getLeft(app) - offset;
                var newSize = app.clientWidth - cursorPos;
                var maxSize = window.innerWidth - 50;
                var docsSize = maxSize < newSize ? maxSize : newSize;
                if (docsSize < 100) {
                    _this.props.toggleDocs(_this.props.sessionId, false);
                } else {
                    _this.props.toggleDocs(_this.props.sessionId, true);
                    _this.props.changeWidthDocs(_this.props.sessionId, docsSize);
                }
            };
            var _onMouseUp = function onMouseUp() {
                if (!_this.props.docsOpen) {
                    _this.props.changeWidthDocs(_this.props.sessionId, hadWidth);
                }
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', _onMouseUp);
                onMouseMove = null;
                _onMouseUp = null;
            };
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', _onMouseUp);
        };
        _this.handleMouseMove = function (e) {
            _this.clientX = e.clientX;
            _this.clientY = e.clientY;
            if (_this.props.keyMove && _this.clientX !== e.clientX && _this.clientY !== e.clientY) {
                _this.props.changeKeyMove(_this.props.sessionId, false);
            }
        };
        _this.state = {
            searchValue: '',
            widthMap: {}
        };
        window.d = _this;
        return _this;
    }
    GraphDocs.prototype.componentWillReceiveProps = function (nextProps) {
        // If user use default column size % columnWidth
        // Make the column follow the clicks
        if (this.props.navStack.length !== nextProps.navStack.length || this.props.navStack.slice(-1)[0] !== nextProps.navStack.slice(-1)[0] || !this.props.schema && nextProps.schema) {
            this.setWidth(nextProps);
        }
    };
    GraphDocs.prototype.setWidth = function (props) {
        var _this = this;
        if (props === void 0) {
            props = this.props;
        }
        requestAnimationFrame(function () {
            var width = _this.getWidth(props);
            _this.props.changeWidthDocs(props.sessionId, Math.min(width, window.innerWidth - 86));
        });
    };
    GraphDocs.prototype.getWidth = function (props) {
        var _this = this;
        if (props === void 0) {
            props = this.props;
        }
        var rootWidth = this.state.widthMap.root || constants_1.columnWidth;
        var stackWidths = props.navStack.map(function (stack) {
            return _this.state.widthMap[stack.field.path] || constants_1.columnWidth;
        });
        return [rootWidth].concat(stackWidths).reduce(function (acc, curr) {
            return acc + curr;
        }, 0);
    };
    GraphDocs.prototype.componentDidMount = function () {
        this.setWidth();
    };
    GraphDocs.prototype.render = function () {
        var _this = this;
        var _a = this.props,
            docsOpen = _a.docsOpen,
            docsWidth = _a.docsWidth,
            schema = _a.schema,
            navStack = _a.navStack;
        var docsStyle = { width: docsOpen ? docsWidth : 0 };
        var emptySchema;
        if (schema === undefined) {
            // Schema is undefined when it is being loaded via introspection.
            emptySchema = React.createElement(Spinner_1.default, null);
        } else if (schema === null) {
            // Schema is null when it explicitly does not exist, typically due to
            // an error during introspection.
            emptySchema = React.createElement(
                "div",
                { className: "error-container" },
                'No Schema Available'
            );
        }
        return React.createElement(
            "div",
            { className: cn('graph-docs docExplorerWrap docs', { open: docsOpen }), style: docsStyle, "data-jsx": 4290959930
            },
            React.createElement(_style2.default, {
                styleId: 4029163273,
                css: "\n          .graphiql-container .doc-category-title {\n            border: none;\n          }\n          .doc-header .doc-category-item {\n            word-wrap: break-word;\n          }\n          .mh0,\n.graphiql-container .doc-category-title,\n.graphiql-container .doc-type-description {\n            margin-left: 0;\n            margin-right: 0;\n}\n          .ph16,\n.graphiql-container .doc-category-title,\n.graphiql-container .doc-type-description {\n            padding-left: 16px;\n            padding-right: 16px;\n}\n          .pa16,\n.doc-type-description p {\n            padding: 16px;\n}\n          .f14,\n.doc-type-description p,\n.graphiql-container .doc-type-description,\n.doc-description p {\n            font-size: 14px;\n}\n          .mh0,\n.graphiql-container .doc-category-title,\n.graphiql-container .doc-type-description {\n            margin-left: 0;\n            margin-right: 0;\n}\n          .ph16,\n.graphiql-container .doc-category-title,\n.graphiql-container .doc-type-description {\n            padding-left: 16px;\n            padding-right: 16px;\n}\n          .f14,\n.doc-type-description p,\n.graphiql-container .doc-type-description,\n.doc-description p {\n            font-size: 14px;\n}\n          .f16,\n.doc-header .doc-category-item {\n            font-size: 16px;\n}\n          .f14,\n.doc-type-description p,\n.graphiql-container .doc-type-description,\n.doc-description p {\n            font-size: 14px;\n}\n        "
            }),
            React.createElement(_style2.default, {
                styleId: 1909046742,
                css: ".graph-docs[data-jsx=\"4290959930\"] code {padding: 1px 2px;background: rgba(0, 0, 0, .06);}.graph-docs[data-jsx=\"4290959930\"] {right: -2px;}.graph-docs.open[data-jsx=\"4290959930\"] {z-index: 2000;}.docs-button[data-jsx=\"4290959930\"] {box-shadow: -1px 1px 6px 0 rgba(0, 0, 0, .3);line-height: 17px;letter-spacing: 0.45px;padding-bottom: 8px;-webkit-transform: rotate(-90deg);transform: rotate(-90deg);left: -50px;top: 129px;border-top-left-radius: 2px;border-top-right-radius: 2px;}.doc-explorer[data-jsx=\"4290959930\"] {letter-spacing: 0.3px;outline: none;box-shadow: -1px 1px 6px 0 rgba(0, 0, 0, .3);}.doc-explorer-container[data-jsx=\"4290959930\"] {overflow-x: auto;overflow-y: hidden;}.doc-explorer[data-jsx=\"4290959930\"]:before {left: 0px;content: '';width: 6px;}.doc-explorer-gradient[data-jsx=\"4290959930\"] {pointer-events: none;content: '';width: 20px;left: 0px;background: linear-gradient(              to right,              rgba(255, 255, 255, 1) 30%,              rgba(255, 255, 255, 0)            );}.docExplorerResizer[data-jsx=\"4290959930\"] {cursor: col-resize;left: -7px;content: '';width: 20px;}.pa16,\n.docs[data-jsx=\"4290959930\"] .doc-category-title {padding: 16px;}.f14,\n.docs[data-jsx=\"4290959930\"] .doc-category-title {font-size: 14px;}.mono,\n.graph-docs[data-jsx=\"4290959930\"] code {font-family: Source Code Pro,monospace;}.br2,\n.graph-docs[data-jsx=\"4290959930\"] code {border-radius: 2px;}.absolute,\n.graph-docs[data-jsx=\"4290959930\"],\n.docs-button[data-jsx=\"4290959930\"],\n.doc-explorer[data-jsx=\"4290959930\"]:before,\n.doc-explorer-gradient[data-jsx=\"4290959930\"],\n.docExplorerResizer[data-jsx=\"4290959930\"] {position: absolute;}.h100,\n.graph-docs[data-jsx=\"4290959930\"],\n.doc-explorer[data-jsx=\"4290959930\"],\n.doc-explorer-container[data-jsx=\"4290959930\"] {height: 100%;}.absolute,\n.graph-docs[data-jsx=\"4290959930\"],\n.docs-button[data-jsx=\"4290959930\"],\n.doc-explorer[data-jsx=\"4290959930\"]:before,\n.doc-explorer-gradient[data-jsx=\"4290959930\"],\n.docExplorerResizer[data-jsx=\"4290959930\"] {position: absolute;}.white,\n.docs-button[data-jsx=\"4290959930\"] {color: #fff;}.bgGreen,\n.docs-button[data-jsx=\"4290959930\"],\n.doc-explorer[data-jsx=\"4290959930\"]:before {background-color: #27ae60;}.pv6,\n.docs-button[data-jsx=\"4290959930\"] {padding-top: 6px;padding-bottom: 6px;}.z2,\n.docs-button[data-jsx=\"4290959930\"] {z-index: 2;}.ttu,\n.docs-button[data-jsx=\"4290959930\"] {text-transform: uppercase;}.fw6,\n.docs-button[data-jsx=\"4290959930\"] {font-weight: 600;}.f12,\n.docs-button[data-jsx=\"4290959930\"] {font-size: 12px;}.ph10,\n.docs-button[data-jsx=\"4290959930\"] {padding-left: 10px;padding-right: 10px;}.pointer:hover,\n.docs-button[data-jsx=\"4290959930\"]:hover {cursor: pointer;}.flex,\n.doc-explorer[data-jsx=\"4290959930\"],\n.doc-explorer-container[data-jsx=\"4290959930\"] {display: -ms-flexbox;display: flex;}.relative,\n.doc-explorer[data-jsx=\"4290959930\"],\n.doc-explorer-container[data-jsx=\"4290959930\"] {position: relative;}.h100,\n.graph-docs[data-jsx=\"4290959930\"],\n.doc-explorer[data-jsx=\"4290959930\"],\n.doc-explorer-container[data-jsx=\"4290959930\"] {height: 100%;}.flex,\n.doc-explorer[data-jsx=\"4290959930\"],\n.doc-explorer-container[data-jsx=\"4290959930\"] {display: -ms-flexbox;display: flex;}.relative,\n.doc-explorer[data-jsx=\"4290959930\"],\n.doc-explorer-container[data-jsx=\"4290959930\"] {position: relative;}.h100,\n.graph-docs[data-jsx=\"4290959930\"],\n.doc-explorer[data-jsx=\"4290959930\"],\n.doc-explorer-container[data-jsx=\"4290959930\"] {height: 100%;}.w100,\n.doc-explorer-container[data-jsx=\"4290959930\"] {width: 100%;}.top0,\n.doc-explorer[data-jsx=\"4290959930\"]:before,\n.doc-explorer-gradient[data-jsx=\"4290959930\"],\n.docExplorerResizer[data-jsx=\"4290959930\"] {top: 0;}.bottom0,\n.doc-explorer[data-jsx=\"4290959930\"]:before,\n.doc-explorer-gradient[data-jsx=\"4290959930\"],\n.docExplorerResizer[data-jsx=\"4290959930\"] {bottom: 0;}.bgGreen,\n.docs-button[data-jsx=\"4290959930\"],\n.doc-explorer[data-jsx=\"4290959930\"]:before {background-color: #27ae60;}.absolute,\n.graph-docs[data-jsx=\"4290959930\"],\n.docs-button[data-jsx=\"4290959930\"],\n.doc-explorer[data-jsx=\"4290959930\"]:before,\n.doc-explorer-gradient[data-jsx=\"4290959930\"],\n.docExplorerResizer[data-jsx=\"4290959930\"] {position: absolute;}.z3,\n.doc-explorer[data-jsx=\"4290959930\"]:before {z-index: 3;}.z1,\n.doc-explorer-gradient[data-jsx=\"4290959930\"] {z-index: 1;}.absolute,\n.graph-docs[data-jsx=\"4290959930\"],\n.docs-button[data-jsx=\"4290959930\"],\n.doc-explorer[data-jsx=\"4290959930\"]:before,\n.doc-explorer-gradient[data-jsx=\"4290959930\"],\n.docExplorerResizer[data-jsx=\"4290959930\"] {position: absolute;}.top0,\n.doc-explorer[data-jsx=\"4290959930\"]:before,\n.doc-explorer-gradient[data-jsx=\"4290959930\"],\n.docExplorerResizer[data-jsx=\"4290959930\"] {top: 0;}.bottom0,\n.doc-explorer[data-jsx=\"4290959930\"]:before,\n.doc-explorer-gradient[data-jsx=\"4290959930\"],\n.docExplorerResizer[data-jsx=\"4290959930\"] {bottom: 0;}.top0,\n.doc-explorer[data-jsx=\"4290959930\"]:before,\n.doc-explorer-gradient[data-jsx=\"4290959930\"],\n.docExplorerResizer[data-jsx=\"4290959930\"] {top: 0;}.bottom0,\n.doc-explorer[data-jsx=\"4290959930\"]:before,\n.doc-explorer-gradient[data-jsx=\"4290959930\"],\n.docExplorerResizer[data-jsx=\"4290959930\"] {bottom: 0;}.absolute,\n.graph-docs[data-jsx=\"4290959930\"],\n.docs-button[data-jsx=\"4290959930\"],\n.doc-explorer[data-jsx=\"4290959930\"]:before,\n.doc-explorer-gradient[data-jsx=\"4290959930\"],\n.docExplorerResizer[data-jsx=\"4290959930\"] {position: absolute;}.z5,\n.docExplorerResizer[data-jsx=\"4290959930\"] {z-index: 5;}"
            }),
            React.createElement(
                "div",
                { className: "docs-button", onClick: this.handleToggleDocs, "data-jsx": 4290959930
                },
                "Schema"
            ),
            React.createElement("div", { className: "docExplorerResizer", onMouseDown: this.handleDocsResizeStart, "data-jsx": 4290959930
            }),
            React.createElement("div", { className: "doc-explorer-gradient", "data-jsx": 4290959930
            }),
            React.createElement(
                "div",
                { className: "doc-explorer", onKeyDown: this.handleKeyDown, onMouseMove: this.handleMouseMove, tabIndex: 0, ref: this.setDocExplorerRef, "data-jsx": 4290959930
                },
                React.createElement(
                    "div",
                    { className: "doc-explorer-container", "data-jsx": 4290959930
                    },
                    emptySchema && React.createElement(
                        ColumnDoc_1.default,
                        null,
                        emptySchema
                    ),
                    schema && React.createElement(RootColumn_1.default, { schema: schema, width: this.state.widthMap.root || constants_1.columnWidth - 1, searchValue: this.state.searchValue, handleSearch: this.handleSearch, sessionId: this.props.sessionId }),
                    navStack.map(function (stack, index) {
                        return React.createElement(
                            ColumnDoc_1.default,
                            { key: index, width: _this.state.widthMap[stack.field.path] || constants_1.columnWidth },
                            React.createElement(FieldDoc_1.default, { schema: schema, field: stack.field, level: index + 1, sessionId: _this.props.sessionId })
                        );
                    })
                )
            )
        );
    };
    return GraphDocs;
}(React.Component);
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return redux_1.bindActionCreators({
        addStack: graphiql_docs_1.addStack,
        toggleDocs: graphiql_docs_1.toggleDocs,
        changeWidthDocs: graphiql_docs_1.changeWidthDocs,
        changeKeyMove: graphiql_docs_1.changeKeyMove
    }, dispatch);
};
exports.default = react_redux_1.connect(sessionDocs_1.getSessionDocs, mapDispatchToProps)(GraphDocs);
//# sourceMappingURL=GraphDocs.jsx.map