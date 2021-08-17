"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CodeGenerator = /** @class */function () {
    function CodeGenerator(client, environment, endpointUrl) {
        this.client = client;
        this.environment = environment;
        this.endpointUrl = endpointUrl;
    }
    CodeGenerator.prototype.getSetup = function () {
        var template = "$ npm install ";
        if (this.client === 'graphql-request') {
            return template + "graphql-request";
        } else if (this.client === 'fetch') {
            return template + "isomorphic-fetch es6-promise";
        }
        return '';
    };
    CodeGenerator.prototype.getCode = function (query) {
        if (this.environment === 'Cli') {
            return this.getTransport() + this.getQueryCode(query);
        } else if (this.client === 'fetch') {
            return this.getImports() + '\n' + this.getQueryCode(query);
        }
        return this.getImports() + '\n\n' + this.getTransport() + '\n\n' + this.getQueryCode(query);
    };
    CodeGenerator.prototype.getTransport = function () {
        if (this.client === 'graphql-request' && this.environment !== 'Cli') {
            return "const client = new GraphQLClient('" + this.endpointUrl + "', {\n  headers: {\n    Authorization: 'Bearer YOUR_AUTH_TOKEN',\n  },\n});\n";
        } else if (this.environment === 'Cli') {
            return "curl '" + this.endpointUrl + "'  \n  -H 'Authorization: Bearer YOUR_AUTH_TOKEN'  \n  ";
        }
        return '';
    };
    CodeGenerator.prototype.getImports = function () {
        if (this.client === 'graphql-request' && this.environment === 'Node') {
            return "const GraphQLClient = require('graphql-request').GraphQLClient";
        } else if (this.client === 'graphql-request' && this.environment === 'Browser') {
            return "import { GraphQLClient } from 'graphql-request'";
        } else if (this.client === 'fetch') {
            return "require('es6-promise').polyfill()\nrequire('isomorphic-fetch')\n      ";
        }
        return '';
    };
    CodeGenerator.prototype.getQueryCode = function (query) {
        if (query.includes('mutation')) {
            return this.getMutation(query);
        } else {
            return this.getQuery(query);
        }
    };
    CodeGenerator.prototype.getQuery = function (query) {
        if (this.client === 'graphql-request') {
            var curlyIndex = query.indexOf('{');
            var strippedQuery = query.slice(curlyIndex, query.length);
            if (this.client === 'graphql-request') {
                return "function getItem() {\n  return client.request(`\n" + strippedQuery.split('\n').map(function (line) {
                    return '    ' + line;
                }).join('\n') + "\n  `)\n}";
            }
        }
        if (this.client === 'fetch') {
            return "function getItems() { \n  " + this.getFetchBody(query) + "\n}";
        }
        if (this.client === 'curl') {
            return "-d '{\"query\":\"" + JSON.stringify(query.replace(/\s/g, '')) + "\"}'";
        }
        return '';
    };
    CodeGenerator.prototype.getFetchBody = function (query) {
        var clearString = query.replace(/\s/g, '');
        var jsonQuery = JSON.stringify({
            query: clearString
        });
        return "return fetch('" + this.endpointUrl + "', {\n    method: 'post',\n    headers: {\n      'Content-Type': 'application/json',\n    //'Authorization': 'Bearer YOUR_AUTH_TOKEN'\n    },\n    body: '" + ("" + jsonQuery) + "', \n  })";
    };
    CodeGenerator.prototype.getMutation = function (query) {
        var curlyIndex = query.indexOf('{');
        var strippedQuery = query.slice(curlyIndex, query.length);
        if (this.client === 'graphql-request') {
            return "function setItem() {\n  return client.request(`\n" + strippedQuery.split('\n').map(function (line) {
                return '    ' + line;
            }).join('\n') + "\n  `)\n}";
        }
        if (this.client === 'fetch') {
            return "function setItem() { \n  " + this.getFetchBody(query) + " \n}";
        }
        if (this.client === 'curl') {
            return "-d '{\"query\":" + JSON.stringify(query.replace(/\s/g, '')) + "}'";
        }
        return '';
    };
    return CodeGenerator;
}();
exports.CodeGenerator = CodeGenerator;
//# sourceMappingURL=codeGeneration.js.map