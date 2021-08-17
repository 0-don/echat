"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
var lodash_1 = require("lodash");
var PlaygroundStorage = /** @class */function () {
    function PlaygroundStorage(endpoint) {
        this.storages = {};
        this.endpoint = endpoint;
        this.project = this.getProject();
        this.executedQueryCount = this.getExecutedQueryCount();
        if (!this.project) {
            this.project = {
                sessions: {},
                history: [],
                data: {}
            };
            this.saveProject();
        }
        PlaygroundStorage.countCache[endpoint] = Object.keys(this.project.sessions).length;
        global.s = this;
    }
    PlaygroundStorage.getSessionCount = function (endpoint) {
        var cachedCount = this.countCache[endpoint];
        if (cachedCount) {
            return cachedCount;
        }
        try {
            var projectString = localStorage.getItem(endpoint);
            if (projectString) {
                var project = JSON.parse(projectString);
                return Object.keys(project.sessions).length;
            }
        } catch (e) {
            //
        }
        return 1;
    };
    // migrate headers to new format
    PlaygroundStorage.runMigration = function (project, migrationEndpoint) {
        if (!project) {
            return project;
        }
        function mapHeaders(session) {
            var headers = session.headers;
            if (!headers) {
                headers = '';
            }
            if (Array.isArray(headers)) {
                headers = convertArray(headers);
            }
            if ((typeof headers === "undefined" ? "undefined" : _typeof(headers)) === 'object') {
                headers = JSON.stringify(headers, null, 2);
            }
            return __assign({}, session, { headers: headers, endpoint: session.endpoint || migrationEndpoint });
        }
        function convertArray(headers) {
            return headers.reduce(function (acc, header) {
                return __assign({}, acc, (_a = {}, _a[header.name] = header.value, _a));
                var _a;
            }, {});
        }
        var history = project.history ? project.history.map(function (s) {
            return mapHeaders(s);
        }) : [];
        var sessions = lodash_1.mapValues(project.sessions, mapHeaders);
        return __assign({}, project, { sessions: sessions,
            history: history });
    };
    PlaygroundStorage.prototype.executedQuery = function () {
        if (!this.executedQueryCount) {
            this.executedQueryCount = 1;
        } else {
            this.executedQueryCount++;
        }
    };
    PlaygroundStorage.prototype.hasExecutedQuery = function () {
        return this.executedQueryCount >= 2;
    };
    PlaygroundStorage.prototype.getSessionStorage = function (sessionId) {
        if (this.storages[sessionId]) {
            return this.storages[sessionId];
        }
        var prefix = this.endpoint + ":" + sessionId + ":";
        var store = {
            clear: function clear() {
                Object.keys(localStorage).filter(function (key) {
                    return key.startsWith(prefix);
                }).forEach(function (key) {
                    return localStorage.removeItem(key);
                });
            },
            getItem: function getItem(key) {
                return localStorage.getItem(prefix + key);
            },
            setItem: function setItem(key, item) {
                return localStorage.setItem(prefix + key, item);
            },
            removeItem: function removeItem(key) {
                return localStorage.removeItem(prefix + key);
            }
        };
        this.storages[sessionId] = store;
        return store;
    };
    PlaygroundStorage.prototype.setState = function (project, endpoint) {
        this.project = PlaygroundStorage.runMigration(project, endpoint);
    };
    PlaygroundStorage.prototype.getSessions = function () {
        var _this = this;
        return Object.keys(this.project.sessions).filter(function (key) {
            return key !== 'undefined';
        }).map(function (sessionId) {
            return _this.project.sessions[sessionId];
        });
    };
    PlaygroundStorage.prototype.removeSession = function (session) {
        delete this.project.sessions[session.id];
    };
    PlaygroundStorage.prototype.saveSession = function (session, save) {
        if (save === void 0) {
            save = false;
        }
        this.project.sessions[session.id] = session;
        if (save) {
            this.saveProject();
        }
    };
    PlaygroundStorage.prototype.syncHistory = function (history) {
        this.project.history = history;
    };
    PlaygroundStorage.prototype.addToHistory = function (session) {
        // limit by 1000 items
        this.project.history.unshift(session);
        this.project.history = this.project.history.slice(0, 1000);
    };
    PlaygroundStorage.prototype.getHistory = function (endpoint) {
        if (!this.project.history) {
            return [];
        }
        if (endpoint) {
            return this.project.history.filter(function (session) {
                return session.endpoint === endpoint;
            });
        }
        return this.project.history;
    };
    PlaygroundStorage.prototype.setItem = function (key, value) {
        this.project.data[key] = value;
    };
    PlaygroundStorage.prototype.getItem = function (key) {
        return this.project.data[key];
    };
    PlaygroundStorage.prototype.saveProject = function () {
        var json = JSON.stringify(this.project);
        localStorage.setItem(this.endpoint, json);
        localStorage.setItem('executedQueryCount', this.executedQueryCount.toString());
        PlaygroundStorage.countCache[this.endpoint] = Object.keys(this.project.sessions).length;
    };
    PlaygroundStorage.prototype.getProject = function () {
        var result = null;
        try {
            result = JSON.parse(localStorage.getItem(this.endpoint) || '');
        } catch (e) {
            /* tslint:disable-next-line */
            console.info(e);
            //
        }
        if (result && result.history) {
            result.history = result.history.map(function (item) {
                return __assign({}, item, { date: new Date(item.date) });
            });
        }
        return PlaygroundStorage.runMigration(result, this.endpoint);
    };
    PlaygroundStorage.prototype.getExecutedQueryCount = function () {
        var count = 0;
        try {
            count = parseInt(localStorage.getItem('executedQueryCount') || '0', 10);
        } catch (e) {
            //
        }
        return count;
    };
    PlaygroundStorage.countCache = {};
    return PlaygroundStorage;
}();
exports.default = PlaygroundStorage;
//# sourceMappingURL=PlaygroundStorage.js.map