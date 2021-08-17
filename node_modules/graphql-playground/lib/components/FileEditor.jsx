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
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styled_1 = require("../styled");
var theme = require("styled-theming");
var QueryEditor_1 = require("./Playground/QueryEditor");
var FileEditor = /** @class */ (function (_super) {
    __extends(FileEditor, _super);
    function FileEditor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FileEditor.prototype.render = function () {
        return (<Wrapper className="graphiql-container">
        <div className="editorWrap">
          <div className="queryWrap">
            <QueryEditor_1.QueryEditor value={this.props.value} onEdit={this.props.onChange}/>
          </div>
        </div>
      </Wrapper>);
    };
    return FileEditor;
}(React.Component));
exports.default = FileEditor;
var backgroundColor = theme('mode', {
    light: function (p) { return p.theme.colours.darkBlue10; },
    dark: function (p) { return p.theme.colours.darkBlue; },
});
var Wrapper = styled_1.styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background: ", ";\n  position: relative;\n  .variable-editor {\n    height: 100% !important;\n  }\n  .CodeMirror {\n    background: none !important;\n    .CodeMirror-code {\n      color: rgba(255, 255, 255, 0.7);\n    }\n    .cm-atom {\n      color: rgba(42, 126, 210, 1);\n    }\n  }\n  .CodeMirror-gutters {\n    background: none !important;\n  }\n"], ["\n  background: ", ";\n  position: relative;\n  .variable-editor {\n    height: 100% !important;\n  }\n  .CodeMirror {\n    background: none !important;\n    .CodeMirror-code {\n      color: rgba(255, 255, 255, 0.7);\n    }\n    .cm-atom {\n      color: rgba(42, 126, 210, 1);\n    }\n  }\n  .CodeMirror-gutters {\n    background: none !important;\n  }\n"])), backgroundColor);
var templateObject_1;
//# sourceMappingURL=FileEditor.jsx.map