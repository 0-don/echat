"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var Root_1 = require("./components/Root");
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
        ReactDOM.render(React.createElement(Root_1.default, options), element);
    }
};
//# sourceMappingURL=index.jsx.map