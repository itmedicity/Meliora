import { ActionTyps } from '../constants/action.type'

const { FETCH_LOGIN } = ActionTyps;

const LoginInitialState = {}

export const LoginUserData = (state = LoginInitialState, { type, payload }) => {
    switch (type) {
        case FETCH_LOGIN:
            console.log(LoginInitialState);
            return { ...state, ...payload }
        default:
            return state
    }
}