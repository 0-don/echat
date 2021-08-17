"use strict";

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
var graphiql_docs_1 = require("../actions/graphiql-docs");
var constants_1 = require("../constants");
exports.defaultSessionState = {
    navStack: [],
    docsOpen: false,
    docsWidth: constants_1.columnWidth,
    keyMove: false
};
var defaultState = {};
function graphiqlDocsReducer(state, action) {
    if (state === void 0) {
        state = defaultState;
    }
    var oldSessionState = state[action.sessionId] || exports.defaultSessionState;
    switch (action.type) {
        case graphiql_docs_1.SET_STACKS:
            return __assign({}, state, (_a = {}, _a[action.sessionId] = __assign({}, oldSessionState, { navStack: action.stacks }), _a));
        case graphiql_docs_1.ADD_STACK:
            var field = action.field,
                x = action.x,
                y = action.y;
            var newNavStack = oldSessionState.navStack;
            if (!field.path) {
                field.path = field.name;
            }
            // Reset the list to the level clicked
            if (x < newNavStack.length) {
                newNavStack = newNavStack.slice(0, x);
            }
            return __assign({}, state, (_b = {}, _b[action.sessionId] = __assign({}, oldSessionState, { navStack: newNavStack.concat([{
                    x: x,
                    y: y,
                    field: field
                }]) }), _b));
        case graphiql_docs_1.TOOGLE_DOCS:
            var open_1 = action.open;
            if (open_1 !== undefined) {
                return __assign({}, state, (_c = {}, _c[action.sessionId] = __assign({}, oldSessionState, { docsOpen: open_1 }), _c));
            }
            var newState = __assign({}, state, (_d = {}, _d[action.sessionId] = __assign({}, oldSessionState, { docsOpen: !oldSessionState.docsOpen }), _d));
            return newState;
        case graphiql_docs_1.CHANGE_WIDTH_DOCS:
            var width = action.width;
            return __assign({}, state, (_e = {}, _e[action.sessionId] = __assign({}, oldSessionState, { docsWidth: width }), _e));
        case graphiql_docs_1.CHANGE_KEY_MOVE:
            var move = action.move;
            return __assign({}, state, (_f = {}, _f[action.sessionId] = __assign({}, oldSessionState, { keyMove: move }), _f));
    }
    return state;
    var _a, _b, _c, _d, _e, _f;
}
exports.default = graphiqlDocsReducer;
//# sourceMappingURL=graphiql-docs.js.map