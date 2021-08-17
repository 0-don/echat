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
var __assign = undefined && undefined.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var CodeGenerationPopupCode_1 = require("./CodeGenerationPopupCode");
var CodeGenerationPopupHeader_1 = require("./CodeGenerationPopupHeader");
var CodeGenerationPopupEnvironmentChooser_1 = require("./CodeGenerationPopupEnvironmentChooser");
var CodeGenerationPopupClientChooser_1 = require("./CodeGenerationPopupClientChooser");
var constants_1 = require("../../constants");
var Modal = require("react-modal");
var Theme_1 = require("../Theme");
var CodeGenerationPopup = /** @class */function (_super) {
    __extends(CodeGenerationPopup, _super);
    function CodeGenerationPopup(props) {
        var _this = _super.call(this, props) || this;
        _this.handleSetClient = function (client) {
            _this.setState({ selectedClient: client });
        };
        _this.handleSetEnvironment = function (env) {
            var selectedClient = _this.state.selectedClient;
            if (env === 'Cli') {
                _this.setState({ selectedEnv: env, selectedClient: 'curl' });
            } else {
                _this.setState({
                    selectedEnv: env,
                    selectedClient: selectedClient === 'curl' ? 'fetch' : selectedClient
                });
            }
        };
        _this.state = {
            selectedEnv: 'Browser',
            selectedClient: 'graphql-request'
        };
        return _this;
    }
    CodeGenerationPopup.prototype.componentWillMount = function () {
        Modal.setAppElement('body');
    };
    CodeGenerationPopup.prototype.render = function () {
        var _a = this.props,
            query = _a.query,
            endpointUrl = _a.endpointUrl,
            localTheme = _a.localTheme;
        var selectedEnv = this.state.selectedEnv;
        var queryActive = Boolean(query) && query.length > 0 && query.includes('query');
        var clients = selectedEnv === 'Cli' ? ['curl'] : ['graphql-request', 'fetch'];
        var customModalStyle = constants_1.modalStyle;
        if (localTheme === 'light') {
            customModalStyle = __assign({}, constants_1.modalStyle, { overlay: __assign({}, constants_1.modalStyle.overlay, { backgroundColor: 'rgba(255,255,255,0.9)' }) });
        }
        return React.createElement(
            Modal,
            { isOpen: this.props.isOpen, onRequestClose: this.props.onRequestClose, contentLabel: "Code Generation", style: customModalStyle },
            React.createElement(_style2.default, {
                styleId: 1170771062,
                css: ".code-generation-popup-wrapper[data-jsx=\"1170771062\"] {max-height: calc(100vh - 50px);}.overflowScroll,\n.code-generation-popup-wrapper[data-jsx=\"1170771062\"] {overflow: scroll;}.buttonShadow,\n.code-generation-popup-wrapper[data-jsx=\"1170771062\"] {box-shadow: 0 1px 3px 0 rgba(0,0,0,.2);}.bgWhite,\n.code-generation-popup[data-jsx=\"1170771062\"] {background-color: #fff;}.br2,\n.code-generation-popup[data-jsx=\"1170771062\"] {border-radius: 2px;}.flex,\n.code-generation-popup[data-jsx=\"1170771062\"],\n.choosers[data-jsx=\"1170771062\"] {display: -ms-flexbox;display: flex;}.flexColumn,\n.code-generation-popup[data-jsx=\"1170771062\"] {-ms-flex-direction: column;flex-direction: column;}.overflowXHidden,\n.code-generation-popup[data-jsx=\"1170771062\"] {overflow-x: hidden;}.flex,\n.code-generation-popup[data-jsx=\"1170771062\"],\n.choosers[data-jsx=\"1170771062\"] {display: -ms-flexbox;display: flex;}.w100,\n.choosers[data-jsx=\"1170771062\"] {width: 100%;}"
            }),
            React.createElement(
                "div",
                { className: "code-generation-popup-wrapper", "data-jsx": 1170771062
                },
                React.createElement(
                    "div",
                    { className: "code-generation-popup", "data-jsx": 1170771062
                    },
                    React.createElement(CodeGenerationPopupHeader_1.default, { queryActive: queryActive }),
                    React.createElement(
                        "div",
                        { className: "choosers", "data-jsx": 1170771062
                        },
                        React.createElement(CodeGenerationPopupEnvironmentChooser_1.default, { environment: this.state.selectedEnv, setEnvironment: this.handleSetEnvironment }),
                        React.createElement(CodeGenerationPopupClientChooser_1.default, { environment: this.state.selectedEnv, client: this.state.selectedClient, setClient: this.handleSetClient, clients: clients })
                    ),
                    React.createElement(CodeGenerationPopupCode_1.default, { endpointUrl: endpointUrl, query: query, client: this.state.selectedClient, environment: this.state.selectedEnv })
                )
            )
        );
    };
    return CodeGenerationPopup;
}(React.Component);
exports.default = Theme_1.withTheme(CodeGenerationPopup);
//# sourceMappingURL=CodeGenerationPopup.jsx.map