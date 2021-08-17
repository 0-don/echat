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
var graphcool_styles_1 = require("graphcool-styles");
var codeGeneration_1 = require("./codeGeneration");
var Theme_1 = require("../Theme");
// tslint:disable-next-line
var Codemirror = require('react-codemirror');
var CodeGenerationPopupCode = /** @class */function (_super) {
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
        var _a = this.props,
            client = _a.client,
            environment = _a.environment,
            endpointUrl = _a.endpointUrl,
            query = _a.query,
            localTheme = _a.localTheme;
        var generator = new codeGeneration_1.CodeGenerator(client, environment, endpointUrl);
        var projectSetup = generator.getSetup();
        var code = generator.getCode(query);
        var title = environment !== 'Cli' ? 'Code' : 'Command';
        var mode = environment !== 'Cli' ? 'javascript' : 'shell';
        var codeTheme = localTheme === 'light' ? 'duotone-light' : 'dracula';
        return React.createElement(
            "div",
            { className: cx(graphcool_styles_1.$p.pa38, graphcool_styles_1.$p.pt16, 'code-generation-popup'), "data-jsx": 2875860968
            },
            React.createElement(_style2.default, {
                styleId: 1659661624,
                css: ".fw3,\nh3[data-jsx=\"2875860968\"] {\n    font-weight: 300\n}\n.f25,\nh3[data-jsx=\"2875860968\"] {\n    font-size: 25px\n}\n.mv16,\nh3[data-jsx=\"2875860968\"] {\n    margin-top: 16px;\n    margin-bottom: 16px\n}"
            }),
            React.createElement(_style2.default, {
                styleId: 2496476117,
                css: "\n          .code-generation-popup .CodeMirror {\n            height: auto;\n          }\n.pa6,\n.code-generation-popup .CodeMirror {\n            padding: 6px;\n}\n        "
            }),
            environment !== 'Cli' && React.createElement(
                "div",
                {
                    "data-jsx": 2875860968
                },
                React.createElement(
                    "h3",
                    {
                        "data-jsx": 2875860968
                    },
                    "Project Setup"
                ),
                React.createElement(Codemirror, { key: projectSetup, value: projectSetup, options: {
                        height: 'auto',
                        mode: 'shell',
                        viewportMargin: Infinity,
                        theme: codeTheme
                    } })
            ),
            React.createElement(
                "h3",
                {
                    "data-jsx": 2875860968
                },
                title
            ),
            React.createElement(Codemirror, { key: code, value: code, options: {
                    height: 'auto',
                    viewportMargin: Infinity,
                    mode: mode,
                    theme: codeTheme
                } })
        );
    };
    return CodeGenerationPopupCode;
}(React.Component);
exports.default = Theme_1.withTheme(CodeGenerationPopupCode);
//# sourceMappingURL=CodeGenerationPopupCode.jsx.map