import {GET, POST, PUT, HEAD, PATCH, DELETE, OPTIONS} from './constants';

/**
 * Defines request parameter type.
 */
export interface AxiosAction {
    request: string;
    success: string;
    failure: string;
}

/**
 * used to create new request parameter type easily for axios and redux usage.
 * @param name The general name of this parameter.
 */
export function createActionsObject(
    name: string
): AxiosAction {
    return {
        request: name.toUpperCase() + '_REQUEST',
        success: name.toUpperCase() + '_SUCCESS',
        failure: name.toUpperCase() + '_FAILURE',
    }
}

/**
 * Defines a http request.
 * @param a
 * @param method
 * @param url
 * @param data
 * @param client
 * @param redirectTo
 */
export function createHttpRequest(
    a: AxiosAction,
    method: GET | POST | PUT | HEAD | PATCH | DELETE | OPTIONS,
    url: string,
    data: any,
    client: string,
    redirectTo?: string
) {
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
    }
}

/**
 * Compose url with possible parameters. All parameters are checked before applying to the path.
 * @param url The base url.
 * @param params Possible parameters with name as a string and value as any.
 */
export function composeUrlWithParameters(
    url: string,
    params: { name: string, value: any }[]
): string {
    let path = url;
    const nonNullParams = params.filter(p =>
        p.value !== null &&
        p.value !== undefined &&
        p.value.toString() !== 'null' &&
        p.value.toString() !== 'undefined'
    );
    nonNullParams.forEach(p => {
        path += `${p.name === nonNullParams[0].name ? '?' : '&'}${p.name}=${p.value}`;
    });
    return path;
}

/**
* Used to format method url with all possible parameters.
* @param url
* @param parameters
*/
export function formatUrlWith(url: string, ...parameters: {name: string, value: any}[]) {
    let newUrl = url;
    let query = '';

    if (parameters && parameters.length > 0) {
        parameters.map(p => {
            if (p.value) {
                if (newUrl.includes(`{${p.name}}`)) {
                    newUrl = newUrl.replace(`{${p.name}}`, p.value);
                } else {
                    query += `&${p.name}=${p.value}`;
                }
            }
        });

        if (query.length > 0) {
            query = '?' + query.slice(1);
        }
    }

    return newUrl + query;
}