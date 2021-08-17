"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cuid = require("cuid");
var getQueryTypes_1 = require("./components/Playground/util/getQueryTypes");
exports.columnWidth = 300;
exports.introspectionQuery = "\n  query IntrospectionQuery {\n    __schema {\n      queryType { name }\n      mutationType { name }\n      subscriptionType { name }\n      types {\n        ...FullType\n      }\n      directives {\n        name\n        description\n        locations\n        args {\n          ...InputValue\n        }\n      }\n    }\n  }\n\n  fragment FullType on __Type {\n    kind\n    name\n    description\n    fields(includeDeprecated: true) {\n      name\n      description\n      args {\n        ...InputValue\n      }\n      type {\n        ...TypeRef\n      }\n      isDeprecated\n      deprecationReason\n    }\n    inputFields {\n      ...InputValue\n    }\n    interfaces {\n      ...TypeRef\n    }\n    enumValues(includeDeprecated: true) {\n      name\n      description\n      isDeprecated\n      deprecationReason\n    }\n    possibleTypes {\n      ...TypeRef\n    }\n  }\n\n  fragment InputValue on __InputValue {\n    name\n    description\n    type { ...TypeRef }\n    defaultValue\n  }\n\n  fragment TypeRef on __Type {\n    kind\n    name\n    ofType {\n      kind\n      name\n      ofType {\n        kind\n        name\n        ofType {\n          kind\n          name\n          ofType {\n            kind\n            name\n            ofType {\n              kind\n              name\n              ofType {\n                kind\n                name\n                ofType {\n                  kind\n                  name\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n";
exports.defaultQuery = '# Try to write your query here\n';
exports.modalStyle = {
    overlay: {
        zIndex: 99999,
        backgroundColor: 'rgba(15,32,46,.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        position: 'relative',
        width: 976,
        height: 'auto',
        top: 'initial',
        left: 'initial',
        right: 'initial',
        bottom: 'initial',
        borderRadius: 2,
        padding: 0,
        border: 'none',
        background: 'none',
        boxShadow: '0 1px 7px rgba(0,0,0,.2)'
    }
};
function getDefaultSession(endpoint) {
    return {
        id: cuid(),
        query: exports.defaultQuery,
        variables: '',
        result: '',
        endpoint: endpoint,
        operationName: undefined,
        hasMutation: false,
        hasSubscription: false,
        hasQuery: false,
        queryTypes: getQueryTypes_1.getQueryTypes(exports.defaultQuery),
        subscriptionActive: false,
        date: new Date(),
        starred: false
    };
}
exports.getDefaultSession = getDefaultSession;
//# sourceMappingURL=constants.js.map