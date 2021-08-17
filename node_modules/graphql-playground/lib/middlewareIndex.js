"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var MiddlewareApp_1 = require("./components/MiddlewareApp");
require("./styles/graphiql_dark.css");
require("./styles/graphiql_light.css");
require("./index.css");
require("graphcool-styles/dist/styles.css");
if (process.env.NODE_ENV !== 'production') {}
/* tslint:disable-next-line */
// const { whyDidYouUpdate } = require('why-did-you-update')
// whyDidYouUpdate(React)

/* tslint:disable-next-line */
;
window['GraphQLPlayground'] = {
    init: function init(element, options) {
        ReactDOM.render(React.createElement(MiddlewareApp_1.default, _extends({ setTitle: true, showNewWorkspace: false }, options)), element);
    }
};
//# sourceMappingURL=middlewareIndex.jsx.map