// ==== [GENERATED]
import {AxiosAction, createActionsObject, createHttpRequest, composeUrlWithParameters} from '../utils/utils';
import {GET, POST, PUT, HEAD, PATCH, DELETE, OPTIONS} from '../utils/constants';

// URLs

const apiPostRegisterUserURL = '/users';

const apiGetGetUserByIdURL = '/users/{id}';

const apiPatchUpdateUserURL = '/users/{id}';

const apiGetValidateSessionURL = '/sessions';

const apiPostAuthenticateSessionURL = '/sessions';

// Variables for reducers actions

export const apiPostRegisterUserResponses = createActionsObject('apiPostRegisterUserResponses');

export const apiGetGetUserByIdResponses = createActionsObject('apiGetGetUserByIdResponses');

export const apiPatchUpdateUserResponses = createActionsObject('apiPatchUpdateUserResponses');

export const apiGetValidateSessionResponses = createActionsObject('apiGetValidateSessionResponses');

export const apiPostAuthenticateSessionResponses = createActionsObject('apiPostAuthenticateSessionResponses');

// Paths to endpoint methods

export const apiPostRegisterUserAction = (callback?: any) =>
    createHttpRequest(apiPostRegisterUserResponses, POST, apiPostRegisterUserURL, null, callback);

export const apiGetGetUserByIdAction = (callback?: any) =>
    createHttpRequest(apiGetGetUserByIdResponses, GET, apiGetGetUserByIdURL, null, callback);

export const apiPatchUpdateUserAction = (callback?: any) =>
    createHttpRequest(apiPatchUpdateUserResponses, PATCH, apiPatchUpdateUserURL, null, callback);

export const apiGetValidateSessionAction = (callback?: any) =>
    createHttpRequest(apiGetValidateSessionResponses, GET, apiGetValidateSessionURL, null, callback);

export const apiPostAuthenticateSessionAction = (callback?: any) =>
    createHttpRequest(apiPostAuthenticateSessionResponses, POST, apiPostAuthenticateSessionURL, null, callback);
