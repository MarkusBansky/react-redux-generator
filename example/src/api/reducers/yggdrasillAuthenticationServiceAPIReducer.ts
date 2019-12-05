import _ from 'lodash';
import produce from 'immer';



import {

    apiPostRegisterUserResponses,

    apiGetGetUserByIdResponses,

    apiPatchUpdateUserResponses,

    apiGetValidateSessionResponses,

    apiPostAuthenticateSessionResponses,

} from '../actions/yggdrasillAuthenticationServiceAPIActions';


import UserDto from '../models/UserDto';

import SessionStatusDto from '../models/SessionStatusDto';

import UserSessionDto from '../models/UserSessionDto';



export interface yggdrasillAuthenticationServiceAPIReducerState {

    loading: boolean;

    errorMessage?: string;

    user?: UserDto;

    sessionStatus?: SessionStatusDto;

    userSession?: UserSessionDto;

}


const defaultState : yggdrasillAuthenticationServiceAPIReducerState = {
    loading: false,
};


const yggdrasillAuthenticationServiceAPIReducer = (state = defaultState, action: any) => produce(state, (draft: yggdrasillAuthenticationServiceAPIReducerState) => {
    switch (action.type) {

        case apiPostRegisterUserResponses.request:
            draft.loading = true;
            draft.errorMessage = undefined;
            break;
        case apiPostRegisterUserResponses.success:
            draft.loading = false;
            draft.user = new UserDto(action.payload.data);
            break;
        case apiPostRegisterUserResponses.failure:
            draft.errorMessage = action.payload.data.message;
            draft.user = undefined;
            draft.loading = false;
            break;

        case apiGetGetUserByIdResponses.request:
            draft.loading = true;
            draft.errorMessage = undefined;
            break;
        case apiGetGetUserByIdResponses.success:
            draft.loading = false;
            draft.user = new UserDto(action.payload.data);
            break;
        case apiGetGetUserByIdResponses.failure:
            draft.errorMessage = action.payload.data.message;
            draft.user = undefined;
            draft.loading = false;
            break;

        case apiPatchUpdateUserResponses.request:
            draft.loading = true;
            draft.errorMessage = undefined;
            break;
        case apiPatchUpdateUserResponses.success:
            draft.loading = false;
            draft.user = new UserDto(action.payload.data);
            break;
        case apiPatchUpdateUserResponses.failure:
            draft.errorMessage = action.payload.data.message;
            draft.user = undefined;
            draft.loading = false;
            break;

        case apiGetValidateSessionResponses.request:
            draft.loading = true;
            draft.errorMessage = undefined;
            break;
        case apiGetValidateSessionResponses.success:
            draft.loading = false;
            draft.sessionStatus = new SessionStatusDto(action.payload.data);
            break;
        case apiGetValidateSessionResponses.failure:
            draft.errorMessage = action.payload.data.message;
            draft.sessionStatus = undefined;
            draft.loading = false;
            break;

        case apiPostAuthenticateSessionResponses.request:
            draft.loading = true;
            draft.errorMessage = undefined;
            break;
        case apiPostAuthenticateSessionResponses.success:
            draft.loading = false;
            draft.userSession = new UserSessionDto(action.payload.data);
            break;
        case apiPostAuthenticateSessionResponses.failure:
            draft.errorMessage = action.payload.data.message;
            draft.userSession = undefined;
            draft.loading = false;
            break;

    }
});

export default yggdrasillAuthenticationServiceAPIReducer;