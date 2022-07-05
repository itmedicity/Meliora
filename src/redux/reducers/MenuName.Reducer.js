import { ActionTyps } from '../constants/action.type'

const { FETCH_MENU_NAME } = ActionTyps;

const menuName = {
    menuNameList: [],
    loadingStatus: false
}

export const setMenuName = (state = menuName, { type, payload }) => {
    switch (type) {
        case FETCH_MENU_NAME:
            return { ...state, menuNameList: payload, loadingStatus: true }
        default:
            return state
    }
}