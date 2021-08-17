"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function getActiveEndpoints(config, envName, projectName) {
    if (projectName) {
        var env = config.projects[projectName].extensions.endpoints[envName];
        return getEndpointFromEndpointConfig(env);
    } else {
        var env = config.extensions.endpoints[envName];
        return getEndpointFromEndpointConfig(env);
    }
}
exports.getActiveEndpoints = getActiveEndpoints;
function getEndpointFromEndpointConfig(env) {
    if (typeof env === 'string') {
        return {
            endpoint: env
        };
    } else {
        return {
            endpoint: env.url,
            subscriptionEndpoint: env.subscription ? env.subscription.url : undefined,
            headers: env.headers
        };
    }
}
exports.getEndpointFromEndpointConfig = getEndpointFromEndpointConfig;
//# sourceMappingURL=util.js.map