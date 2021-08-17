"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ADD_STACK = 'add stack';
exports.SET_STACKS = 'set stacks';
exports.TOOGLE_DOCS = 'toggle docs';
exports.CHANGE_KEY_MOVE = 'change key move';
exports.CHANGE_WIDTH_DOCS = 'change width docs';
exports.setStacks = function (sessionId, stacks) {
    return {
        type: exports.SET_STACKS,
        sessionId: sessionId,
        stacks: stacks
    };
};
exports.addStack = function (sessionId, field, x, y) {
    return {
        type: exports.ADD_STACK,
        sessionId: sessionId,
        field: field,
        x: x,
        y: y
    };
};
exports.toggleDocs = function (sessionId, open) {
    return {
        type: exports.TOOGLE_DOCS,
        sessionId: sessionId,
        open: open
    };
};
exports.changeWidthDocs = function (sessionId, width) {
    return {
        type: exports.CHANGE_WIDTH_DOCS,
        sessionId: sessionId,
        width: width
    };
};
exports.changeKeyMove = function (sessionId, move) {
    return {
        type: exports.CHANGE_KEY_MOVE,
        sessionId: sessionId,
        move: move
    };
};
//# sourceMappingURL=graphiql-docs.js.map