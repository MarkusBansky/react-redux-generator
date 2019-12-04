// ==== [GENERATED]
import {AxiosAction, createActionsObject, createHttpRequest, composeUrlWithParameters} from '../utils/utils.ts';
import {API, GET, POST, PUT, UPDATE, DELETE} from '../utils/constants.ts';

// URLs

const apiPostTry to register a new user if such username and meail does not exist.URL = '/users';

const apiGetReturns user by it&#39;s id if such user exists in the database.URL = '/users/{id}';

const apiPatchPartially update user personal record information.URL = '/users/{id}';

const apiGetTry to validate user session with the token from cookies or header.URL = '/sessions';

const apiPostSend user details to log into the session and return a valid session token.URL = '/sessions';

// Variables for reducers actions

export const apiPostTry to register a new user if such username and meail does not exist.Responses = createActionsObject('apiPostTry to register a new user if such username and meail does not exist.Responses');

export const apiGetReturns user by it&#39;s id if such user exists in the database.Responses = createActionsObject('apiGetReturns user by it&#39;s id if such user exists in the database.Responses');

export const apiPatchPartially update user personal record information.Responses = createActionsObject('apiPatchPartially update user personal record information.Responses');

export const apiGetTry to validate user session with the token from cookies or header.Responses = createActionsObject('apiGetTry to validate user session with the token from cookies or header.Responses');

export const apiPostSend user details to log into the session and return a valid session token.Responses = createActionsObject('apiPostSend user details to log into the session and return a valid session token.Responses');

// Paths to endpoint methods

export default const apiPostTry to register a new user if such username and meail does not exist.Action = (callback?: any) =>
    createHttpRequest(apiPostTry to register a new user if such username and meail does not exist.Responses, POST, apiPostTry to register a new user if such username and meail does not exist.URL, null, callback);

export default const apiGetReturns user by it&#39;s id if such user exists in the database.Action = (callback?: any) =>
    createHttpRequest(apiGetReturns user by it&#39;s id if such user exists in the database.Responses, GET, apiGetReturns user by it&#39;s id if such user exists in the database.URL, null, callback);

export default const apiPatchPartially update user personal record information.Action = (callback?: any) =>
    createHttpRequest(apiPatchPartially update user personal record information.Responses, PATCH, apiPatchPartially update user personal record information.URL, null, callback);

export default const apiGetTry to validate user session with the token from cookies or header.Action = (callback?: any) =>
    createHttpRequest(apiGetTry to validate user session with the token from cookies or header.Responses, GET, apiGetTry to validate user session with the token from cookies or header.URL, null, callback);

export default const apiPostSend user details to log into the session and return a valid session token.Action = (callback?: any) =>
    createHttpRequest(apiPostSend user details to log into the session and return a valid session token.Responses, POST, apiPostSend user details to log into the session and return a valid session token.URL, null, callback);
