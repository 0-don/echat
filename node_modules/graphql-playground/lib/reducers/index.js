"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var graphiql_docs_1 = require("./graphiql-docs");
var combinedReducers = redux_1.combineReducers({
    graphiqlDocs: graphiql_docs_1.default
});
exports.default = combinedReducers;
//# sourceMappingURL=index.js.map