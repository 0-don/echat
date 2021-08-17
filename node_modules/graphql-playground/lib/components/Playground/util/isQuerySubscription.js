"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var isQuerySubscription = function isQuerySubscription(query, operationName) {
    var ast = null;
    // takes around 0.02ms -  1ms
    try {
        ast = graphql_1.parse(query);
    } catch (e) {
        //
    }
    var isSubscription = false;
    if (ast) {
        ast.definitions.forEach(function (definition) {
            if (definition.operation === 'subscription') {
                // tslint:disable-next-line
                if (operationName && operationName.length > 0) {
                    isSubscription = definition.name.value === operationName;
                } else {
                    isSubscription = true;
                }
            }
        });
    }
    return isSubscription;
};
exports.default = isQuerySubscription;
//# sourceMappingURL=isQuerySubscription.js.map