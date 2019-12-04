"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * used to create new request parameter type easily for axios and redux usage.
 * @param name The general name of this parameter.
 */
function createActionsObject(name) {
    return {
        request: name.toUpperCase() + '_REQUEST',
        success: name.toUpperCase() + '_SUCCESS',
        failure: name.toUpperCase() + '_FAILURE',
    };
}
exports.createActionsObject = createActionsObject;
/**
 * Defines a http request.
 * @param a
 * @param method
 * @param url
 * @param data
 * @param client
 * @param redirectTo
 */
function createHttpRequest(a, method, url, data, client, redirectTo) {
    return {
        types: [a.request, a.success, a.failure],
        payload: {
            redirectTo: redirectTo,
            client: client ? client : 'default',
            request: {
                method: method,
                url: url,
                data: data
            }
        }
    };
}
exports.createHttpRequest = createHttpRequest;
/**
 * Compose url with possible parameters. All parameters are checked before applying to the path.
 * @param url The base url.
 * @param params Possible parameters with name as a string and value as any.
 */
function composeUrlWithParameters(url, params) {
    let path = url;
    const nonNullParams = params.filter(p => p.value !== null &&
        p.value !== undefined &&
        p.value.toString() !== 'null' &&
        p.value.toString() !== 'undefined');
    nonNullParams.forEach(p => {
        path += `${p.name === nonNullParams[0].name ? '?' : '&'}${p.name}=${p.value}`;
    });
    return path;
}
exports.composeUrlWithParameters = composeUrlWithParameters;
//# sourceMappingURL=utils.js.map