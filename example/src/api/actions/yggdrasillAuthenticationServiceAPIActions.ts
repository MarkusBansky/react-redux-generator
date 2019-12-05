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

export const apiPostRegisterUserAction = (redirectTo?: string) =>
    createHttpRequest(
        apiPostRegisterUserResponses,
        POST,
        apiPostRegisterUserURL,
        null,
        'yggdrasillAuthenticationServiceAPI',
        redirectTo
    );

export const apiGetGetUserByIdAction = (redirectTo?: string) =>
    createHttpRequest(
        apiGetGetUserByIdResponses,
        GET,
        apiGetGetUserByIdURL,
        null,
        'yggdrasillAuthenticationServiceAPI',
        redirectTo
    );

export const apiPatchUpdateUserAction = (redirectTo?: string) =>
    createHttpRequest(
        apiPatchUpdateUserResponses,
        PATCH,
        apiPatchUpdateUserURL,
        null,
        'yggdrasillAuthenticationServiceAPI',
        redirectTo
    );

export const apiGetValidateSessionAction = (redirectTo?: string) =>
    createHttpRequest(
        apiGetValidateSessionResponses,
        GET,
        apiGetValidateSessionURL,
        null,
        'yggdrasillAuthenticationServiceAPI',
        redirectTo
    );

export const apiPostAuthenticateSessionAction = (redirectTo?: string) =>
    createHttpRequest(
        apiPostAuthenticateSessionResponses,
        POST,
        apiPostAuthenticateSessionURL,
        null,
        'yggdrasillAuthenticationServiceAPI',
        redirectTo
    );
