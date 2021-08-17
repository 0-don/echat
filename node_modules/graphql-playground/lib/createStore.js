"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var redux_localstorage_1 = require("redux-localstorage");
var redux_localstorage_filter_1 = require("redux-localstorage-filter");
var adapter = require("redux-localstorage/lib/adapters/localStorage");
var merge = require("lodash/merge");
var reducers_1 = require("./reducers");
var localStorage = null;
if (typeof window !== 'undefined') {
    localStorage = window.localStorage;
} else {
    localStorage = {
        clearItem: function clearItem() {
            return null;
        },
        getItem: function getItem() {
            return null;
        },
        setItem: function setItem() {
            return null;
        }
    };
}
var storage = redux_1.compose(redux_localstorage_filter_1.default(['graphiqlDocs.*.docsOpen', 'graphiqlDocs.*.docsWidth', 'history.history']))(adapter(localStorage));
var reducer = redux_1.compose(redux_localstorage_1.mergePersistedState(function (initialState, persistedState) {
    return merge({}, initialState, persistedState);
}))(reducers_1.default);
var enhancer = redux_1.compose(redux_localstorage_1.default(storage, 'graphiql'));
var functions = [enhancer];
var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux_1.compose;
exports.default = function () {
    return redux_1.createStore(reducer, composeEnhancers.apply(null, functions));
};
//# sourceMappingURL=createStore.js.map