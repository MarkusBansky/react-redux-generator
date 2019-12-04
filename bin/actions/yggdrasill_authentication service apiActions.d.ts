import { AxiosAction } from '../utils/utils';
export declare const apiPostRegisterUserResponses: AxiosAction;
export declare const apiGetGetUserByIdResponses: AxiosAction;
export declare const apiPatchUpdateUserResponses: AxiosAction;
export declare const apiGetValidateSessionResponses: AxiosAction;
export declare const apiPostAuthenticateSessionResponses: AxiosAction;
export declare const apiPostRegisterUserAction: (callback?: any) => {
    types: string[];
    payload: {
        redirectTo: string;
        client: "default" | "v2" | "nlp_v1" | "tf";
        request: {
            method: any;
            url: string;
            data: any;
        };
    };
};
export declare const apiGetGetUserByIdAction: (callback?: any) => {
    types: string[];
    payload: {
        redirectTo: string;
        client: "default" | "v2" | "nlp_v1" | "tf";
        request: {
            method: any;
            url: string;
            data: any;
        };
    };
};
export declare const apiPatchUpdateUserAction: (callback?: any) => {
    types: string[];
    payload: {
        redirectTo: string;
        client: "default" | "v2" | "nlp_v1" | "tf";
        request: {
            method: any;
            url: string;
            data: any;
        };
    };
};
export declare const apiGetValidateSessionAction: (callback?: any) => {
    types: string[];
    payload: {
        redirectTo: string;
        client: "default" | "v2" | "nlp_v1" | "tf";
        request: {
            method: any;
            url: string;
            data: any;
        };
    };
};
export declare const apiPostAuthenticateSessionAction: (callback?: any) => {
    types: string[];
    payload: {
        redirectTo: string;
        client: "default" | "v2" | "nlp_v1" | "tf";
        request: {
            method: any;
            url: string;
            data: any;
        };
    };
};
