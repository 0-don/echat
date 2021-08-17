"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var graphiql_docs_1 = require("../reducers/graphiql-docs");
exports.getSessionDocs = function (_a, _b) {
    var graphiqlDocs = _a.graphiqlDocs;
    var sessionId = _b.sessionId;
    var docs = graphiqlDocs[sessionId];
    if (docs) {
        return {
            navStack: docs.navStack,
            docsOpen: docs.docsOpen,
            docsWidth: docs.docsWidth,
            keyMove: docs.keyMove
        };
    } else {
        return graphiql_docs_1.defaultSessionState;
    }
};
//# sourceMappingURL=sessionDocs.js.map