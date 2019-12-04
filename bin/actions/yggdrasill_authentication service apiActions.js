"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ==== [GENERATED]
const utils_1 = require("../utils/utils");
const constants_1 = require("../utils/constants");
// URLs
const apiPostRegisterUserURL = '/users';
const apiGetGetUserByIdURL = '/users/{id}';
const apiPatchUpdateUserURL = '/users/{id}';
const apiGetValidateSessionURL = '/sessions';
const apiPostAuthenticateSessionURL = '/sessions';
// Variables for reducers actions
exports.apiPostRegisterUserResponses = utils_1.createActionsObject('apiPostRegisterUserResponses');
exports.apiGetGetUserByIdResponses = utils_1.createActionsObject('apiGetGetUserByIdResponses');
exports.apiPatchUpdateUserResponses = utils_1.createActionsObject('apiPatchUpdateUserResponses');
exports.apiGetValidateSessionResponses = utils_1.createActionsObject('apiGetValidateSessionResponses');
exports.apiPostAuthenticateSessionResponses = utils_1.createActionsObject('apiPostAuthenticateSessionResponses');
// Paths to endpoint methods
exports.apiPostRegisterUserAction = (callback) => utils_1.createHttpRequest(exports.apiPostRegisterUserResponses, constants_1.POST, apiPostRegisterUserURL, null, callback);
exports.apiGetGetUserByIdAction = (callback) => utils_1.createHttpRequest(exports.apiGetGetUserByIdResponses, constants_1.GET, apiGetGetUserByIdURL, null, callback);
exports.apiPatchUpdateUserAction = (callback) => utils_1.createHttpRequest(exports.apiPatchUpdateUserResponses, constants_1.PATCH, apiPatchUpdateUserURL, null, callback);
exports.apiGetValidateSessionAction = (callback) => utils_1.createHttpRequest(exports.apiGetValidateSessionResponses, constants_1.GET, apiGetValidateSessionURL, null, callback);
exports.apiPostAuthenticateSessionAction = (callback) => utils_1.createHttpRequest(exports.apiPostAuthenticateSessionResponses, constants_1.POST, apiPostAuthenticateSessionURL, null, callback);
//# sourceMappingURL=yggdrasill_authentication service apiActions.js.map