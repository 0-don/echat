"use strict";
/**
 *  Copyright (c) Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the license found in the
 *  LICENSE file in the root directory of this source tree.
 */
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
/**
 * ResultViewer
 *
 * Maintains an instance of CodeMirror for viewing a GraphQL response.
 *
 * Props:
 *
 *   - value: The text of the editor.
 *
 */
var ResultViewer = /** @class */ (function (_super) {
    __extends(ResultViewer, _super);
    function ResultViewer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.setRef = function (ref) {
            _this.node = ref;
        };
        return _this;
    }
    ResultViewer.prototype.componentDidMount = function () {
        // Lazily require to ensure requiring GraphiQL outside of a Browser context
        // does not produce an error.
        var CodeMirror = require('codemirror');
        require('codemirror/addon/fold/foldgutter');
        require('codemirror/addon/fold/brace-fold');
        require('codemirror/addon/dialog/dialog');
        require('codemirror/addon/search/search');
        require('codemirror/keymap/sublime');
        require('codemirror-graphql/results/mode');
        var gutters = [];
        if (!this.props.hideGutters) {
            gutters.push('CodeMirror-foldgutter');
        }
        var foldGutter = {};
        if (!this.props.hideGutters) {
            foldGutter = {
                minFoldSize: 4,
            };
        }
        var value = this.props.value || '';
        this.viewer = CodeMirror(this.node, {
            lineWrapping: true,
            value: value,
            readOnly: true,
            theme: 'graphiql',
            mode: 'graphql-results',
            keyMap: 'sublime',
            foldGutter: foldGutter,
            gutters: gutters,
            extraKeys: {
                // Editor improvements
                'Ctrl-Left': 'goSubwordLeft',
                'Ctrl-Right': 'goSubwordRight',
                'Alt-Left': 'goGroupLeft',
                'Alt-Right': 'goGroupRight',
            },
            viewportMargin: Infinity,
        });
    };
    ResultViewer.prototype.shouldComponentUpdate = function (nextProps) {
        return this.props.value !== nextProps.value;
    };
    ResultViewer.prototype.componentDidUpdate = function () {
        var value = this.props.value || '';
        this.viewer.setValue(value);
    };
    ResultViewer.prototype.componentWillUnmount = function () {
        this.viewer = null;
    };
    ResultViewer.prototype.render = function () {
        return (<div className="result-codemirror" ref={this.setRef}>
        <style jsx={true}>{"\n          .result-codemirror :global(.CodeMirror) {\n            @p: .bbox, .pl38;\n            background: none;\n            position: relative !important;\n          }\n          .result-codemirror :global(.CodeMirror-scroll) {\n            overflow: auto !important;\n          }\n        "}</style>
      </div>);
    };
    /**
     * Public API for retrieving the CodeMirror instance from this
     * React component.
     */
    ResultViewer.prototype.getCodeMirror = function () {
        return this.viewer;
    };
    /**
     * Public API for retrieving the DOM client height for this component.
     */
    ResultViewer.prototype.getClientHeight = function () {
        return this.node && this.node.clientHeight;
    };
    return ResultViewer;
}(React.Component));
exports.ResultViewer = ResultViewer;
//# sourceMappingURL=ResultViewer.jsx.map