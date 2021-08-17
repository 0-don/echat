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
var graphcool_styles_1 = require("graphcool-styles");
var codeGeneration_1 = require("./codeGeneration");
var Theme_1 = require("../Theme");
// tslint:disable-next-line
var Codemirror = require('react-codemirror');
var CodeGenerationPopupCode = /** @class */ (function (_super) {
    __extends(CodeGenerationPopupCode, _super);
    function CodeGenerationPopupCode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CodeGenerationPopupCode.prototype.componentWillMount = function () {
        require('codemirror/lib/codemirror.css');
        require('codemirror/theme/dracula.css');
        require('codemirror/theme/duotone-light.css');
        require('codemirror/mode/javascript/javascript');
        require('codemirror/mode/shell/shell');
    };
    CodeGenerationPopupCode.prototype.render = function () {
        var _a = this.props, client = _a.client, environment = _a.environment, endpointUrl = _a.endpointUrl, query = _a.query, localTheme = _a.localTheme;
        var generator = new codeGeneration_1.CodeGenerator(client, environment, endpointUrl);
        var projectSetup = generator.getSetup();
        var code = generator.getCode(query);
        var title = environment !== 'Cli' ? 'Code' : 'Command';
        var mode = environment !== 'Cli' ? 'javascript' : 'shell';
        var codeTheme = localTheme === 'light' ? 'duotone-light' : 'dracula';
        return (<div className={cx(graphcool_styles_1.$p.pa38, graphcool_styles_1.$p.pt16, 'code-generation-popup')}>
        <style jsx={true}>{"\n          h3 {\n            @p: .fw3, .f25, .mv16;\n          }\n        "}</style>
        <style jsx={true} global={true}>{"\n          .code-generation-popup .CodeMirror {\n            @p: .pa6;\n            height: auto;\n          }\n        "}</style>
        {environment !== 'Cli' && (<div>
            <h3>Project Setup</h3>
            <Codemirror key={projectSetup} value={projectSetup} options={{
            height: 'auto',
            mode: 'shell',
            viewportMargin: Infinity,
            theme: codeTheme,
        }}/>
          </div>)}
        <h3>{title}</h3>
        <Codemirror key={code} value={code} options={{
            height: 'auto',
            viewportMargin: Infinity,
            mode: mode,
            theme: codeTheme,
        }}/>
      </div>);
    };
    return CodeGenerationPopupCode;
}(React.Component));
exports.default = Theme_1.withTheme(CodeGenerationPopupCode);
//# sourceMappingURL=CodeGenerationPopupCode.jsx.map