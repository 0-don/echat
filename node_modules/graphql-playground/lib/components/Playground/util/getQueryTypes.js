"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
exports.getQueryTypes = function (query) {
    var ast = null;
    // takes around 0.02ms -  1ms
    try {
        ast = graphql_1.parse(query);
    } catch (e) {
        //
    }
    var hasSubscription = false;
    var hasQuery = false;
    var hasMutation = false;
    var firstOperationName = null;
    // let operations: OperationDefinition[] = []
    if (ast) {
        ast.definitions.forEach(function (definition) {
            if (!firstOperationName) {
                firstOperationName = definition.selectionSet && definition.selectionSet.selections && definition.selectionSet.selections.length > 0 && definition.selectionSet.selections[0].name.value;
            }
            if (definition.operation === 'subscription') {
                hasSubscription = true;
            }
            if (definition.operation === 'query') {
                hasQuery = true;
            }
            if (definition.operation === 'mutation') {
                hasMutation = true;
            }
            // if (definition.name) {
            //   operations.push({
            //     name: definition.name.value,
            //     startLine: definition.loc.startToken.line,
            //     endLine: definition.loc.endToken.line,
            //   })
            // }
        });
    }
    return {
        firstOperationName: firstOperationName,
        subscription: hasSubscription,
        query: hasQuery,
        mutation: hasMutation
    };
};
//# sourceMappingURL=getQueryTypes.js.map