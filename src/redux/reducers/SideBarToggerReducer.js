import { ActionTyps } from '../constants/action.type';

const { APP_SIDEBAR_SHOW } = ActionTyps;

const initialState = {
    sidebarShow: true,
}

export const changeState = (state = initialState, { type, ...rest }) => {
    switch (type) {
        case APP_SIDEBAR_SHOW:
            return { ...state, ...rest }
        default:
            return state
    }
}